"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
var react_1 = __importDefault(require("react"));
var Workspace_1 = require("./Workspace");
var Button_1 = require("../../shared/components/Button");
var Project = function (props) {
    var resetPairs = function () { };
    var getRecommendedPairs = function () { };
    var savePairing = function () { };
    return (react_1.default.createElement("main", { className: "project" },
        react_1.default.createElement("div", { className: "sub-header" },
            react_1.default.createElement("h1", { className: "project-name" }, props.project.name),
            react_1.default.createElement("div", { className: "project-actions" },
                react_1.default.createElement(Button_1.Button, { className: "button-blue", tooltip: "Move All Pairs to Floating", name: "Reset Pairs", shortName: "Reset", clickFunction: resetPairs }),
                react_1.default.createElement(Button_1.Button, { className: "button-blue", tooltip: "Automatically suggest pairings based on last paired date", name: "Recommend Pairs", shortName: "Recommend", clickFunction: getRecommendedPairs }),
                react_1.default.createElement(Button_1.Button, { className: "button-green", tooltip: "Make note of parings for future recommendations", name: "Record Pairs", shortName: "Record", clickFunction: savePairing }))),
        react_1.default.createElement("div", { className: "sub-header-dotted-line" }),
        react_1.default.createElement(Workspace_1.Workspace, { projectId: props.project.id, people: [], pairingBoards: [] })));
};
exports.Project = Project;
