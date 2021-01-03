"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var DatabaseHelpers_1 = require("../../shared/helpers/DatabaseHelpers");
var Header = function (props) {
    var pairingHistoryOpen = props.isPairingHistoryPanelOpen;
    var classes = classnames_1.default({
        history: true,
        open: pairingHistoryOpen,
    });
    var openPairingHistoryPanel = function () {
        props.setPairingHistoryPanelOpen(true);
    };
    var closePairingHistoryPanel = function () {
        props.setPairingHistoryPanelOpen(false);
    };
    var logout = function () {
        DatabaseHelpers_1.postLogout;
    };
    return (react_1.default.createElement("header", null,
        react_1.default.createElement("a", { href: "/", className: "header-logo" }),
        react_1.default.createElement("div", { className: "links" },
            react_1.default.createElement("h3", { className: "logout", onClick: logout }, "LOGOUT"),
            react_1.default.createElement("h3", { className: "feedback" },
                react_1.default.createElement("a", { href: "https://goo.gl/forms/ZGqUyZDEDSWqZVBP2", target: "_blank", rel: "noopener" }, "feedback")),
            react_1.default.createElement("h3", { className: classes, onClick: pairingHistoryOpen
                    ? closePairingHistoryPanel
                    : openPairingHistoryPanel },
                "HISTORY",
                react_1.default.createElement("div", { className: pairingHistoryOpen ? "history-caret-right" : "history-caret-left" })))));
};
exports.Header = Header;
