var React = require('react');

var Header = React.createClass({
    render: function() {
        return <header>
            <a href="/" className="header-logo"/>
            <div className="links">
                <h3 className="logout">LOGOUT</h3>
                <h3 className="history">HISTORY<div className="history-carrot"></div></h3>
            </div>
        </header>
    }
});

module.exports = Header;