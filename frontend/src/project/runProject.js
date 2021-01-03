"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var react_modal_1 = __importDefault(require("react-modal"));
var App_1 = require("./components/App");
//TODO: Remove this when the first thing that page does (componentDidMount on App) is to fetch the project data
function runProject(projectJSON) {
    console.log("projectJSON", projectJSON);
    react_dom_1.default.render(react_1.default.createElement(App_1.App, { project: projectJSON }), document.getElementById("reactRoot"));
    react_modal_1.default.setAppElement("#reactRoot");
}
exports.default = runProject;
