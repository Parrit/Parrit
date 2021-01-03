import React from "react";
import Moment from "moment";

interface Props {
  pairingTime: Date;
  pairingBoardsWithPeople: IPairingBoard[];
}

export const PairingHistoryRecord: React.FC<Props> = (props) => {
  const localPairingTime = Moment.now();

  return (
    <div className="pairing-history-record">
      <div className="pairing-history-record-clock" />
      <h3 className="pairing-time">{localPairingTime}</h3>

      <div className="pairing-boards-with-people">
        {props.pairingBoardsWithPeople.map((pairingBoardWithPeople, idx) => {
          return (
            <div key={idx} className="pairing-board-with-people">
              <div className="pairing-board-name">
                {pairingBoardWithPeople.name}:
              </div>
              {pairingBoardWithPeople.people.map((person, idx) => {
                return (
                  <span key={idx} className="person-name">
                    {person.name}
                    <span className="person-names-plus-sign">+</span>
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="dotted-line" />
    </div>
  );
};

export default PairingHistoryRecord;
