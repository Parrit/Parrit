const React = require('react');

module.exports = function (name) {
    return class extends React.Component {
        render() {
            return <div name={name}>
                {this.props.children}
            </div>;
        }
    };
};