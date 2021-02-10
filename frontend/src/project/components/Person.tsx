import React from "react";
import { useDrag } from "react-dnd";

import { DragType } from "../interfaces/DragAndDrop";
import { IPerson } from "../interfaces/IPerson";

interface Props {
  person: IPerson;
}

export const Person: React.FC<Props> = ({ person }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { ...person, type: DragType.Person },
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
