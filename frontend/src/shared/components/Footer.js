"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Footer = void 0;
var react_1 = __importDefault(require("react"));
var Footer = function (props) {
    return (react_1.default.createElement("footer", null,
        react_1.default.createElement("div", { className: "fake-copyright" }, "\u00A9 Parrit 2018"),
        react_1.default.createElement("div", { className: "footer-links" },
            react_1.default.createElement("a", { target: "_blank", rel: "noopener", href: "mailto:parrithelp@gmail.com" }, "Contact Us"),
            react_1.default.createElement("a", { target: "_blank", rel: "noopener", href: "http://www.github.com/Parrit/Parrit" }, "GitHub"))));
};
exports.Footer = Footer;
