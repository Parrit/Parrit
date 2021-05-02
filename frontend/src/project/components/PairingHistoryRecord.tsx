import moment from "moment";
import React, {useContext} from "react";
import {PairingArrangementDTO} from "../interfaces/PairingArrangementDTO";
import {ProjectContext} from "../ProjectContext";
import {TrashIcon} from "../../shared/components/TrashIcon";

interface Props {
  pairingArrangement: PairingArrangementDTO;
}

const PairingHistoryRecord: React.FC<Props> = (props) => {
  const { pairingArrangement } = props;
  const formattedDate = moment(pairingArrangement.pairingTime).format("MMMM Do YYYY, h:mm a");
  const { deletePairingArrangement } = useContext(ProjectContext);

  return (
    <div className="pairing-history-record">
      <div className="pairing-history-record-clock" />
      <h3 className="pairing-time">{formattedDate}</h3>

      <div className="pairing-boards-with-people">
        {pairingArrangement.pairingHistories.map((history) => {
          return (
            <div key={pairingArrangement.id} className="pairing-board-with-people">
              <div className="pairing-board-name">{history.pairingBoardName}:</div>
              {history.people.map((person) => {
                return (
                  <span key={person.id} className="person-name">
                    {person.name}
                    <span className="person-names-plus-sign">+</span>
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
        <div className="delete-pairing-arrangement"
             onClick={() => {deletePairingArrangement(pairingArrangement.id)}}>
            <TrashIcon/>
        </div>
      <div className="dotted-line" />
    </div>
  );
};

export default PairingHistoryRecord;
