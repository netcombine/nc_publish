'use strict';
if(location.protocol.indexOf('file') >= 0 || ( location.protocol.indexOf('http') <= -1 && location.href.indexOf('localhost') <= -1)) location.href=location.href.replace(/.*(nc_publish|netcombine|publish)\/(.*)/,'http://localhost/$2');
var nc_landing = {},
	page_list = {},
	component_list = [],
	section_list = [],
	resize_fn = [],//resize시 사용
	scroll_fn = [],//scroll시 사용
	wheel_fn = [];//wheel시 사용
$(document).on('DOMContentLoaded',function(){
	/*** 페이지 구분 ***/
	var page_url = location.href.split('/'),
		head_title = '',
		head_common = ' | Netcombine Framework';
	page_url = page_url[page_url.length-1].split('.')[0];
	switch(page_url){
		case 'layout':
			head_title = '레이아웃 페이지'
			break;
		case 'main':
			head_title = '메인 페이지'
			break;
		case 'test':
			head_title = '테스트 페이지'
			break;
		default:
	}
	$('head title').text(head_title + head_common);
	/* 헤더 푸터 로드 */
	$.get('/hbs/header.hbs',function( text ){
		var obj = {
			title : head_title + " 헤더영역",
			menu : [
				{title : "네이버", url : "http://www.naver.com"},
				{title : "다음", url : "#next"},
				{title : "구글", url : "https://google.co.kr"}
			]
		};
		var tmpl = Handlebars.compile( text );
		var ctx = obj;
		var html = tmpl( ctx );
		$('#container').prepend( html );
	}).done(function(){
	});
	$.get('/hbs/footer.hbs',function( text ){
		var obj = {};
		var tmpl = Handlebars.compile( text );
		var ctx = obj;
		var html = tmpl( ctx );
		$('#container').append( html );
	}).done(function(){
	});
});