var React = require('react');

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

module.exports = {
  PrimaryButton: PrimaryButton,
  SuccessButton: SuccessButton
}
