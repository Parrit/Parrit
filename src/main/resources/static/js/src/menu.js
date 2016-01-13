$.postJSON = function(url, data, callback) {
    return jQuery.ajax({
    headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
    },
    'type': 'POST',
    'url': url,
    'data': JSON.stringify(data),
    'dataType': 'json',
    'success': callback
    });
};

$(document).ready(function() {
	$(".menu button activatable").click(function(){
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
//		htmlContents = htmlContents.replace(/\"/g,'\\"');
		var payload = {"htmlContents":htmlContents};
		$.postJSON("/workspace", payload, function() {console.log("Inserted new workspace")});
	});
});