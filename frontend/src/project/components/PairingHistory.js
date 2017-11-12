import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
require('malihu-custom-scrollbar-plugin')($);

import PairingHistoryRecordList from 'project/components/PairingHistoryRecordList.js';

export default class PairingHistory extends React.Component {
    componentDidMount() {
        this.props.fetchPairingHistory(this.props.projectId);
        $('.pairing-history-panel').mCustomScrollbar({theme:"minimal-dark"});
    }

    render() {
        const pairingHistoryRecordListProps = {
            pairingHistoryList: this.props.pairingHistoryList
        };

        const classes = 'pairing-history-panel' + (this.props.isPairingHistoryPanelOpen ? ' panel-open' : ' panel-closed');

        return <div className={classes}>
            <div className="header">
                <h2>Pair Rotation History</h2>
                <div className="cancel" onClick={this.closePairingHistoryPanel.bind(this)}/>
            </div>
            <div className="body">
                {(function(pairingHistoryList) {
                    if(pairingHistoryList.length === 0) {
                        return <div className="no-history">
                            <div className="clock"/>
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
    }

    closePairingHistoryPanel() {
        this.props.setPairingHistoryPanelOpen(false);
    }
}

PairingHistory.propTypes = {
    pairingHistoryList: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchPairingHistory: PropTypes.func.isRequired,
    setPairingHistoryPanelOpen: PropTypes.func.isRequired,
    isPairingHistoryPanelOpen: PropTypes.bool.isRequired
};
