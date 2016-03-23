var React = require('react');
var Moment = require('moment-timezone');

var PairingHistoryRecord = React.createClass({
    propTypes: {
        pairingTime: React.PropTypes.string.isRequired,
        pairingBoardsWithPeople: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },

    render: function() {
        var currentTimeZone = Moment.tz.guess();
        var timeZoneAdjustedPairingTime = Moment.tz(this.props.pairingTime, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]", 'UTC')
                                            .tz(currentTimeZone)
                                            .format('MMMM D, YYYY h:mm A');

        return <div className="pairing-history-record">
            <div className="pairing-history-record-clock"></div>
            <h3 className="pairing-time">{timeZoneAdjustedPairingTime}</h3>
            
            {this.props.pairingBoardsWithPeople.map(function(pairingBoardWithPeople, idx) {
                return <div className="pairing-boards-with-people" key={idx}>
                    <span className="pairing-board-name">{pairingBoardWithPeople.pairingBoardName}:</span>
                    {pairingBoardWithPeople.people.map(function(person, idx) {
                        return <span key={idx} className="person-name">{person.name}
                            <span className="person-names-plus-sign">+</span>
                        </span>
                    })}
                </div>
            })}

            <div className="dotted-line"></div>
        </div>
    }
});

module.exports = PairingHistoryRecord;
