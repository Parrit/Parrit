"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var DataReducer_js_1 = __importDefault(require("./DataReducer.js"));
var SettingsReducer_js_1 = __importDefault(require("./SettingsReducer.js"));
exports.default = redux_1.combineReducers({
    data: DataReducer_js_1.default,
    settings: SettingsReducer_js_1.default,
});
