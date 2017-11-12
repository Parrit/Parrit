import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment-timezone';

export default class PairingHistoryRecord extends React.Component {
    render() {
        const currentTimeZone = Moment.tz.guess();
        const timeZoneAdjustedPairingTime = Moment.tz(this.props.pairingTime, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]", 'UTC')
            .tz(currentTimeZone)
            .format('MMMM D, YYYY h:mm A');

        return <div className="pairing-history-record">
            <div className="pairing-history-record-clock"/>
            <h3 className="pairing-time">{timeZoneAdjustedPairingTime}</h3>
            
            <div className="pairing-boards-with-people">
                {this.props.pairingBoardsWithPeople.map(function(pairingBoardWithPeople, idx) {
                    return <div className="pairing-board-with-people" key={idx}>
                        <div className="pairing-board-name">{pairingBoardWithPeople.pairingBoardName}:</div>
                        {pairingBoardWithPeople.people.map(function(person, idx) {
                            return <span key={idx} className="person-name">{person.name}
                                <span className="person-names-plus-sign">+</span>
                            </span>
                        })}
                    </div>
                })}
            </div>

            <div className="dotted-line"/>
        </div>
    }
}

PairingHistoryRecord.propTypes = {
    pairingTime: PropTypes.string.isRequired,
    pairingBoardsWithPeople: PropTypes.arrayOf(PropTypes.object).isRequired
};
