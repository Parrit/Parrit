var React = require('react');

module.exports = function(name) {
    return React.createClass({
        render:
            function(){
                return <div name={name}>
                    {this.props.children}
                    </div>;
            }
    });
};