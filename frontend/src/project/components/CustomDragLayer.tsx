import React, { useContext } from "react";
import { DragLayer } from "react-dnd";

import { AppContext } from "./App.js";
import { Person } from "./Person";
import { Role, RoleTile } from "./Role.js";

function getTransformStyle(currentOffset: Offset) {
  if (!currentOffset) return { display: "none" };

  return {
    transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
  };
}

export const CustomDragLayer: React.FC = (props) => {
  const { dragItem, currentOffset } = useContext(AppContext);
  const itemType = dragItem?.type;

  if (!dragItem) {
    return null;
  }

  return (
    <div className="drag-layer">
      <div style={getTransformStyle(currentOffset)}>
        {itemType === "Person" && <Person id={-1} name={dragItem.name} />}
        {itemType === "Role" && <RoleTile name={dragItem.name} />}
      </div>
    </div>
  );
};

// const dragCollect = (monitor) => {
//   return {
//     item: monitor.getItem(),
//     itemType: monitor.getItemType(),
//     isDragging: monitor.isDragging(),
//     currentOffset: monitor.getSourceClientOffset(),
//   };
// };

// export default DragLayer(dragCollect)(CustomDragLayer);
