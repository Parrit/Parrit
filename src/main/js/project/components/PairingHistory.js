var React = require('react');
var $ = require('jquery');
require('malihu-custom-scrollbar-plugin')($);

var PairingHistoryRecordList = require('project/components/PairingHistoryRecordList.js');

var PairingHistory = React.createClass({
    propTypes: {
        pairingHistoryList: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        fetchPairingHistory: React.PropTypes.func.isRequired,
        setPairingHistoryPanelOpen: React.PropTypes.func.isRequired,
        isPairingHistoryPanelOpen: React.PropTypes.bool.isRequired
    },
    
    componentDidMount: function() {
        this.props.fetchPairingHistory(this.props.projectId);
        $('.pairing-history-panel').mCustomScrollbar({theme:"minimal-dark"});
    },

    render: function() {
        var pairingHistoryRecordListProps = {
            pairingHistoryList: this.props.pairingHistoryList
        };

        var classes = 'pairing-history-panel' + (this.props.isPairingHistoryPanelOpen ? ' panel-open' : ' panel-closed');
        return <div className={classes}>
            <div className="header">
                <h2>Pair Rotation History</h2>
                <div className="cancel" onClick={this.closePairingHistoryPanel}></div>
            </div>
            <div className="body">
                {(function(pairingHistoryList){
                    if(pairingHistoryList.length == 0) {
                        return <div className="no-history">
                            <div className="clock"></div>
                            <div className="no-history-content">
                                ‘Record Pairs’ to track daily rotation history. The more you record, the better the recommendation engine becomes.
                            </div>
                        </div>
                    }
                    else {
                        return <PairingHistoryRecordList {...pairingHistoryRecordListProps}/>
                    }
                })(this.props.pairingHistoryList)}
            </div>
        </div>
    },

    closePairingHistoryPanel: function() {
        this.props.setPairingHistoryPanelOpen(false);
    }
});

module.exports = PairingHistory;
