import React, { useEffect } from "react";
import { DragSource } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import { DragType, DropType } from "../interfaces/DragAndDrop";

const dragSpec = {
  beginDrag(props: any) {
    return {
      name: props.name,
    };
  },

  endDrag(
    props: {
      moveRole: (arg0: any, arg1: { pairingBoardId: any }) => void;
      id: any;
      deleteRole: (arg0: any) => void;
    },
    monitor: { didDrop: () => any; getDropResult: () => any }
  ) {
    if (!monitor.didDrop()) return;

    const dropTarget = monitor.getDropResult();

    switch (dropTarget.type) {
      case DropType.PairingBoard: {
        const newPosition = { pairingBoardId: dropTarget.id };
        props.moveRole(props.id, newPosition);
        return;
      }
      case DropType.TrashBin: {
        props.deleteRole(props.id);
        return;
      }
    }
  },
};

interface TileProps {
  name: string;
}

export const RoleTile: React.FC<TileProps> = (props) => {
  return <div className="role">{props.name}</div>;
};

interface Props {
  id: number;
  name: string;
  isDragging: boolean;
  moveRole: (role: IRole, position: IPosition) => void;
  deleteRole: (role: IRole) => void;
  connectDragSource: (element: JSX.Element) => JSX.Element;
  connectDragPreview: (image: HTMLImageElement) => void;
}

const RoleRaw: React.FC<Props> = (props) => {
  useEffect(() => {
    props.connectDragPreview(getEmptyImage());
  });

  const { name, isDragging, connectDragSource } = props;

  if (isDragging) {
    return null;
  }

  return connectDragSource(<RoleTile name={name} />);
};

const dragCollect = (
  connect: { dragSource: () => any; dragPreview: () => any },
  monitor: { isDragging: () => any }
) => {
  return {
    isDragging: monitor.isDragging(),
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
  };
};

export const Role = DragSource(DragType.Role, dragSpec, dragCollect)(RoleRaw);
