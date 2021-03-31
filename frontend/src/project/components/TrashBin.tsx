import React, { useContext } from "react";
import { DragType, DropType } from "../interfaces/DragAndDrop";
import { useDrop } from "react-dnd";
import classNames from "classnames";
import { ProjectContext } from "../ProjectContext";
import { IPerson } from "../interfaces/IPerson";

export const TrashBin: React.FC = () => {
  const { destroyPerson, destroyRole } = useContext(ProjectContext);
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: [DragType.Person, DragType.Role],
    drop: (item, monitor) => {
      if (monitor.didDrop()) {
        return; // don't do anything if a drop handler has already handled this
      }
      switch (item.type) {
        case DragType.Person:
          const person = (item as unknown) as IPerson;
          destroyPerson(person);
          return;
        case DragType.Role:
          const role = (item as unknown) as IRole;
          destroyRole(role);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const classes = classNames({
    "trash-bin": true,
    "drop-target": isOver,
  });

  return <div ref={drop} className={classes} />;
};
