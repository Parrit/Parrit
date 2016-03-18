var React = require('react');

var PairingHistory = React.createClass({
    propTypes: {
        setPairingHistoryPanelOpen: React.PropTypes.func.isRequired,
        isPairingHistoryPanelOpen: React.PropTypes.bool.isRequired
    },

    render: function() {
        var classes = 'pairing-history-panel' + (this.props.isPairingHistoryPanelOpen ? ' panel-open' : ' panel-closed');
        return <div className={classes}>
            <div className="header">
                <h2>Pair Rotation History</h2>
                <div className="cancel" onClick={this.closePairingHistoryPanel}></div>
            </div>
            <div className="body">
                <div className="no-history">
                    <div className="clock"></div>
                    <div className="content">
                        ‘Record Pairs’ to track daily rotation history. The more you record, the better the recommendation engine becomes.
                    </div>
                </div>
            </div>
        </div>
    },

    closePairingHistoryPanel: function() {
        this.props.setPairingHistoryPanelOpen(false);
    }
});

module.exports = PairingHistory;
