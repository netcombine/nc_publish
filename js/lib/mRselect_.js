(function(){
	//Cached vars
	var _mRselect = 'mRselect',
    _mobile = /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);
	$.fn[_mRselect] = function(options, fire){
		var settings = $.extend({
			container:$('.select-box')
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
				'height':'auto'
			}).appendTo($(this).parent());
			$(this).appendTo(container);
			con_t = container.offset().top-fixed_gab;
			$('body').css('overflow','hidden');
			if(container.offset().left >= 0){
				con_l = container.offset().left;
			}else{
				con_l = container.offset().left+$(window).width();
			}
			$('body').css('overflow-y','auto');
			var dv = $('<div class="mRselect">').appendTo(settings.container).on('click',show_list);
			var select = $('<div>').appendTo(dv).text(op.eq(0).text());
			var uu = $('<ul>').appendTo(dv);
			for(var i = 0; i < op_num; i ++){
				var ll = $('<li>').text(op.eq(i).text()).appendTo(uu).on('mouseenter',m_enter).on('mouseleave',m_leave).on('click',select_item);
				}
			function m_enter(){
				if(!$(this).hasClass('on') && $(this).index() != 0){
				}
			}
			function m_leave(){
				if(!$(this).hasClass('on') && $(this).index() != 0){
				}
			}
			function select_item(e){
				e.stopPropagation();
				$(this).addClass('on').siblings('li').removeClass('on');
				$(this).parent().hide();
				select.text($(this).text());
			}
			function show_list(e){
				e.stopPropagation();
				var uu_top;
				zIdx++;
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