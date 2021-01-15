import React, { useContext } from "react";
import { DragSourceMonitor, useDrag } from "react-dnd";

import { DragType, DropType } from "../interfaces/DragAndDrop";
import { IPairingBoard } from "../interfaces/IPairingBoard";
import { IPerson } from "../interfaces/IPerson";
import { ProjectContext } from "../ProjectContext";

interface Props {
  person: IPerson;
}

export const Person: React.FC<Props> = ({ person }) => {
  const { movePerson, deletePerson } = useContext(ProjectContext);
  const [{ isDragging }, drag] = useDrag({
    item: { ...person, type: DragType.Person },
    end: (item: { name: string } | undefined, monitor: DragSourceMonitor) => {
      console.log("dropped a person", person, monitor.getDropResult());
      const dropResult = monitor.getDropResult();
      switch (dropResult.type) {
        case DropType.PairingBoard: {
          const pairingBoard = dropResult as IPairingBoard;
          movePerson(person, pairingBoard);
          break;
        }
        case DropType.TrashBin: {
          console.log("deleting person", person.name);
          deletePerson(person);
          break;
        }
        case DropType.Floating: {
          movePerson(person);
          break;
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <div ref={drag} className="person">
      {person.name}
    </div>
  );
};
