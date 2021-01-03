import React, { useContext, useState } from "react";
import classNames from "classnames";
import { WorkspaceContext } from "./Workspace";

interface Props {
  name: string;
  exempt: boolean;
  editMode: boolean;
  editErrorMessage?: string;
  renamePairingBoard: (name: string) => void;
  deletePairingBoard: VoidFunction;
  setEditing: (editing: boolean) => void;
}

export const PairingBoardHeader: React.FC<Props> = (props) => {
  const { name, exempt, editMode, editErrorMessage } = props;
  const [localName, setLocalName] = useState(name);
  const { setNewRoleOpen } = useContext(WorkspaceContext);

  let pairingBoardNameSection;

  const onKeyDownHandler = (event: any) => {
    const EnterKeyCode = 13;
    if (event.keyCode === EnterKeyCode) {
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
          className={nameInputClasses}
          autoFocus
          defaultValue={localName}
          onBlur={renamePairingBoard}
          onKeyDown={onKeyDownHandler}
        />
        <div className="error-message">{editErrorMessage}</div>
      </div>
    );
  } else {
    pairingBoardNameSection = (
      <div
        className="pairing-board-name-wrapper"
        onClick={() => props.setEditing(true)}
      >
        <h3 className="pairing-board-name">{name}</h3>
        <div className="rename-pairing-board" />
        <div
          className="add-role-to-pairing-board"
          onClick={() => setNewRoleOpen(true)}
        />
      </div>
    );
  }

  return (
    <div className="pairing-board-header">
      {pairingBoardNameSection}

      {!exempt && (
        <div
          className="delete-pairing-board"
          onClick={props.deletePairingBoard}
        />
      )}
    </div>
  );
};

export default PairingBoardHeader;
