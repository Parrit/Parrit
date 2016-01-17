// main.js
var React = require('react');
var ReactDOM = require('react-dom');

var Menu = React.createClass({
	render: function() {
  	return React.createElement('ul', null,
    	React.createElement(PrimaryButton, {name: "Move", clickFunction:this.allowMove}),
    	React.createElement(PrimaryButton, {name: "Don't Move", clickFunction:this.preventMove}),
    	React.createElement(SuccessButton, {name: "Save", clickFunction:this.saveWorkspace})
    );
	},

	allowMove: function() {
		$(".no-draggable").addClass("draggable").removeClass("no-draggable");
	},
	
	preventMove: function() {
		$(".draggable").addClass("no-draggable").removeClass("draggable");
	},
	
	saveWorkspace: function() {
		var htmlContents = $('.workspace').html();
 		var payload = {"htmlContents":htmlContents};
 		this.postJSON("/workspace", payload, function() {console.log("Inserted new workspace")});
	},
	
	postJSON: function(url, data, callback) {
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
});

var PrimaryButton = React.createClass({
	render: function() {
  	return React.createElement('button', 
		{
  			className: "btn btn-primary btn-block activatable",
  			onClick: this.props.clickFunction
  		},
        this.props.name
    );
  }
});

var SuccessButton = React.createClass({
	render: function() {
  	return React.createElement('button', 
		{
  			className: "btn btn-success btn-block",
  			onClick: this.props.clickFunction
  		},
        this.props.name
    );
  }
});

function run() {
	ReactDOM.render(<Menu />, document.getElementById('menu'));
}

var loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState) && document.body) {
  run();
} else {
  window.addEventListener('DOMContentLoaded', run, false);
}