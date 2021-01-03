"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonTile = exports.Person = void 0;
var react_1 = __importDefault(require("react"));
var Person = function (props) {
    return react_1.default.createElement(exports.PersonTile, { name: props.name });
};
exports.Person = Person;
var PersonTile = function (props) {
    return react_1.default.createElement("div", { className: "person" }, props.name);
};
exports.PersonTile = PersonTile;
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
