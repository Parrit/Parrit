"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrashBin = void 0;
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
// interface Props {
//   isOver: boolean;
//   connectDropTarget: (element: ReactElement) => ReactElement;
// }
var TrashBin = function (props) {
    //   const { isOver, connectDropTarget } = props;
    var classes = classnames_1.default({
        "trash-bin": true,
    });
    return react_1.default.createElement("div", { className: classes });
    //   return connectDropTarget();
};
exports.TrashBin = TrashBin;
var dragCollect = function (connect, monitor) {
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
