import React from "react";
import { DragSourceMonitor, useDrag } from "react-dnd";

import { DragType, DropType } from "../interfaces/DragAndDrop";

interface Props {
  id: number;
  name: string;
}

export const Role: React.FC<Props> = ({ name }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { name, type: DragType.Role },
    end: (item: { name: string } | undefined, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return <div className="role">{name}</div>;
};
