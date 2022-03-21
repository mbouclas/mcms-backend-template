<?php

namespace Mcms\Admin\Console\Commands;

/**
 * What i do :
 * 1. Publish my settings
 * 2. Publish my assets
 * 3. Publish my views
 * 5. Migrate my DB
 * 6. Seed my DB with defaults
 *
 * If you provide me with a provision file, i will make some changes to the config file of the application
 */

use Mcms\Admin\Console\Commands\InstallerActions\ApplyProvisionSettings;
use Mcms\Core\Helpers\Composer;
use Illuminate\Console\Command;
use Event;

/**
 * Class Install
 * @package Mcms\Admin\Console\Commands
 */
class Install extends Command
{
    /**
     * @var array
     */
    protected $actions = [
        'dependencies' => \Mcms\Admin\Console\Commands\InstallerActions\PublishDependencies::class,
        'settings' => \Mcms\Admin\Console\Commands\InstallerActions\PublishSettings::class,
        'assets' => \Mcms\Admin\Console\Commands\InstallerActions\PublishAssets::class,
        'lang' => \Mcms\Admin\Console\Commands\InstallerActions\PublishLanguageFiles::class,
        'views' => \Mcms\Admin\Console\Commands\InstallerActions\PublishViews::class,
        'migrate' => \Mcms\Admin\Console\Commands\InstallerActions\MigrateDataBase::class,
        'seed' => \Mcms\Admin\Console\Commands\InstallerActions\SeedDataBase::class,
    ];
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'admin:install {provisionFile?} {--action=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Installs this module';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->registerEvents();
        $this->info('Admin package is starting the installation');
        $this->line('--------------');
        $actions = array_keys($this->actions);

        //Run selective actions. Must be in the format --action="migrate seed assets"
        if ($this->option('action')){
            $actions = explode(" ", $this->option('action'));
        }

        /**
         * Run all actions
         */
        foreach ($actions as $action){
            (new $this->actions[$action]())->handle($this);
        }


        if ($this->argument('provisionFile')){
            (new ApplyProvisionSettings())->handle($this,$this->argument('provisionFile'));
        }

        //load composer
        $composer = new Composer();
        $command = "php artisan admin:refreshAssets";

        if ( ! in_array($command, $composer->contents['scripts']['post-update-cmd'])){
            $this->comment("adding command into composer");
            $composer->contents['scripts']['post-update-cmd'][] = $command;
            $composer->save();
            $this->info('composer updated');
        }

        $this->line('');
        $this->info('Admin, All Done!');
        $this->line('--------------');
        $this->line('');
    }

    /**
     *
     */
    private function registerEvents()
    {
        Event::listen('installer.admin.run.before', function ($msg, $type = 'comment'){
            $this->{$type}($msg);
        });

        Event::listen('installer.admin.run.after', function ($msg, $type = 'comment'){
            $this->{$type}($msg);
        });
    }
}
