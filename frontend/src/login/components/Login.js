"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
var react_1 = __importDefault(require("react"));
var Footer_1 = require("../../shared/components/Footer");
var Login = function (props) {
    return (react_1.default.createElement("div", { className: "layout-wrapper login-container" },
        react_1.default.createElement("main", { className: "login" },
            react_1.default.createElement("div", { className: "lock-icon" }),
            react_1.default.createElement("h1", { className: "project-name" }, props.projectName),
            react_1.default.createElement("form", { action: "/api/login/project", method: "POST" },
                react_1.default.createElement("input", { type: "hidden", name: "username", value: props.projectName }),
                react_1.default.createElement("input", { type: "password", autoFocus: true, name: "password", placeholder: "Password" }),
                react_1.default.createElement("input", { type: "hidden", name: props.csrfParameterName, value: props.csrfToken }),
                react_1.default.createElement("input", { type: "submit", value: "Login" }))),
        react_1.default.createElement(Footer_1.Footer, null)));
};
exports.Login = Login;
