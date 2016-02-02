var React = require('react');
var PrimaryButton = require('./Buttons.js').PrimaryButton;
var SuccessButton = require('./Buttons.js').SuccessButton;

var Menu = React.createClass({
	render: function() {
	  	return React.createElement('ul', null,
	    	React.createElement(PrimaryButton, {name: "Move", clickFunction:this.allowMove}),
	    	React.createElement(PrimaryButton, {name: "Don't Move", clickFunction:this.preventMove}),
	    	React.createElement(SuccessButton, {name: "Save", clickFunction:this.saveWorkspace})
	    );
	},
});

module.exports = Menu;
