"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PairingBoardList = void 0;
var react_1 = __importDefault(require("react"));
var PairingBoard_1 = require("./PairingBoard");
var PairingBoardList = function (props) {
    return (react_1.default.createElement("div", { className: "pairing-boards" }, props.pairingBoards.map(function (pairingBoard, idx) {
        return (react_1.default.createElement(PairingBoard_1.PairingBoard, { key: "pairing-board-" + pairingBoard.id, pairingBoard: pairingBoard }));
    })));
};
exports.PairingBoardList = PairingBoardList;
// function mapStateToProps({ data, settings }) {
//   return {
//     pairingBoards: data.project.pairingBoards,
//     pairingBoardSettings: settings.pairingBoardSettings,
//   };
// }
// export default connect(mapStateToProps, {})(PairingBoardList);
