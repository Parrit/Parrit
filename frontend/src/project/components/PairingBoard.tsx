import React, { useContext, useState } from "react";
import classNames from "classnames";

import { PairingBoardHeader } from "./PairingBoardHeader";
import { RoleList } from "./RoleList";
import { PersonList } from "./PersonList";
import * as DatabaseHelpers from "../../shared/helpers/DatabaseHelpers";
import { WorkspaceContext } from "./Workspace";

interface Props {
  pairingBoard: IPairingBoard;
}

export const PairingBoard: React.FC<Props> = (props) => {
  const { name, exempt, people } = props.pairingBoard;

  const [editing, setEditing] = useState(false);
  const [editingError, setEditingError] = useState<string>();
  const [roles, setRoles] = useState<IRole[]>(props.pairingBoard.roles);

  const { projectId, deletePairingBoard } = useContext(WorkspaceContext);

  const pairingBoardClasses = classNames({
    "pairing-board": true,
    editing: editing,
    exempt: exempt,
    // "drop-target": isOver,
  });

  const renamePairingBoard = (name: string) => {
    DatabaseHelpers.putPairingBoard(projectId, props.pairingBoard.id, name)
      .then(() => setEditing(false))
      .catch((error) => {
        console.log("rename error", error);
        setEditingError(error);
      });
  };

  const moveRole = () => {};

  const deleteRole = () => {};

  return (
    <div className={pairingBoardClasses}>
      <PairingBoardHeader
        name={name}
        exempt={exempt}
        editMode={editing}
        editErrorMessage={editingError}
        renamePairingBoard={renamePairingBoard}
        deletePairingBoard={() => deletePairingBoard}
        setEditing={setEditing}
      />

      <RoleList roles={roles} moveRole={moveRole} deleteRole={deleteRole} />

      <PersonList people={people} />
    </div>
  );
};
