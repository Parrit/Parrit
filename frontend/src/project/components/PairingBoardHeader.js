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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PairingBoardHeader = void 0;
var react_1 = __importStar(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var Workspace_1 = require("./Workspace");
var PairingBoardHeader = function (props) {
    var name = props.name, exempt = props.exempt, editMode = props.editMode, editErrorMessage = props.editErrorMessage;
    var _a = react_1.useState(name), localName = _a[0], setLocalName = _a[1];
    var setNewRoleOpen = react_1.useContext(Workspace_1.WorkspaceContext).setNewRoleOpen;
    var pairingBoardNameSection;
    var onKeyDownHandler = function (event) {
        var EnterKeyCode = 13;
        if (event.keyCode === EnterKeyCode) {
            renamePairingBoard(event);
        }
    };
    var renamePairingBoard = function (event) {
        props.renamePairingBoard(event.target.value);
    };
    if (editMode) {
        var nameInputClasses = classnames_1.default({
            "editing-pairing-board-name": true,
            error: editErrorMessage != undefined,
        });
        pairingBoardNameSection = (react_1.default.createElement("div", { className: "pairing-board-name-wrapper" },
            react_1.default.createElement("input", { className: nameInputClasses, autoFocus: true, defaultValue: localName, onBlur: renamePairingBoard, onKeyDown: onKeyDownHandler }),
            react_1.default.createElement("div", { className: "error-message" }, editErrorMessage)));
    }
    else {
        pairingBoardNameSection = (react_1.default.createElement("div", { className: "pairing-board-name-wrapper", onClick: function () { return props.setEditing(true); } },
            react_1.default.createElement("h3", { className: "pairing-board-name" }, name),
            react_1.default.createElement("div", { className: "rename-pairing-board" }),
            react_1.default.createElement("div", { className: "add-role-to-pairing-board", onClick: function () { return setNewRoleOpen(true); } })));
    }
    return (react_1.default.createElement("div", { className: "pairing-board-header" },
        pairingBoardNameSection,
        !exempt && (react_1.default.createElement("div", { className: "delete-pairing-board", onClick: props.deletePairingBoard }))));
};
exports.PairingBoardHeader = PairingBoardHeader;
exports.default = exports.PairingBoardHeader;
