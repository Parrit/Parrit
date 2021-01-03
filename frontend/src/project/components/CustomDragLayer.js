"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomDragLayer = void 0;
var react_1 = __importStar(require("react"));
var App_js_1 = require("./App.js");
var Person_1 = require("./Person");
var Role_js_1 = require("./Role.js");
function getTransformStyle(currentOffset) {
    if (!currentOffset)
        return { display: "none" };
    return {
        transform: "translate(" + currentOffset.x + "px, " + currentOffset.y + "px)",
    };
}
var CustomDragLayer = function (props) {
    var _a = react_1.useContext(App_js_1.AppContext), dragItem = _a.dragItem, currentOffset = _a.currentOffset;
    var itemType = dragItem === null || dragItem === void 0 ? void 0 : dragItem.type;
    if (!dragItem) {
        return null;
    }
    return (react_1.default.createElement("div", { className: "drag-layer" },
        react_1.default.createElement("div", { style: getTransformStyle(currentOffset) },
            itemType === "Person" && react_1.default.createElement(Person_1.Person, { id: -1, name: dragItem.name }),
            itemType === "Role" && react_1.default.createElement(Role_js_1.RoleTile, { name: dragItem.name }))));
};
exports.CustomDragLayer = CustomDragLayer;
// const dragCollect = (monitor) => {
//   return {
//     item: monitor.getItem(),
//     itemType: monitor.getItemType(),
//     isDragging: monitor.isDragging(),
//     currentOffset: monitor.getSourceClientOffset(),
//   };
// };
// export default DragLayer(dragCollect)(CustomDragLayer);
