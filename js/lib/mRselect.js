(function(){
	//Cached vars
	var _mRselect = 'mRselect',
    _mobile = /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);
	$.fn[_mRselect] = function(options, fire){
		var settings = $.extend({
			container:'',
			height: 50, 
			arrow_size:0,
			arrow_url:'',
			back_co:'#fff',
			over_co:'#ccc',
			select_co:'#ccc',
			border:1
		}, options);
		var con_l = 0,
			con_t = 0,
			fixed_gab = 0,
			m_left = 0,
			zIdx = 1000;
		if(settings.container.css('position') == 'fixed'){
			fixed_gab = settings.container.offset().top;
		}else{
			fixed_gab = 0;
		}
		$(this).each(function(idx){
			var container = null,
				op = $(this).find('option'),
				op_num = op.length;
			container = $('<div class="select'+idx+'">').css({
				'width':'100%',
				'height':settings.height
			}).appendTo($(this).parent());
			$(this).parent().css({
				'width':$(this).width()+parseInt($(this).parent().css('padding-left'))+parseInt($(this).parent().css('padding-right')),
				'padding':0	
			});
			$(this).css({
				'height':0,
				'position':'absolute',
				'opacity':0
			}).appendTo(container);
			con_t = container.offset().top-fixed_gab;
			$('body').css('overflow','hidden');
			if(container.offset().left >= 0){
				con_l = container.offset().left;
			}else{
				con_l = container.offset().left+$(window).width();
			}
			$('body').css('overflow-y','auto');
			var dv = $('<div class="mRselect">').css({
				'position':'absolute',
				'width':container.width(),
				'margin':0,
				'padding':0,
				'left':con_l,
				'top':con_t,
				'z-index':zIdx
			}).appendTo(settings.container).on('click',show_list);
			var select = $('<div>').css({
				'float':'none',
				'margin':0,
				'padding':0,
				'border':settings.border+'px solid '+settings.over_co,
				'background':settings.back_co,
				'line-height':(settings.height-settings.border)+'px',
				'padding':'0 10px',
				'text-overflow':'clip',
				'white-space':'nowrap',
				'overflow':'hidden',
				'margin':0,
				'cursor':'pointer',
				'background':settings.back_co+' url('+settings.arrow_url+') no-repeat 95% center',
				'height':settings.height-settings.border*2
			}).appendTo(dv).text(op.eq(0).text());
			var uu = $('<ul>').css({
				'display':'none',
				'margin':0,
				'padding':0,
				'list-style':'none',
				'height':settings.height*op_num-op_num*settings.border,
				'border':settings.border+'px solid #ddd',
			}).appendTo(dv);
			for(var i = 0; i < op_num; i ++){
				var ll = $('<li>').css({
					'float':'none',
					'border-bottom':settings.border+'px solid '+settings.over_co,
					'background':settings.back_co,
					'padding':'0 10px',
					'margin':0,
					'cursor':'pointer',
					'line-height':(settings.height-settings.border)+'px',
					'height':settings.height-settings.border*2
				}).text(op.eq(i).text()).appendTo(uu).on('mouseenter',m_enter).on('mouseleave',m_leave).on('click',select_item);
				if(i == op_num){
					ll.css({
						'border':'none'
					});
				}
				if(i == 0){
					ll.addClass('on').css({
						'color':'#fff',
						'background':settings.select_co
					});
				}
			}
			function m_enter(){
				if(!$(this).hasClass('on') && $(this).index() != 0){
					$(this).css({
						'background':settings.over_co
					});
				}
			}
			function m_leave(){
				if(!$(this).hasClass('on') && $(this).index() != 0){
					$(this).css({
						'background':settings.back_co
					});
				}
			}
			function select_item(e){
				e.stopPropagation();
				$(this).addClass('on').css({
					'background':settings.select_co
				}).siblings('li').removeClass('on').css({
					'background':settings.back_co
				}).css({
					'color':'#3c3f43',
					'font-weight':'normal'
				});
				$(this).css({
					'color':'#fff',
					'font-weight':900
				});
				$(this).parent().hide();
				select.text($(this).text());
			}
			function show_list(e){
				e.stopPropagation();
				var uu_top;
				zIdx++;
				$(this).css({
					'z-index':zIdx
				});
				if($(this).offset().top-settings.container.offset().top-$('body').scrollTop() > $(window).height()*.5){
					//위로나옴
					uu_top = -settings.height*(op_num+1)+op_num;
				}else{
					uu_top = 0;
				}
				$('.mRselect ul').hide();
				$('.mRselect').removeClass('on');
				if(!$(this).hasClass('on')){//close
					uu.show();
					$(this).addClass('on');
				}else{//open
					uu.hide();
					$(this).removeClass('on');
				}
				uu.css({
					'margin-top':uu_top
				});
				$(window).on('click',win_out);
			}
		});
		function win_out(){
			$('.mRselect').removeClass('on');
			$('.mRselect ul').hide();
			$(window).off('click');
		}
		function pos(){
			$('.mRselect').each(function(idx){
				if($(this).offset().left >= 0){
					$(this).css({
						//'top':$('.select'+idx).offset().top-settings.container.offset().top+settings.container.scrollTop(),
						'width':$('.select'+idx).width(),
						'left':$('.select'+idx).offset().left
					});
				}
			});
		}
		$(window).on('resize',function(){
			pos();
		});
	}
})();