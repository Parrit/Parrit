import React, { useContext } from "react";
import { DragSourceMonitor, useDrag } from "react-dnd";

import { DragType, DropType } from "../interfaces/DragAndDrop";
import { IPairingBoard } from "../interfaces/IPairingBoard";
import { ProjectContext } from "../ProjectContext";

interface Props {
  role: IRole;
}

export const Role: React.FC<Props> = ({ role }) => {
  const { moveRole, destroyRole } = useContext(ProjectContext);
  const [{ isDragging }, drag] = useDrag({
    item: { ...role, type: DragType.Role },
    end: (item: { name: string } | undefined, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult();
      switch (dropResult.type) {
        case DropType.PairingBoard: {
          const pairingBoard = dropResult as IPairingBoard;
          moveRole(role, pairingBoard);
          break;
        }
        case DropType.TrashBin: {
          destroyRole(role);
          break;
        }
      }
    },
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
