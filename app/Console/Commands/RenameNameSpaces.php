<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class RenameNameSpaces extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fix:namespaces';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Rename the namespaces in the DB';

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
        //update editable_regions set items = REPLACE(items,'IdeaSeven','Mcms')
        \DB::statement("update editable_regions set items = REPLACE(items,'IdeaSeven','Mcms')");
        \DB::statement("update images set model = REPLACE(model,'IdeaSeven','Mcms')");
        \DB::statement("update tagging_tagged set taggable_type = REPLACE(taggable_type,'IdeaSeven','Mcms')");
        \DB::statement("update updates_log set handler = REPLACE(handler,'IdeaSeven','Mcms')");
        \DB::statement("update menu_items set model = REPLACE(model,'IdeaSeven','Mcms')");

        $this->info('all done');
        return true;
    }
}
