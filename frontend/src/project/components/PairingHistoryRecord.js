"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PairingHistoryRecord = void 0;
var react_1 = __importDefault(require("react"));
var moment_1 = __importDefault(require("moment"));
var PairingHistoryRecord = function (props) {
    var localPairingTime = moment_1.default.now();
    return (react_1.default.createElement("div", { className: "pairing-history-record" },
        react_1.default.createElement("div", { className: "pairing-history-record-clock" }),
        react_1.default.createElement("h3", { className: "pairing-time" }, localPairingTime),
        react_1.default.createElement("div", { className: "pairing-boards-with-people" }, props.pairingBoardsWithPeople.map(function (pairingBoardWithPeople, idx) {
            return (react_1.default.createElement("div", { key: idx, className: "pairing-board-with-people" },
                react_1.default.createElement("div", { className: "pairing-board-name" },
                    pairingBoardWithPeople.name,
                    ":"),
                pairingBoardWithPeople.people.map(function (person, idx) {
                    return (react_1.default.createElement("span", { key: idx, className: "person-name" },
                        person.name,
                        react_1.default.createElement("span", { className: "person-names-plus-sign" }, "+")));
                })));
        })),
        react_1.default.createElement("div", { className: "dotted-line" })));
};
exports.PairingHistoryRecord = PairingHistoryRecord;
exports.default = exports.PairingHistoryRecord;
