"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var ProjectReducer_js_1 = __importDefault(require("./ProjectReducer.js"));
var PairingHistoryReducer_js_1 = __importDefault(require("./PairingHistoryReducer.js"));
exports.default = redux_1.combineReducers({
    project: ProjectReducer_js_1.default,
    pairingHistory: PairingHistoryReducer_js_1.default
});
