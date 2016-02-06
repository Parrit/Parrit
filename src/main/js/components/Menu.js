var React = require('react');

var Buttons = require('components/Buttons.js');
var PrimaryButton = Buttons.PrimaryButton;
var SuccessButton = Buttons.SuccessButton;

var Menu = React.createClass({
	render: function() {
	  	return <ul>
	  		<PrimaryButton name="Move" clickFunction={this.props.enableMove}/>
	  		<PrimaryButton name="Don't Move" clickFunction={this.props.disableMove}/>
	  		<SuccessButton name="Save" clickFunction={this.props.saveState}/>
  		</ul>
	}
});

module.exports = Menu;
