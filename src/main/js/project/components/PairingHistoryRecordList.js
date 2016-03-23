var React = require('react');

var PairingHistoryRecord = require('project/components/PairingHistoryRecord.js');

var PairingHistoryRecordList = React.createClass({
    propTypes: {
        pairingHistoryList: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },

    render: function() {

        function createPairingHistoryRecord(pairingTime) {
            return {
                pairingTime: pairingTime,
                pairingBoardsWithPeople: []
            }
        }

        var pairingHistoryRecords = [];
        var currentPairingTime = this.props.pairingHistoryList[0].pairingTime;
        var currentPairingHistoryRecord = createPairingHistoryRecord(currentPairingTime);

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

        return <div className="pairing-history-record-list">
            {pairingHistoryRecords.map(function(pairingHistoryRecord, idx) {
                return <PairingHistoryRecord key={idx} pairingTime={pairingHistoryRecord.pairingTime}
                                             pairingBoardsWithPeople={pairingHistoryRecord.pairingBoardsWithPeople} />;
            })}
        </div>
    }
});

module.exports = PairingHistoryRecordList;
