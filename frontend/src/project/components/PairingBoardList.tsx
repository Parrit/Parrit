import React from "react";

import { PairingBoard } from "./PairingBoard";

// interface PairingBoardSettings {
//   [index: number]: PairingBoardSetting;
// }

// interface PairingBoardSetting {
//   editMode: boolean;
//   editErrorMessage: string;
// }

interface Props {
  pairingBoards: IPairingBoard[];
  //   pairingBoardSettings: PairingBoardSettings;
}

export const PairingBoardList: React.FC<Props> = (props) => {
  return (
    <div className="pairing-boards">
      {props.pairingBoards.map((pairingBoard, idx) => {
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

// function mapStateToProps({ data, settings }) {
//   return {
//     pairingBoards: data.project.pairingBoards,
//     pairingBoardSettings: settings.pairingBoardSettings,
//   };
// }

// export default connect(mapStateToProps, {})(PairingBoardList);
