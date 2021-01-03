import React from "react";
import classNames from "classnames";

// interface Props {
//   isOver: boolean;
//   connectDropTarget: (element: ReactElement) => ReactElement;
// }

export const TrashBin: React.FC = (props) => {
  //   const { isOver, connectDropTarget } = props;

  const classes = classNames({
    "trash-bin": true,
    // "drop-target": isOver,
  });

  return <div className={classes} />;

  //   return connectDropTarget();
};

// const dragSpec = {
//   drop(props, monitor) {
//     if (monitor.didDrop()) return;

//     return {
//       type: dropTypes.TrashBin,
//     };
//   },
// };

interface Connect {
  dropTarget: VoidFunction;
}

interface Monitor {
  isOver: VoidFunction;
}

const dragCollect = (connect: Connect, monitor: Monitor) => {
  return {
    isOver: monitor.isOver(),
    connectDropTarget: connect.dropTarget(),
  };
};

// export default DropTarget(
//   [dragTypes.Person, dragTypes.Role],
//   dragSpec,
//   dragCollect
// )(TrashBin);
