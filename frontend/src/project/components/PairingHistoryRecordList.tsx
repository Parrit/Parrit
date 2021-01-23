import React, { useMemo } from "react";
import { IPerson } from "../interfaces/IPerson";
import { PairingHistoryDTO } from "../interfaces/PairingHistoryDTO";

import { PairingHistoryRecord } from "./PairingHistoryRecord";

interface Props {
  pairingHistoryList: PairingHistoryDTO[];
}

// a local representation for display purposes
interface PairingRecord {
  boardNames: string[];
  boardsWithPeople: { [key: string]: IPerson[] };
}

export const PairingHistoryRecordList: React.FC<Props> = (props) => {
  const { pairingHistoryList } = props;
  const records = useMemo(() => {
    const r = new Map<string, PairingRecord>();
    pairingHistoryList.forEach((item) => {
      const current = r.get(item.pairingTime) || {
        boardNames: [],
        boardsWithPeople: {},
      };
      const updatedBoardNames = [...current.boardNames, item.pairingBoardName];
      const updatedBoardsPeople = { ...current.boardsWithPeople };
      updatedBoardsPeople[item.pairingBoardName] = item.people;
      r.set(item.pairingTime, {
        boardNames: updatedBoardNames,
        boardsWithPeople: updatedBoardsPeople,
      });
    });
    return r;
  }, [pairingHistoryList]);

  return (
    <div className="pairing-history-record-list">
      {Array.from(records.entries()).map(([time, record], idx) => {
        return (
          <PairingHistoryRecord
            key={idx}
            dateString={time}
            boardNames={record.boardNames}
            boardsWithPeople={record.boardsWithPeople}
          />
        );
      })}
    </div>
  );
};
