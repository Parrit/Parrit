"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PairingHistoryRecordList = void 0;
var react_1 = __importDefault(require("react"));
var PairingHistoryRecord_1 = require("./PairingHistoryRecord");
var PairingHistoryRecordList = function (props) {
    var createPairingHistoryRecord = function (pairingTime) {
        return {
            pairingTime: pairingTime,
            pairingBoardsWithPeople: [],
            pairingBoardName: "",
            people: [],
        };
    };
    var pairingHistoryRecords = [];
    var currentPairingTime = props.pairingHistoryList[0].pairingTime;
    var currentPairingHistoryRecord = createPairingHistoryRecord(currentPairingTime);
    props.pairingHistoryList.forEach(function (pairingHistory) {
        if (pairingHistory.pairingTime !== currentPairingTime) {
            pairingHistoryRecords.push(currentPairingHistoryRecord);
            currentPairingTime = pairingHistory.pairingTime;
            currentPairingHistoryRecord = createPairingHistoryRecord(pairingHistory.pairingTime);
        }
        // currentPairingHistoryRecord.pairingBoardsWithPeople.push({
        //   name: pairingHistory.pairingBoardName,
        //   people: pairingHistory.people,
        // });
    });
    pairingHistoryRecords.push(currentPairingHistoryRecord);
    return (react_1.default.createElement("div", { className: "pairing-history-record-list" }, pairingHistoryRecords.map(function (pairingHistoryRecord, idx) {
        return (react_1.default.createElement(PairingHistoryRecord_1.PairingHistoryRecord, { key: idx, pairingTime: pairingHistoryRecord.pairingTime, pairingBoardsWithPeople: pairingHistoryRecord.pairingBoardsWithPeople }));
    })));
};
exports.PairingHistoryRecordList = PairingHistoryRecordList;
