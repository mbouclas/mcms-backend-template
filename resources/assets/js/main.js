function applyMasonry() {
    if ($.isFunction($.fn.masonry)) {
        $('.grid-layout').masonry({
            itemSelector    : '.grid-item',
            columnWidth     : '.grid-sizer',
            percentPosition : true
        });
    }
}

(function($) {
	'use strict';
	var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone)/);

	//Calculating The Browser Scrollbar Width
	var parent, child, scrollWidth;

	if (scrollWidth === undefined) {
		parent      = $('<div style="width: 50px; height: 50px; overflow: auto"><div/></div>').appendTo('body');
		child       = parent.children();
		scrollWidth = child.innerWidth() - child.height(99).innerWidth();
		parent.remove();
	}

	//Carousels
	function carousels() {
		var carousel = $('.carousel');

		if (carousel.length) {
			carousel.each(function(){
				var $this      = $(this),
					responsive = {0 : {items : 1}, 768 : { items : 3}, 992 : { items : 4}};

				if ($this.data('responsive')) responsive = $this.data('responsive');

				$this.owlCarousel({
					animateOut : 'zoomOut',
					animateIn  : 'zoomIn',
					autoplay   : false,
					loop       : true,
					nav        : false,
					margin     : 30,
					autoHeight : false,
					responsive : responsive,
					lazyLoad   : true
				});
			});
		}
	}

	//Preloader
	function loaderOut(){
		$('body').addClass('loaded').find('.preloader').fadeOut(400);
	}

	//Header
	function headerOptions() {
		var body   = $('body'),
				header = $('.site-header');

		//Dynamic header
		if(body.hasClass('dynamic-header')) {
			$(window).on('scroll', function() {
				if ($(window).scrollTop() >= 63)
					header.addClass('small-height');
				else
					header.removeClass('small-height');
			});
		}
	}

	//Header actions
	function headerActions() {
		var header = $('.site-header'),
				close  = $('.action-box .close');

		$('.header-btn').on('click', function(e){
			var $this = $(this);
			e.preventDefault();

			header.addClass('open-action');
			setTimeout(function(){
				$this.closest('.action-box').addClass('active').find('.search-input').focus();
			}, 300);
		});

    close.on('click', function(e){
      e.preventDefault();

      $(this).closest('.action-box').removeClass('active');
      setTimeout(function(){
        header.removeClass('open-action');
      }, 300);
		});
	}

	//Menu
	function menu() {
		var menu = $('.main-menu'),
				menuWrap = menu.find('.menu-list-wrap'),
				parentItem = menu.find('.parent');

		parentItem.find('.open-sub').remove();

		if (($('body').width() + scrollWidth) < 992 || menu.hasClass('minimized-menu'))
			menu.addClass('collapsed');
		else
			menu.removeClass('collapsed');

		if (menu.hasClass('collapsed')) {
			menuWrap
				.hide()
				.touchwipe({
					wipeLeft : function() {
						menuWrap.trigger('click');
					},
					min_move_x : 20,
					preventDefaultEvents : false
				});

			parentItem.each(function(){
				var li = $(this);

				li.children('a').append('<span class="open-sub"/>');
			});

		} else {
			menuWrap.fadeIn();
		}

		$('.menu-btn').on('click', function(e){
			var menu = $(this).closest('.main-menu');

			e.preventDefault();
			menuWrap.fadeIn(200);

			setTimeout(function(){
				menu.addClass('open-menu');
			}, 200);
		});

		menuWrap.on('click', function(e){
			if(!$(e.target).is('.menu-list-wrap *')) {
				var overlay = $(this);

				overlay.closest('.main-menu').removeClass('open-menu');

				setTimeout(function(){
					overlay.fadeOut().find('.parent').removeClass('open');
				}, 200);
			}
		});

		$('.open-sub').on('click', function(e){
			var menu = $(this).closest('.main-menu'),
					li   = $(this).closest('.parent');

			e.preventDefault();

			if(li.hasClass('open')) {
				li.removeClass('open').find('.parent').removeClass('open');
			} else {
				menu.find('.parent').removeClass('open');
				li.addClass('open').parents('.parent').addClass('open');
			}
		});
	}

	//Slider
	function slider() {
		var slider = $('.slider');

		slider.find('.slider-item img').each(function(){
			var img = $(this),
					src = img.attr('src');

			img.closest('.slider-item').css('background-image', 'url(' + src + ')');
		});

		slider.owlCarousel({
			items              : 1,
			loop               : true,
			autoplay           : false,
			autoplayTimeout    : 3500,
			autoplayHoverPause : true,
            onInitialized : function () {
                var maxHeight = 0;
                $('.owl-item.active').each(function () { // LOOP THROUGH ACTIVE ITEMS
                    var thisHeight = parseInt( $(this).height() );
                    maxHeight=(maxHeight>=thisHeight?maxHeight:thisHeight);
                });

                $('.owl-carousel').css('height', maxHeight );
                $('.owl-stage-outer').css('height', maxHeight );
            },
			autoHeight         : true
		}).on('resized.owl.carousel', function() {
			var $this = $(this);
			$this.find('.owl-height').css('height', $this.find('.owl-item.active img').height());
		});
	}

	//Page height
	function pageHeight() {
		var main   = $('#main');

		main.removeAttr('style');

		if ($('body').height() < $(document).height())
			main.css('min-height', $(document).height() - $('.site-header').height() - $('.site-footer').height());
	}

	//Main Post
	function mainPost(){
		$('.bg-banner').each(function(){
			var box = $(this),
					bgImage = box.find('.bg-image');

			box.css({
				backgroundImage : 'url(' + bgImage.attr('src') + ')',
				height : $(window).height()
			});

			bgImage.remove();
		});
	}

	$(document).ready(function(){
		if (isTouchDevice) {
			$('.background-video').remove();
			$('body').addClass('touch-device');
		}

		//Select initial
		$('select').material_select();

		//Modal initial
		$('.modal-trigger').leanModal({
				dismissible  : true,
				opacity      : 0.5,
				in_duration  : 300,
				out_duration : 200
			}
		);

		//Tabs init
		$('.tabs').tabs();

		//Social icons
		$('.page-box').on('click', function(e) {
			if(!$(e.target).is('.post-sharing *'))
				$('.post-sharing').removeClass('hover');
		});
		$('.social-sharing-btn').on('click', function(e) {
			e.preventDefault();

			$(this).closest('.post-sharing').addClass('hover');
		});

		//Functions
		menu();
		headerOptions();
		headerActions();

		$(document).ready(function(){
			loaderOut();
			carousels();
			slider();
			mainPost();

			//Masonry initial
			applyMasonry();
			pageHeight();
		});

		//Contact Form
		$('.contact-form').on('submit', function(e){
			var form = $(this);

			e.preventDefault();

			$.ajax({
				type: 'POST',
				url : '/contact',
				data: form.serialize(),
				success: function(data){
					form.find('.form-message').fadeIn();
					form.find('.btn').prop('disabled', true);

					if (data.success){
						setTimeout(function(){
							form.trigger('reset');
							form.find('.btn').prop('disabled', false);
							form.find('.form-message').show().fadeOut().delay(500).queue(function(){
								form.find('.form-message').html('').dequeue();
							});
						}, 2000);
					} else {
						form.find('.btn').prop('disabled', false);
					}
				}
			});
		});


		$('.image-link:not(".gallery")').magnificPopup({
			type : 'image',
			mainClass : 'mfp-with-zoom',
			zoom : {
				enabled : true,
				duration : 300
			},
			callbacks: {
				elementParse: function(item) {
					if($(item.el.context).hasClass('video-link')) {
						item.type = 'iframe';
					} else {
						item.type = 'image';
					}
				}
			}
		});

		$('.gallery-item').magnificPopup({
			type : 'image',
			mainClass : 'mfp-with-zoom',
			zoom : {
				enabled : true,
				duration : 300
			},
			gallery: {
				enabled : true
			},
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function(item) {
                    return item.el.attr('title') + '<small>' + item.el.attr('data-description') + '</small>';
                }
            },
			callbacks: {
				elementParse: function(item) {
					if($(item.el.context).hasClass('iframe-item'))
						item.type = 'iframe';
					else
						item.type = 'image';
				}
			}
		});
	});

	//Window Resize
	(function() {
		var delay = (function(){
			var timer = 0;
			return function(callback, ms){
				clearTimeout (timer);
				timer = setTimeout(callback, ms);
			};
		})();

		//Functions
		function resizeFunctions() {
			menu();
			headerOptions();
			pageHeight();
		}

		if(isTouchDevice) {
			$(window).bind('orientationchange', function() {
				delay(function(){
					resizeFunctions();
				}, 50);
			});
		} else {
			$(window).on('resize', function() {
				delay(function(){
					resizeFunctions();
				}, 50);
			});
		}
	}());
})(jQuery);

