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
exports.Dashboard = void 0;
var react_1 = __importStar(require("react"));
var Footer_js_1 = require("../../shared/components/Footer.js");
var Button_js_1 = require("../../shared/components/Button.js");
var DatabaseHelpers_js_1 = require("../../shared/helpers/DatabaseHelpers.js");
var Dashboard = function () {
    var _a, _b;
    var _c = react_1.useState(""), newProjectName = _c[0], setNewProjectName = _c[1];
    var _d = react_1.useState(""), newProjectPassword = _d[0], setNewProjectPassword = _d[1];
    var _e = react_1.useState(""), loginProjectName = _e[0], setLoginProjectName = _e[1];
    var _f = react_1.useState(""), loginProjectPassword = _f[0], setLoginProjectPassword = _f[1];
    var _g = react_1.useState({}), errorResponse = _g[0], setErrorResponse = _g[1];
    var handleLoginName = function (event) {
        setLoginProjectName(event.target.value);
    };
    var handleLoginPassword = function (event) {
        setLoginProjectPassword(event.target.value);
    };
    var handleLogin = function (event) {
        event.preventDefault();
        DatabaseHelpers_js_1.postLoginAndRedirect(loginProjectName, loginProjectPassword);
    };
    var handleNewProjectName = function (event) {
        setNewProjectName(event.target.value);
    };
    var handleNewProjectPassword = function (event) {
        setNewProjectPassword(event.target.value);
    };
    var createProjectWithName = function (event) {
        event.preventDefault();
        DatabaseHelpers_js_1.postProject(newProjectName, newProjectPassword)
            .then(function () {
            DatabaseHelpers_js_1.postLoginAndRedirect(newProjectName, newProjectPassword);
        })
            .catch(function (errorResponse) {
            console.log("fieldErrors", errorResponse);
            setErrorResponse(errorResponse);
        });
    };
    return (react_1.default.createElement("div", { className: "layout-wrapper dashboard-container" },
        react_1.default.createElement("main", { className: "dashboard-content-container" },
            react_1.default.createElement("div", { className: "dashboard-content" },
                react_1.default.createElement("div", { className: "logo" }),
                react_1.default.createElement("div", { className: "description" }, "A historical recommendation engine for daily pair rotation management, with an interactive visual aide of each pairing team."),
                react_1.default.createElement("div", { className: "forms-container" },
                    react_1.default.createElement("form", { className: "form new-form", onSubmit: createProjectWithName },
                        react_1.default.createElement("h2", { className: "form-label" }, "Create Project"),
                        react_1.default.createElement("input", { className: errorResponse["name"] ? "error" : "", type: "text", placeholder: "Project name", onChange: handleNewProjectName }),
                        react_1.default.createElement("input", { className: errorResponse["password"] ? "error" : "", type: "password", placeholder: "Password", onChange: handleNewProjectPassword }),
                        react_1.default.createElement(Button_js_1.Button, { className: "button-blue", name: "Create", type: "submit" }),
                        react_1.default.createElement("div", { className: "error-message" }, (_a = errorResponse["name"]) !== null && _a !== void 0 ? _a : errorResponse["password"])),
                    react_1.default.createElement("div", { className: "dotted-line" }),
                    react_1.default.createElement("form", { className: "form login-form", onSubmit: handleLogin },
                        react_1.default.createElement("h2", { className: "form-label" }, "Login to Project"),
                        react_1.default.createElement("input", { className: errorResponse["name"] ? "error" : "", type: "text", placeholder: "Project name", onChange: handleLoginName }),
                        react_1.default.createElement("input", { className: errorResponse["password"] ? "error" : "", type: "password", placeholder: "Password", onChange: handleLoginPassword }),
                        react_1.default.createElement(Button_js_1.Button, { className: "button-green", name: "Login", type: "submit" }),
                        react_1.default.createElement("div", { className: "error-message" }, (_b = errorResponse["name"]) !== null && _b !== void 0 ? _b : errorResponse["password"]))),
                react_1.default.createElement("div", { className: "feedback-container" },
                    react_1.default.createElement("div", { className: "caption" }, "What do you think of Parrit?"),
                    react_1.default.createElement("a", { className: "text-link", href: "https://goo.gl/forms/ZGqUyZDEDSWqZVBP2", target: "_blank", rel: "noopener" },
                        "Send feedback",
                        react_1.default.createElement("span", { className: "carrot" }))))),
        react_1.default.createElement(Footer_js_1.Footer, null)));
};
exports.Dashboard = Dashboard;
