import React from "react";
import { IPairingHistoryRecord } from "../interfaces/IPairingHistory";

import { PairingHistoryRecord } from "./PairingHistoryRecord";

interface Props {
  pairingHistoryList: IPairingHistoryRecord[];
}

export const PairingHistoryRecordList: React.FC<Props> = (props) => {
  const createPairingHistoryRecord = (
    pairingTime: Date
  ): IPairingHistoryRecord => {
    return {
      pairingTime: pairingTime,
      pairingBoardsWithPeople: [],
      pairingBoardName: "",
      people: [],
    };
  };

  const pairingHistoryRecords = [];
  let currentPairingTime = props.pairingHistoryList[0].pairingTime;
  let currentPairingHistoryRecord = createPairingHistoryRecord(
    currentPairingTime
  );

  props.pairingHistoryList.forEach((pairingHistory) => {
    if (pairingHistory.pairingTime !== currentPairingTime) {
      pairingHistoryRecords.push(currentPairingHistoryRecord);
      currentPairingTime = pairingHistory.pairingTime;
      currentPairingHistoryRecord = createPairingHistoryRecord(
        pairingHistory.pairingTime
      );
    }

    // currentPairingHistoryRecord.pairingBoardsWithPeople.push({
    //   name: pairingHistory.pairingBoardName,
    //   people: pairingHistory.people,
    // });
  });
  pairingHistoryRecords.push(currentPairingHistoryRecord);

  return (
    <div className="pairing-history-record-list">
      {pairingHistoryRecords.map((pairingHistoryRecord, idx) => {
        return (
          <PairingHistoryRecord
            key={idx}
            pairingTime={pairingHistoryRecord.pairingTime}
            pairingBoardsWithPeople={
              pairingHistoryRecord.pairingBoardsWithPeople
            }
          />
        );
      })}
    </div>
  );
};
