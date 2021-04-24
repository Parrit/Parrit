import React, {useContext} from "react";
import classNames from "classnames";
import {WorkspaceContext} from "./Workspace";
import {IPairingBoard} from "../interfaces/IPairingBoard";

interface Props {
  name: string;
  exempt: boolean;
  editMode: boolean;
  editErrorMessage?: string;
  renamePairingBoard: (name: string) => void;
  deletePairingBoard: VoidFunction;
  setEditing: (editing: boolean) => void;
  pairingBoard: IPairingBoard;
}

export const PairingBoardHeader: React.FC<Props> = (props) => {
  const { name, exempt, editMode, editErrorMessage } = props;
  const { setNewRoleOpen } = useContext(WorkspaceContext);

  let pairingBoardNameSection;

  const onKeyDownHandler = (event: any) => {
    if (event.key === 'Enter') {
      renamePairingBoard(event);
    }
  };

  const renamePairingBoard = (event: any) => {
    props.renamePairingBoard(event.target.value);
  };

  if (editMode) {
    const nameInputClasses = classNames({
      "editing-pairing-board-name": true,
      error: editErrorMessage != undefined,
    });

    pairingBoardNameSection = (
      <div className="pairing-board-name-wrapper">
        <input
          aria-label="pairing board name"
          className={nameInputClasses}
          autoFocus
          defaultValue={name}
          onBlur={renamePairingBoard}
          onKeyDown={onKeyDownHandler}
        />
        <div className="error-message" aria-label="pairing board name error">{editErrorMessage}</div>
      </div>
    );
  } else {
    pairingBoardNameSection = (
      <div
        className="pairing-board-name-wrapper"
        onClick={() => props.setEditing(true)}
      >
        <h3 aria-label="pairing board name" className="pairing-board-name">{name}</h3>
        <div aria-label="rename pairing board" className="rename-pairing-board" />
        <div
          aria-label="add role to pairing board"
          className="add-role-to-pairing-board"
          onClick={() => setNewRoleOpen(true, props.pairingBoard)}
        />
      </div>
    );
  }

  return (
    <div className="pairing-board-header">
      {pairingBoardNameSection}

      {!exempt && (
        <div
          aria-label="delete pairing board"
          className="delete-pairing-board"
          onClick={props.deletePairingBoard}
        />
      )}
    </div>
  );
};

export default PairingBoardHeader;
