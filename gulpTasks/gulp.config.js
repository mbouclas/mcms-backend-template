var path = require('path');
var args = require('yargs').argv;
var BaseDir = path.join(__dirname,'../'),
    InstallationDir = path.join(__dirname,args.installationDir || '../'),
    public_folder = path.join(BaseDir, 'public'),
    storage_folder = path.join(BaseDir, 'storage'),
    resources_folder = path.join(BaseDir, 'resources'),
    assets_folder = path.join(resources_folder, 'assets');


var Config = {
    BaseDir : BaseDir,
    InstallationDir : InstallationDir,
    PublicDir : public_folder,
    StorageDir : storage_folder,
    ResourcesDir : resources_folder,
    AssetsDir : assets_folder,
    js : {
        srcDir : path.join(assets_folder, 'js/'),
        destDir : path.join(public_folder, 'js/')
    },
    css : {
        srcDir : path.join(assets_folder, 'css/'),
        destDir : path.join(public_folder, 'css/')
    },
    sass : {
        srcDir : path.join(assets_folder, 'sass/'),
        destDir : path.join(public_folder, 'css/')
    }
};

module.exports = Config;