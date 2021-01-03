import React, { useContext, useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import classNames from "classnames";

import { PairingHistoryRecordList } from "./PairingHistoryRecordList";
import * as DatabaseHelpers from "../../shared/helpers/DatabaseHelpers";
import { App, AppContext } from "./App";

// interface Props {
//   pairingHistoryList: IPairingHistory[];
//   isPairingHistoryPanelOpen: boolean;
//   fetchPairingHistory: VoidFunction;
//   setPairingHistoryPanelOpen: (isOpen: boolean) => void;
// }

export const PairingHistory: React.FC = (props) => {
  const [pairingHistory, setPairingHistory] = useState<IPairingHistoryRecord[]>(
    []
  );
  const { projectId } = useContext(AppContext);
  useEffect(() => {
    DatabaseHelpers.getPairingHistory(projectId).then((history) => {
      setPairingHistory(history);
    });
  }, []);

  const { pairingHistoryOpen, setPairingHistoryOpen } = useContext(AppContext);

  const closePairingHistoryPanel = () => {
    setPairingHistoryOpen(false);
  };

  const classes = classNames({
    "pairing-history-panel": true,
    "panel-open": pairingHistoryOpen,
    "panel-closed": !pairingHistoryOpen,
  });

  if (!pairingHistory) {
    return null;
  }

  return (
    <div className={classes}>
      <Scrollbars>
        <div className="inner-pairing-history-wrapper">
          <div className="header">
            <h2>Pair Rotation History</h2>
            <div
              className="cancel"
              onClick={closePairingHistoryPanel.bind(this)}
            />
          </div>

          <div className="body">
            {pairingHistory.length === 0 && (
              <div className="no-history">
                <div className="clock" />
                <div className="no-history-content">
                  ‘Record Pairs’ to track daily rotation history. The more you
                  record, the better the recommendation engine becomes.
                </div>
              </div>
            )}

            {pairingHistory.length > 0 && (
              <PairingHistoryRecordList pairingHistoryList={pairingHistory} />
            )}
          </div>
        </div>
      </Scrollbars>
    </div>
  );
};