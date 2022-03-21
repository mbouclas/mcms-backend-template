(function($)
{
	$.Redactor.prototype.clips = function()
	{
		return {
			init: function()
			{

				if (typeof this.opts.clipsJson == 'undefined'){
					return;
				}
				this.clipsArray = [];

				// this.modal.addCallback('file', this.clips.load);
				this.clips.template = $('<ul id="redactor-modal-list">');
				this.modal.addTemplate('clips', '<section>' + this.utils.getOuterHtml(this.clips.template) + '</section>');

				var button = this.button.add('clips', 'Clips');
				this.button.addCallback(button, this.clips.show);

			},
			show: function()
			{
				this.modal.load('clips', 'Insert Clips', 400);
				var _this = this,
					list = $('#redactor-modal-list');

				this.modal.createCancelButton();
				$.ajax({
					dataType: "json",
					cache: false,
					url: this.opts.clipsJson,
					success: $.proxy(function(data)
					{
						$.each(data, $.proxy(function(index, item){
							var li = $('<li>');
							var a = $('<a href="" class="redactor-clip-link" index="'+index+'">').text(item.label);
							// var div = $('<div class="redactor-clip">').hide().html(item);

							_this.clipsArray.push(item);
							li.append(a);
							list.append(li);
						}));


						list.find('.redactor-clip-link').each($.proxy(_this.clips.load, this));
					}, this)
				});


				this.selection.save();
				this.modal.show();
			},
			load: function(i,s)
			{
				var _this = this;
				$(s).on('click', $.proxy(function(e)
				{
					e.preventDefault();
					this.clips.insert(_this.clipsArray[i].value);

				}, this));
			},
			insert: function(html)
			{
				this.selection.restore();

				this.insert.htmlWithoutClean(html);
				this.code.sync();
				this.modal.close();
				this.observe.load();
			}
		};
	};
})(jQuery);

