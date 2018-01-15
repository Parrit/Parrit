import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';

import PairingHistoryRecordList from './PairingHistoryRecordList.js';

class PairingHistory extends React.Component {
    componentDidMount() {
        this.props.fetchPairingHistory(this.props.projectId);
    }

    render() {
        const pairingHistoryRecordListProps = {
            pairingHistoryList: this.props.pairingHistoryList
        };

        const classes = 'pairing-history-panel' + (this.props.isPairingHistoryPanelOpen ? ' panel-open' : ' panel-closed');

        return (
            <div className={classes}>
                <Scrollbars>
                    <div className="inner-pairing-history-wrapper">
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
                </Scrollbars>
            </div>
        )
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

export default PairingHistory;
