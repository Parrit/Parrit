"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
var react_1 = __importDefault(require("react"));
var Footer_js_1 = require("../../shared/components/Footer.js");
var Error = function () {
    return (react_1.default.createElement("div", { className: "layout-wrapper error-container" },
        react_1.default.createElement("main", { className: "error-image-wrapper" },
            react_1.default.createElement("div", { className: "parrit-talk-bubble" },
                react_1.default.createElement("h1", { className: "error-message" }, "What the heck?!"),
                react_1.default.createElement("a", { className: "text-link home-page-link", href: "/" },
                    "Get me out of here",
                    react_1.default.createElement("span", { className: "carrot" })))),
        react_1.default.createElement(Footer_js_1.Footer, null)));
};
exports.Error = Error;
exports.default = exports.Error;
