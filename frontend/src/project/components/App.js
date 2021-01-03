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
exports.App = exports.AppContext = void 0;
var react_1 = __importStar(require("react"));
var SystemAlert_1 = require("./SystemAlert");
var Header_1 = require("./Header");
var Project_1 = require("./Project");
var PairingHistory_js_1 = require("./PairingHistory.js");
var Footer_1 = require("../../shared/components/Footer");
var CustomDragLayer_1 = require("./CustomDragLayer");
exports.AppContext = react_1.createContext({});
var App = function (props) {
    var _a = react_1.useState(false), systemAlertOpen = _a[0], setSystemAlertOpen = _a[1];
    var _b = react_1.useState(false), pairingHistoryOpen = _b[0], setPairingHistoryOpen = _b[1];
    var _c = react_1.useState(), dragItem = _c[0], setDragItem = _c[1];
    var _d = react_1.useState(false), isDragging = _d[0], setIsDragging = _d[1];
    var _e = react_1.useState({ x: 0, y: 0 }), currentOffset = _e[0], setCurrentOffset = _e[1];
    var projectId = props.project.id;
    var className = "layout-wrapper project-page-container" + pairingHistoryOpen
        ? "shift-left"
        : "";
    var value = {
        systemAlertOpen: systemAlertOpen,
        setSystemAlertOpen: setSystemAlertOpen,
        pairingHistoryOpen: pairingHistoryOpen,
        setPairingHistoryOpen: setPairingHistoryOpen,
        projectId: projectId,
        dragItem: dragItem,
        isDragging: isDragging,
        currentOffset: currentOffset,
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(exports.AppContext.Provider, { value: value },
            react_1.default.createElement("div", { className: className },
                react_1.default.createElement(SystemAlert_1.SystemAlert, { close: function () { return setSystemAlertOpen(false); } }),
                react_1.default.createElement(Header_1.Header, { isPairingHistoryPanelOpen: pairingHistoryOpen, setPairingHistoryPanelOpen: setPairingHistoryOpen }),
                react_1.default.createElement(Project_1.Project, { project: props.project }),
                react_1.default.createElement(Footer_1.Footer, null),
                react_1.default.createElement(PairingHistory_js_1.PairingHistory, null)),
            react_1.default.createElement(CustomDragLayer_1.CustomDragLayer, null))));
};
exports.App = App;
