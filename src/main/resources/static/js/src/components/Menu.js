var React = require('react');
var PrimaryButton = require('./Buttons.js').PrimaryButton;
var SuccessButton = require('./Buttons.js').SuccessButton;

var Menu = React.createClass({
	render: function() {
	  	return <ul>
	  		<PrimaryButton name="Move" clickFunction={this.props.enableMove}/>
	  		<PrimaryButton name="Don't Move" clickFunction={this.props.disableMove}/>
	  		<SuccessButton name="Save"/>
  		</ul>
	},
});

module.exports = Menu;
