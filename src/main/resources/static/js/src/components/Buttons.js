var React = require('react');

var PrimaryButton = React.createClass({
	render: function() {
  	return <button className="btn btn-primary btn-block activatable" onClick={this.props.clickFunction}>{this.props.name}</button>
  }
});

var SuccessButton = React.createClass({
	render: function() {
  	return <button className="btn btn-success btn-block" onClick={this.props.clickFunction}>{this.props.name}</button>
  }
});

module.exports = {
  PrimaryButton: PrimaryButton,
  SuccessButton: SuccessButton
}
