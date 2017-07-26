$(window).on('load',function(){
	
});
$(window).on('resize',function(){

}).on('scroll',function(){
	for(var fn in scroll_fn){
		eval(scroll_fn[fn]);
	}
}).on('orientationchange',function(){
	for(var fn in resize_fn){
		eval(resize_fn[fn]);
	}
}).on('mousewheel DOMMouseScroll',function(e){
	
});
nc_landing.util = {
	win_info : {
		get_winW : function(){
			return $(window).width();
		},
		get_winH : function(){
			return $(window).height();
		},
		get_scrollT : function(){
			return $(window).scrollTop();
		},
		set_scrollT : function(num,ani,delay,callback_fn){
			if(ani){
				$('body').stop().animate({
					'scrollTop':num
				},{
					'queue':false,
					'duration':delay,
					'complete':callback_fn
				});
			}else{
				$('body').scrollTop(num);
			}
		},
		get_device : function(){
			var browser_name = undefined;
			var userAgent = navigator.userAgent.toLowerCase();
			switch(true){
				case /iphone/.test(userAgent) :
					browser_name = 'ios';
					break;
				case /naver/.test(userAgent) :
					browser_name = 'naver';
					break;
				case /msie 6/.test(userAgent) :
					browser_name = 'ie6';
					break;
				case /msie 7/.test(userAgent) :
					browser_name = 'ie7';
					break;
				case /msie 8/.test(userAgent) :
					browser_name = 'ie8';
					break;
				case /msie 9/.test(userAgent) :
					browser_name = 'ie9';
					break;
				case /msie 10/.test(userAgent) :
					browser_name = 'ie10';
					break;
				case /edge/.test(userAgent) :
					browser_name = 'edge';
					break;
				case /chrome/.test(userAgent) :
					browser_name = 'chrome';
					break;
				case /safari/.test(userAgent) :
					browser_name = 'safari';
					break;
				case /firefox/.test(userAgent) :
					browser_name = 'firefox';
					break;
				case /opera/.test(userAgent) :
					browser_name = 'opera';
					break;
				case /mac/.test(userAgent) :
					browser_name = 'mac';
					break;
				default :
					browser_name = 'unknown';
			}
			return browser_name;
		}
	}
}
nc_landing.action = {
	scroll_gap : 0,
	fix_scroll : function(){
		this.scroll_gap = $('body').scrollTop();
		$('#container').css({
			'transform':'translate(0 ,-'+this.scroll_gap+'px)'
		});
		$('#header').css({
			'transform':'translate(0 ,'+this.scroll_gap+'px)'
		});
		$('#gnb').css({
			'transform':'translate(0 ,'+this.scroll_gap+'px)'
		});
		$('body').css({
			'height':kbs_landing.util.get_winH(),
			'overflow-y':'hidden'
		});
	},
	auto_scroll : function(){
		$('#container').css({
			'transform':'inherit'
		});
		$('#header').css({
			'transform':'inherit'
		});
		$('#gnb').css({
			'transform':'inherit'
		});
		$('body').css({
			'height':'auto',
			'overflow-y':'auto'
		}).scrollTop(this.scroll_gap)
	},
	anchor : function(){
		$('.anchor').each(function(idx){
			$(this).off('click').on('click',function(){
				var ta = $(this).data('target'),//data-target
					scroll_ta = $('.'+ta).offset().top,
					gab = 0;
				$('html,body').stop().animate({
					'scrollTop':scroll_ta
				},{
					queue:false,
					duration:500
				});
			});
		});
	},
	selecton : function(ta){
		ta.find('a').on('click',function(){
			if(!$(this).hasClass('on')){
				$(this).addClass('on');
			}
		});
	},
	toggleon : function(ta){
		ta.on('click',function(){
			if(ta.find('a').length > 0){
				if(!$(this).find('a').hasClass('on')){
					$(this).find('a').addClass('on');
				}else{
					$(this).find('a').removeClass('on');
				}
			}else{
				if(!$(this).hasClass('on')){
					$(this).addClass('on');
				}else{
					$(this).removeClass('on');
				}
			}
		});
	},
	top_btn : function(){
		if(nc_landing.util.win_info.get_scrollT() > 0){
			$('.btn-top').show().on('click',function(){
				$('body').stop().animate({
					'scrollTop':0
				});
			});
		}else{
			$('.btn-top').hide().off('click');
		}
	},
	img_ratio : function(container){
		$('.'+container).each(function(){
			$(this).find('.img-box').each(function(){
				var img_ta = $(this).find('img');
				var ww = img_ta[0].naturalWidth,
				hh = img_ta[0].naturalHeight;
				if(ww > hh){
					$(this).removeClass('hh').addClass('ww');
					if($(this).width() > $(this).find('img').width()){
						$(this).removeClass('ww').addClass('hh');
					}
				}else{
					$(this).removeClass('ww').addClass('hh');
					if($(this).width() < $(this).find('img').width()){
						$(this).removeClass('hh').addClass('ww');
					}
				}
			});
		});
	},
	loading_inter : null,
	loading_on : function(){
		var _this = this;
		if(_this.loading_inter == null){
			var loading = $('<div class="loading">'),
				loading_box = $('<div class="loading-box">'),
				loading_count = 0,
				loading_target_count = 0;
			loading_box.appendTo(loading);
			loading.appendTo($('body'));
			_this.loading_inter = setInterval(
			function(){
				loading_count++;
				if(loading_count > 12){
					loading_count = 0;
				}
				loading_box.css({
					'background-position':'0 '+(loading_count*-48)+'px'
				})
			},100);
			this.fix_scroll();
		}
	},
	loading_off : function(){
		if(this.loading_inter != null){
			clearInterval(this.loading_inter);
			this.loading_inter = null;
		}
		$('.loading').empty().remove();
		this.auto_scroll();
	},
	tab : function(){//tab 공통
		if($('.tabWrap').length > 0){
			$('.tabJs').each(function(){//visible클래스 부여시 visible속성으로 작용. 기본은 display
				var tabWrap = $(this);
				if(tabWrap.hasClass('onlytab')){//onlytab 탭기능만사용
					tabWrap.find('> .tabArea li a').off('click').on('click',function(){
						$(this).parent().addClass('on').siblings().removeClass('on');
					});
				}else{
					var idx = tabWrap.find('> .tabArea:first li.on').index();
					tabWrap.find('> .conArea > .tabCon:eq('+idx+')').addClass('on');
					tabWrap.find('> .tabArea li a').off('click').on('click',function(){
						var idx = $(this).parent().index();
						if(!$(this).parent().hasClass('disable')){
							$(this).parent().addClass('on').siblings().removeClass('on');
							tabWrap.find('> .conArea > .tabCon:eq('+idx+')').addClass('on').siblings('.tabCon').removeClass('on');
						}
					});
				}
			});
		}
	},
	tab_scroll : function(resize){
		$('.tabWrap').each(function(){
			var slider_w = $(this).width();
			var slider_box = $(this).find('.tab-scroll-box li'),
				num = slider_box.size(),
				size = 0;
			if(!resize){
				size = 0;
				slider_box.each(function(){
					size+= $(this).width();
				});
				if(size > slider_w){
					$('.bg-scroll').show();
					$('.tabArea').removeClass('col'+num);
					$('.tab-scroll-box ul').css('width',size+1);
					$('.tab-scroll-box ul li a').css('padding', '0 15px');
				}else{
					$('.bg-scroll').hide();
					$('.tabArea').addClass('col'+num);
					$('.tab-scroll-box ul').css('width', 'auto');
					$('.tab-scroll-box ul li a').css('padding', '0');
				}
			}else{
				$('.tabArea').removeClass('col'+num);
				$('.tab-scroll-box ul').css('width', 'auto');
				$('.tab-scroll-box ul li a').css('padding', '0 15px');
				size = 0;
				slider_box.each(function(){
					size+= $(this).width();
				});
				if(size > slider_w){
					$('.bg-scroll').show();
					$('.tab-scroll-box ul').css('width',size+1);
					$('.tab-scroll-box ul li a').css('padding', '0 15px');
				}else{
					$('.bg-scroll').hide();
					$('.tabArea').addClass('col'+num);
					$('.tab-scroll-box ul li a').css('padding', '0');
				}
			}
		});
	},
	popup : {//popup 공통
		submit_type : 0,
		custom_btn : [],
		button_size_check : function(){
			var btn_size = $('.btn-box a').size();
			var btn_width = 100/btn_size;
			$('.btn-box a').css({
				'width': parseInt(btn_width)+'%'
			});
		},
		open : function(popup_info){
			nc_landing.action.fix_scroll();
			this.custome_btn = [];
			popup_info.type = this.submit_type;
			var _this = this;
			$.get('../../hbs/popup.hbs',function( text ){
				var tmpl = Handlebars.compile( text );
				var html = tmpl( popup_info );
				if($('.popup').length>0){
					_this.close();
				}
				$('body').append( html );
			}).done(function(){
				$('.popup-closeBtn').off('click').on('click',function(){
					_this.close();
				});
				$('.btn-box a').each(function(idx){
					if(_this.compare(idx,popup_info.num)){
						_this.custom_btn.push($(this).attr('class').replace(/btn-/,''));
					}else{
						$(this).empty().remove();
					}
				});
				for(var btn in _this.custom_btn){
					_this[_this.custom_btn[btn]]();
				}
				_this.popup_posY();
				nc_landing.action.popup.button_size_check();
			});
		},
		share : function(popup_info){
			var _this = this;
			kbs_landing.action.fix_scroll();
			$.get('../../hbs/popup-share.hbs',function( text ){
				var tmpl = Handlebars.compile( text );
				var html = tmpl( popup_info );
				if($('.popup').size()>0){
					_this.close();
				}
				$('body').append( html );
			}).done(function(){
				$('.popup-closeBtn').off('click').on('click',function(){
					_this.close();
				});
				$('.popup-sns li a').off('click').on('click',_this.sns);
				$('.btn-copy-url').off('click').on('click',function(){
					_this.close();
					_this.sns_url_copy();
				});
				_this.popup_posY();
			});
		},
		change : function(popup_info){
			this.close();
			this.open(popup_info);
		},
		compare : function(idx,arr){
			for(var i in arr){
				if(arr[i] == idx){
					return true;
				}
			}
		},
		popup_posY : function(){
			var pop = $('.popup-info');
			var pop_h = (kbs_landing.util.get_winH()-pop.height())*.5;
			pop.css({'top':pop_h});
		},
		close : function(){
			$('.popup').empty().remove();
			nc_landing.action.auto_scroll();
		},
		submit : function(){
			var _this = this;
			$('.btn-submit').off('click').on('click',function(){
				switch(_this.submit_type){
					case 0 :
						console.log('0 submit!!');
						break;
					case 1 :
						console.log('1 submit!!');
						break;
					case 2 :
						console.log('2 submit!!');
						break;
					default :
						console.log('etc submit!!');
				}
				_this.close();
			});
		},
		cancel : function(){
			var _this = this;
			$('.btn-cancel').off('click').on('click',function(){
				_this.close();
				console.log('cancel!!');
			});
		},
	},
	text_toggle : function(ta,txt_leng){
		if($('.text-toggle').length > 0){
			var ta_ = ta.find('span'),
				txt_html = ta_.html(),
				txt_text = ta_.text(),
				txt = '';
			txt = txt_text.substr(0,txt_leng);
			ta_.empty().html(txt+'...');
			$('.btn-des').off('click').on('click',function(){
				if($(this).hasClass('compress')){
					$(this).text('더보기');
					$(this).removeClass('compress');
					ta_.empty().html(txt+'...');
				}else{
					$(this).text('닫기');
					$(this).addClass('compress');
					ta_.empty().html(txt_html);
				}
			});
		}
	}
}
