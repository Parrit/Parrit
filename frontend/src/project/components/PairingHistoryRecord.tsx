import moment from "moment";
import React, { useMemo } from "react";
import { IPerson } from "../interfaces/IPerson";

interface Props {
  dateString: string;
  boardNames: string[];
  boardsWithPeople: { [key: string]: IPerson[] };
}

export const PairingHistoryRecord: React.FC<Props> = (props) => {
  const { boardsWithPeople, dateString } = props;

  const displayString = useMemo(() => {
    const m = moment(dateString);
    return m.format("MMMM Do YYYY, h:mm a");
  }, [dateString, moment]);

  return (
    <div className="pairing-history-record">
      <div className="pairing-history-record-clock" />
      <h3 className="pairing-time">{displayString}</h3>

      <div className="pairing-boards-with-people">
        {props.boardNames.map((boardName, idx) => {
          return (
            <div key={idx} className="pairing-board-with-people">
              <div className="pairing-board-name">{boardName}:</div>
              {boardsWithPeople[boardName].map((person, idx) => {
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
