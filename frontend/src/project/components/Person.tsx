import React from "react";

interface Props {
  id: number;
  name: string;
  // isDragging: boolean;
  // movePerson: VoidFunction;
  // deletePerson: VoidFunction;
  // connectDragSource: VoidFunction;
  // connectDragPreview: VoidFunction;
}

export const Person: React.FC<Props> = (props) => {
  return <PersonTile name={props.name} />;
};

interface TileProps {
  name: string;
}

export const PersonTile: React.FC<TileProps> = (props) => {
  return <div className="person">{props.name}</div>;
};

// class Person extends React.Component {
//   componentDidMount() {
//     this.props.connectDragPreview(getEmptyImage());
//   }

//   render() {
//     const { name, isDragging, connectDragSource } = this.props;

//     if (isDragging) return null;

//     return connectDragSource(renderPerson(name));
//   }
// }

// const dragSpec = {
//   beginDrag(props) {
//     return {
//       name: props.name,
//     };
//   },

//   endDrag(props, monitor) {
//     if (!monitor.didDrop()) return;

//     const dropTarget = monitor.getDropResult();

//     switch (dropTarget.type) {
//       case dropTypes.Floating: {
//         const newPosition = { floating: true, pairingBoardId: undefined };
//         props.movePerson(props.id, newPosition);
//         return;
//       }
//       case dropTypes.PairingBoard: {
//         const newPosition = { floating: false, pairingBoardId: dropTarget.id };
//         props.movePerson(props.id, newPosition);
//         return;
//       }
//       case dropTypes.TrashBin: {
//         props.deletePerson(props.id);
//         return;
//       }
//     }
//   },
// };

// const dragCollect = (connect, monitor) => {
//   return {
//     isDragging: monitor.isDragging(),
//     connectDragSource: connect.dragSource(),
//     connectDragPreview: connect.dragPreview(),
//   };
// };

// export default DragSource(dragTypes.Person, dragSpec, dragCollect)(Person);
