var React = require('react');

var PrimaryButton = createButtonClass("primary");
var SuccessButton = createButtonClass("success");
var DangerButton = createButtonClass("danger");

function createButtonClass(buttonTypeName) {
    var classes = "btn btn-" + buttonTypeName;

    return React.createClass({
        propTypes: {
            name: React.PropTypes.string.isRequired,
            clickFunction: React.PropTypes.func,
            type: React.PropTypes.string
        },

        render: function () {
            var type = this.props.type || 'button';
            return <button className={classes} type={type} onClick={this.props.clickFunction}>{this.props.name}</button>
        }
    });
}

module.exports = {
    PrimaryButton: PrimaryButton,
    SuccessButton: SuccessButton,
    DangerButton: DangerButton
};
