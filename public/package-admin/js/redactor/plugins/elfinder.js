if (typeof RedactorPlugins === 'undefined') var RedactorPlugins = {};
function test(arg){

    $('#redactor_modal iframe').trigger('allDone',arg);

}
var x = RedactorPlugins.elfinder = {

    init: function()
    {
        var that = this;
        var tpl = '<a href="" id="mymodal-link"></a> <div class="contain"><iframe src="/skin/admin3/assets/elfinder2.0/elfinder-selector.html?type=modal&target=test" ' +
            'width="100%" height="450" frameBorder="0"></iframe> </div>';
        var callback = $.proxy(function()
        {
            this.selectionSave();
            $('#redactor_modal iframe').on('allDone',$.proxy(function(e,data){
                    this.insertFromMyModal(data);
                    return false;

                }, this)
            );
            return false;
        }, this);

        this.buttonAdd('elfinder', 'File manager', $.proxy(function()
        {
            this.modalInit('File manager', tpl, 700, callback);
        }, this));

        this.buttonAddSeparatorBefore('elfinder');

    },
    insertFromMyModal: function(file)
    {
        var html = '';
        var patt1=/\.[0-9a-z]+$/i;
        var ext = file.match(patt1);
        var extentions = {
            images : ['.jpg','.jpeg','.png','.gif'],
            docs : ['.doc','docx','.zip','.rar','.txt','.xls','.xlsx','.rtf']
        }

        if (extentions.images.indexOf(ext[0]) != -1){
            html = '<img src="'+file+'"/>';
        }
        else {
            html = '<a href="'+file+'">'+file+'</a>';
        }


        this.selectionRestore();
        this.execCommand('inserthtml', html);
        $('#redactor_modal iframe').remove();
        this.modalClose();
    }

};
