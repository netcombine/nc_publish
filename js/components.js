$(window).on('load',function(){
	$('.component').each(function(idx){
		var com = $(this).find('.component-box').attr('class').replace(/component-box /,'');
		component_list['component_'+com] = nc_landing.components['component_'+com];
	});
	for(var com_name in component_list){
		component_list[com_name]();
	}
});
nc_landing.components = {
	component_test : function(){
		console.log('ready test!');
	}
}
