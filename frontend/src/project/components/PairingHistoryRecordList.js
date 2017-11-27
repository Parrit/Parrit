import React from 'react';
import PropTypes from 'prop-types';

import PairingHistoryRecord from 'project/components/PairingHistoryRecord.js';

export default class PairingHistoryRecordList extends React.Component {
    render() {

        function createPairingHistoryRecord(pairingTime) {
            return {
                pairingTime: pairingTime,
                pairingBoardsWithPeople: []
            }
        }

        const pairingHistoryRecords = [];
        let currentPairingTime = this.props.pairingHistoryList[0].pairingTime;
        let currentPairingHistoryRecord = createPairingHistoryRecord(currentPairingTime);

        this.props.pairingHistoryList.forEach(function(pairingHistory) {
            if(pairingHistory.pairingTime !== currentPairingTime) {
                pairingHistoryRecords.push(currentPairingHistoryRecord);
                currentPairingTime = pairingHistory.pairingTime;
                currentPairingHistoryRecord = createPairingHistoryRecord(pairingHistory.pairingTime);
            }
                
            currentPairingHistoryRecord.pairingBoardsWithPeople
                .push({pairingBoardName: pairingHistory.pairingBoardName, people: pairingHistory.people});
        });
        pairingHistoryRecords.push(currentPairingHistoryRecord);

        return (
            <div className="pairing-history-record-list">
                {pairingHistoryRecords.map(function(pairingHistoryRecord, idx) {
                    return <PairingHistoryRecord key={idx} pairingTime={pairingHistoryRecord.pairingTime}
                        pairingBoardsWithPeople={pairingHistoryRecord.pairingBoardsWithPeople} />;
                })}
            </div>
        )
    }
}

PairingHistoryRecordList.propTypes = {
    pairingHistoryList: PropTypes.arrayOf(PropTypes.object).isRequired
};
