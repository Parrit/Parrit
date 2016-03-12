var React = require('react');

var Header = React.createClass({
    render: function() {
        return <header>
            <a href="/" className="header-logo"/>
            <div className="links">
                <span className="logout">LOGOUT</span>
                <span className="history">HISTORY<div className="history-carrot"></div></span>
            </div>
        </header>
    }
});

module.exports = Header;