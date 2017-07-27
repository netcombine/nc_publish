$(window).on('load',function(){
	$('#content > .page').each(function(idx){
		var classname = $(this).attr('class').split(' ');
		page_list['page_'+classname[0]] = nc_landing.page[classname[0]].init;
		if(classname[1] != undefined){
			page_list['sub_'+classname[1]] = nc_landing.page[classname[0]].sub[classname[1]];
		}
	});
	for(var page_name in page_list){
		page_list[page_name]();
	}
});
nc_landing.page = {
	section : {
		init : function(){
			console.log('ready section!');
		},
		sub : {
			drama : function(){
				console.log('ready drama!');
			},
			entertainment : function(){
				console.log('ready entertainment!');
			}
		}
	},
	vertical : {
		init : function(){
			console.log('ready vertical!');	
		},
		sub : {
			sport : function(){
				console.log('ready sport!');
			}
		}
	}
}

