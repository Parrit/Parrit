import React from "react";

import PairingHistoryRecord from "./PairingHistoryRecord";
import {PairingArrangementDTO} from "../interfaces/PairingArrangementDTO";

interface Props {
  pairingHistoryList: PairingArrangementDTO[];
}

export const PairingHistoryRecordList: React.FC<Props> = (props) => {
  const { pairingHistoryList } = props;

  return (
    <section className="pairing-history-record-list">
      {pairingHistoryList.map(arrangement =>
            <PairingHistoryRecord
              key={arrangement.pairingTime}
              pairingArrangement={arrangement}
            />
      )}
    </section>
  );
};
