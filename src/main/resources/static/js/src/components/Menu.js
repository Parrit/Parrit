var React = require('react');
var PrimaryButton = require('./Buttons.js').PrimaryButton;
var SuccessButton = require('./Buttons.js').SuccessButton;

var Menu = React.createClass({
	render: function() {
	  	return React.createElement('ul', null,
	    	React.createElement(PrimaryButton, {name: "Move", clickFunction: this.props.enableMove}),
	    	React.createElement(PrimaryButton, {name: "Don't Move", clickFunction: this.props.disableMove}),
	    	React.createElement(SuccessButton, {name: "Save"})
	    );
	},
});

module.exports = Menu;
