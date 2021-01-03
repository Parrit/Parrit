"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
var react_1 = __importDefault(require("react"));
var Button = function (props) {
    var type = props.type || "button";
    return (react_1.default.createElement("button", { type: type, title: props.tooltip, className: props.className, onClick: props.clickFunction },
        react_1.default.createElement("span", { className: "name" }, props.name),
        react_1.default.createElement("span", { className: "short-name" }, props.shortName || props.name)));
};
exports.Button = Button;
