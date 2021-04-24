import React from "react";
import { useDrag } from "react-dnd";

import { DragType } from "../interfaces/DragAndDrop";

interface Props {
  role: IRole;
}

export const Role: React.FC<Props> = ({ role }) => {
  const [_, drag] = useDrag({
    item: { ...role, type: DragType.Role }
  });

  return (
    <div ref={drag} className="role">
      {role.name}
    </div>
  );
};
