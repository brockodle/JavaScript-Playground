var anim_out = function(divs,next_function){
	console.log(divs)
	var btm = $('body').position();
	var ht = $('body').height();
	var counter = 1;
	for (var i = 0; i <= divs.length; i++){
		var interval = (100*(counter*1.125));
		counter++;
		divs.reverse();
		$(divs[i]).animate({'top':'-50'},50).animate({'top':btm.top + ht},interval).fadeOut(100).delay(50,function(){
			$('body').animate().delay(500,function(){
				next_function();
			});
		});
	}
	console.log(next_function);
}

var anim_in = function(divs,next_function){
	console.log(divs)
	var btm = $('body').position();
	var ht = $('body').height();
	var counter = 1;
	for (var i = 0; i <= divs.length; i++){
		var interval = (100*(counter*1.125));
		counter++;
		divs.reverse();
		$(divs[i]).animate({'top':btm.top - ht},interval).animate({'top':'-50'},50).fadeOut(100).delay(50,function(){
			$('body').animate().delay(500,function(){
				next_function();
			});
		});
	}
	console.log(next_function);
}