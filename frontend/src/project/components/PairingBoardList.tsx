import React from "react";
import { IPairingBoard } from "../interfaces/IPairingBoard";

import { PairingBoard } from "./PairingBoard";

interface Props {
  pairingBoards: IPairingBoard[];
}

export const PairingBoardList: React.FC<Props> = (props) => {
  return (
    <div className="pairing-boards">
      {props.pairingBoards.map((pairingBoard) => {
        return (
          <PairingBoard
            key={`pairing-board-${pairingBoard.id}`}
            pairingBoard={pairingBoard}
          />
        );
      })}
    </div>
  );
};
