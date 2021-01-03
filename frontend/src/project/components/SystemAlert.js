"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemAlert = void 0;
var react_1 = __importDefault(require("react"));
var SystemAlert = function (props) {
    var message = props.systemAlertMessage;
    var className = message === undefined ? "system-alert-close" : "system-alert";
    return (react_1.default.createElement("div", { className: className },
        react_1.default.createElement("div", { className: "message" }, message),
        react_1.default.createElement("div", { className: "close", onClick: props.close },
            react_1.default.createElement("div", { className: "icon" }))));
};
exports.SystemAlert = SystemAlert;
