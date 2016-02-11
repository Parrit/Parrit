var React = require('react');

var PrimaryButton = createButtonClass("primary");
var SuccessButton = createButtonClass("success");

function createButtonClass(type) {
    var classes = "btn btn-" + type + " btn-block";
    return React.createClass({
        render: function () {
            return <button className={classes} onClick={this.props.clickFunction}>{this.props.name}</button>
        }
    });
}

module.exports = {
  PrimaryButton: PrimaryButton,
  SuccessButton: SuccessButton
};
