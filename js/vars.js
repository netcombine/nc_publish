'use strict';
if(location.protocol.indexOf('file') >= 0 || ( location.protocol.indexOf('http') <= -1 && location.href.indexOf('localhost') <= -1)) location.href=location.href.replace(/.*nc_publish\/(.*)/,'http://localhost/$1');
var nc_landing = {},
	page_list = {},
	component_list = [],
	section_list = [],
	resize_fn = [],//resize시 사용
	scroll_fn = [],//scroll시 사용
	wheel_fn = [];//wheel시 사용
