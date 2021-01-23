import React, { useContext, useState } from "react";
import classNames from "classnames";

import { PairingBoardHeader } from "./PairingBoardHeader";
import { RoleList } from "./RoleList";
import { PersonList } from "./PersonList";
import { ProjectContext } from "../ProjectContext";
import { useDrop } from "react-dnd";
import { DragType, DropType } from "../interfaces/DragAndDrop";
import { IPairingBoard } from "../interfaces/IPairingBoard";
import { ApiContext } from "../../shared/helpers/ApiContext";

interface Props {
  pairingBoard: IPairingBoard;
}

export const PairingBoard: React.FC<Props> = (props) => {
  const { name, exempt, people, roles } = props.pairingBoard;
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: [DragType.Person, DragType.Role],
    drop: () => {
      return { ...props.pairingBoard, type: DropType.PairingBoard };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const [editing, setEditing] = useState(false);
  const [editingError, setEditingError] = useState<string>();

  const { projectId, destroyPairingBoard } = useContext(ProjectContext);
  const { putPairingBoard } = useContext(ApiContext);

  const pairingBoardClasses = classNames({
    "pairing-board": true,
    editing: editing,
    exempt: exempt,
    "drop-target": isOver,
  });

  const renamePairingBoard = (name: string) => {
    putPairingBoard(projectId, props.pairingBoard.id, name)
      .then(() => setEditing(false))
      .catch((error) => {
        console.log("rename error", error);
        setEditingError(error);
      });
  };

  return (
    <div ref={drop} className={pairingBoardClasses}>
      <PairingBoardHeader
        name={name}
        exempt={exempt}
        editMode={editing}
        editErrorMessage={editingError}
        renamePairingBoard={renamePairingBoard}
        deletePairingBoard={() => destroyPairingBoard(props.pairingBoard)}
        setEditing={setEditing}
        pairingBoard={props.pairingBoard}
      />

      <RoleList roles={roles} />

      <PersonList people={people} />
    </div>
  );
};
