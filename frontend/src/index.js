"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./polyfills.js");
require("./styles/main.scss");
var runProject_1 = __importDefault(require("./project/runProject"));
var runDashboard_1 = __importDefault(require("./dashboard/runDashboard"));
var runLogin_1 = __importDefault(require("./login/runLogin"));
var runError_1 = __importDefault(require("./error/runError"));
window.runProject = runProject_1.default;
window.runDashboard = runDashboard_1.default;
window.runLogin = runLogin_1.default;
window.runError = runError_1.default;
