var React = require('react');

var Header = React.createClass({
    propTypes: {
        setPairingHistoryPanelOpen: React.PropTypes.func.isRequired,
        isPairingHistoryPanelOpen: React.PropTypes.bool.isRequired
    },

    render: function() {
        return <header>
            <a href="/" className="header-logo"/>
            <div className="links">
                <h3 className="logout">LOGOUT</h3>
                <h3 className="history" onClick={this.props.isPairingHistoryPanelOpen ? this.closePairingHistoryPanel : this.openPairingHistoryPanel}>HISTORY
                    <div className={this.props.isPairingHistoryPanelOpen ? 'history-caret-right' : 'history-caret-left'}></div>
                </h3>
            </div>
        </header>
    },

    openPairingHistoryPanel: function() {
        this.props.setPairingHistoryPanelOpen(true);
    },

    closePairingHistoryPanel: function() {
        this.props.setPairingHistoryPanelOpen(false);
    }
});

module.exports = Header;