function saveState(state) {
	postJSON("/state", state, function() {console.log("Inserted new workspace")});
}

function postJSON(url, data, callback) {
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
}
