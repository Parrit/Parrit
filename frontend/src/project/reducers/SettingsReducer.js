"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var ModalReducer_1 = __importDefault(require("./ModalReducer"));
var PairingBoardSettingsReducer_js_1 = __importDefault(require("./PairingBoardSettingsReducer.js"));
var PairingHistoryPanelReducer_js_1 = __importDefault(require("./PairingHistoryPanelReducer.js"));
var SystemAlertReducer_js_1 = __importDefault(require("./SystemAlertReducer.js"));
exports.default = redux_1.combineReducers({
    modal: ModalReducer_1.default,
    pairingBoardSettings: PairingBoardSettingsReducer_js_1.default,
    pairingHistoryPanel: PairingHistoryPanelReducer_js_1.default,
    systemAlert: SystemAlertReducer_js_1.default,
});
