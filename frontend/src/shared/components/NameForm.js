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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameForm = void 0;
var react_1 = __importStar(require("react"));
var NameForm = function (props) {
    var _a = react_1.useState(""), name = _a[0], setName = _a[1];
    var handleChange = function (event) {
        setName(event.target.value);
    };
    var submit = function (e) {
        e.preventDefault();
        props.confirmFunction(name);
    };
    var inputClasses = "form-control";
    inputClasses += props.errorMessage ? " error" : "";
    return (react_1.default.createElement("form", { onSubmit: submit.bind(_this) },
        react_1.default.createElement("div", { className: "form-header" },
            react_1.default.createElement("h2", { className: "form-title" }, props.formTitle),
            react_1.default.createElement("div", { className: "form-cancel", onClick: props.cancelFunction })),
        react_1.default.createElement("div", { className: "error-message" }, props.errorMessage),
        react_1.default.createElement("input", { className: inputClasses, autoFocus: true, type: "text", placeholder: "Name", value: name, onChange: handleChange.bind(_this) }),
        react_1.default.createElement("div", { className: "buttons" },
            react_1.default.createElement("button", { type: "submit", className: "button-blue" }, "OK"),
            react_1.default.createElement("button", { type: "button", onClick: props.cancelFunction, className: "button-red" }, "Cancel"))));
};
exports.NameForm = NameForm;
exports.default = exports.NameForm;
