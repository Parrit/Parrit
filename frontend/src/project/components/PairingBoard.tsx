import React, {useContext, useState} from "react";
import classNames from "classnames";

import {PairingBoardHeader} from "./PairingBoardHeader";
import {RoleList} from "./RoleList";
import {PersonList} from "./PersonList";
import {ProjectContext} from "../ProjectContext";
import {useDrop} from "react-dnd";
import {DragType} from "../interfaces/DragAndDrop";
import {IPairingBoard} from "../interfaces/IPairingBoard";
import {IPerson} from "../interfaces/IPerson";

interface Props {
  pairingBoard: IPairingBoard;
}

export const PairingBoard: React.FC<Props> = (props) => {
  const { name, exempt, people, roles } = props.pairingBoard;
  const { movePerson, moveRole } = useContext(ProjectContext);
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: [DragType.Person, DragType.Role],
    drop: (item, monitor) => {
      if (monitor.didDrop()) {
        return; // don't do anything if a drop handler has already handled this
      }
      switch (item.type) {
        case DragType.Person:
          const person = (item as unknown) as IPerson;
          movePerson(person, props.pairingBoard);
          return;
        case DragType.Role:
          const role = (item as unknown) as IRole;
          moveRole(role, props.pairingBoard);
          return;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const [editing, setEditing] = useState(false);
  const [editingError, setEditingError] = useState<string>();

  const { destroyPairingBoard, renamePairingBoard } = useContext(ProjectContext);

  const pairingBoardClasses = classNames({
    "pairing-board": true,
    editing: editing,
    exempt: exempt,
    "drop-target": isOver,
  });

  const handleRename = async (name: string) => {
    renamePairingBoard(name, props.pairingBoard.id)
        .then(() => setEditing(false))
        .catch((error) => {
          console.log("rename error", error);
          setEditingError(error);
        });
  }

  return (
    <div ref={drop} className={pairingBoardClasses}>
      <PairingBoardHeader
        name={name}
        exempt={exempt}
        editMode={editing}
        editErrorMessage={editingError}
        renamePairingBoard={handleRename}
        deletePairingBoard={() => destroyPairingBoard(props.pairingBoard)}
        setEditing={setEditing}
        pairingBoard={props.pairingBoard}
      />

      <RoleList roles={roles} />

      <PersonList people={people} />
    </div>
  );
};
