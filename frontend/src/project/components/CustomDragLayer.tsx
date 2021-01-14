import React from "react";
import { DragLayer } from "react-dnd";

import { PersonTile } from "./Person.js";
import { RoleTile } from "./Role.js";
import { DragType } from "../interfaces/DragAndDrop";

function getTransformStyle(currentOffset: Offset) {
  if (!currentOffset) return { display: "none" };

  return {
    transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
  };
}

interface Props {
  item?: { name: string };
  itemType?: string;
  isDragging: boolean;
  currentOffset: Offset;
}

const CustomDragLayerRaw: React.FC<Props> = (props) => {
  const { item, itemType, isDragging, currentOffset } = props;

  if (!isDragging || !item) {
    return null;
  }

  return (
    <div className="drag-layer">
      <div style={getTransformStyle(currentOffset)}>
        {itemType === DragType.Person && <PersonTile name={item.name} />}
        {itemType === DragType.Role && <RoleTile name={item.name} />}
      </div>
    </div>
  );
};

const dragCollect = (monitor: {
  getItem: () => any;
  getItemType: () => any;
  isDragging: () => any;
  getSourceClientOffset: () => any;
}) => {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  };
};

export const CustomDragLayer = DragLayer(dragCollect)(CustomDragLayerRaw);
