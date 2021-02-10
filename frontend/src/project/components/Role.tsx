import React from "react";
import { useDrag } from "react-dnd";

import { DragType } from "../interfaces/DragAndDrop";

interface Props {
  role: IRole;
}

export const Role: React.FC<Props> = ({ role }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { ...role, type: DragType.Role },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className="role">
      {role.name}
    </div>
  );
};
