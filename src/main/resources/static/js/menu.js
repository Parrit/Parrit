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
	
	$("#save").click(function(){
		var htmlContents = $('.workspace').html();
		$.ajax({
			  url: 'http://parrit-data.cfapps.io/workspaces/1',
			  type: 'PUT',
			  data: {"htmlContents":htmlContents},
			  success: function(data) {
			    alert('Load was performed.');
			  }
			});
	});
});