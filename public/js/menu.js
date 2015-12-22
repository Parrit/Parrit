$(document).ready(function() {
	$(".menu button").click(function(){
		$(".menu button").removeClass("active");
		$(this).addClass("active");
	});
	
	$("#move").click(function(){
		$(".no-draggable").addClass("draggable").removeClass("no-draggable");
	});
	
	$("#no-move").click(function(){
		$(".draggable").addClass("no-draggable").removeClass("draggable");
	});
});