import React from 'react';
import PropTypes from 'prop-types';

export default class Button extends React.Component {
    render() {
        const type = this.props.type || 'button';

        return (
            <button type={type} title={this.props.tooltip} className={this.props.className} onClick={this.props.clickFunction}>
                <span className="name">{this.props.name}</span>
                <span className="short-name">{this.props.shortName || this.props.name}</span>
            </button>
        )
    }
}

Button.propTypes = {
    name: PropTypes.string.isRequired,
    shortName: PropTypes.string,
    className: PropTypes.string,
    clickFunction: PropTypes.func,
    type: PropTypes.string,
    tooltip: PropTypes.string
};
