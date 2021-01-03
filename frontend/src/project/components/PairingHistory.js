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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PairingHistory = void 0;
var react_1 = __importStar(require("react"));
var react_custom_scrollbars_1 = require("react-custom-scrollbars");
var classnames_1 = __importDefault(require("classnames"));
var PairingHistoryRecordList_1 = require("./PairingHistoryRecordList");
var DatabaseHelpers = __importStar(require("../../shared/helpers/DatabaseHelpers"));
var App_1 = require("./App");
// interface Props {
//   pairingHistoryList: IPairingHistory[];
//   isPairingHistoryPanelOpen: boolean;
//   fetchPairingHistory: VoidFunction;
//   setPairingHistoryPanelOpen: (isOpen: boolean) => void;
// }
var PairingHistory = function (props) {
    var _a = react_1.useState([]), pairingHistory = _a[0], setPairingHistory = _a[1];
    var projectId = react_1.useContext(App_1.AppContext).projectId;
    react_1.useEffect(function () {
        DatabaseHelpers.getPairingHistory(projectId).then(function (history) {
            setPairingHistory(history);
        });
    }, []);
    var _b = react_1.useContext(App_1.AppContext), pairingHistoryOpen = _b.pairingHistoryOpen, setPairingHistoryOpen = _b.setPairingHistoryOpen;
    var closePairingHistoryPanel = function () {
        setPairingHistoryOpen(false);
    };
    var classes = classnames_1.default({
        "pairing-history-panel": true,
        "panel-open": pairingHistoryOpen,
        "panel-closed": !pairingHistoryOpen,
    });
    if (!pairingHistory) {
        return null;
    }
    return (react_1.default.createElement("div", { className: classes },
        react_1.default.createElement(react_custom_scrollbars_1.Scrollbars, null,
            react_1.default.createElement("div", { className: "inner-pairing-history-wrapper" },
                react_1.default.createElement("div", { className: "header" },
                    react_1.default.createElement("h2", null, "Pair Rotation History"),
                    react_1.default.createElement("div", { className: "cancel", onClick: closePairingHistoryPanel.bind(_this) })),
                react_1.default.createElement("div", { className: "body" },
                    pairingHistory.length === 0 && (react_1.default.createElement("div", { className: "no-history" },
                        react_1.default.createElement("div", { className: "clock" }),
                        react_1.default.createElement("div", { className: "no-history-content" }, "\u2018Record Pairs\u2019 to track daily rotation history. The more you record, the better the recommendation engine becomes."))),
                    pairingHistory.length > 0 && (react_1.default.createElement(PairingHistoryRecordList_1.PairingHistoryRecordList, { pairingHistoryList: pairingHistory })))))));
};
exports.PairingHistory = PairingHistory;
