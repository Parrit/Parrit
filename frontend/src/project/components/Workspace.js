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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workspace = exports.WorkspaceContext = void 0;
var react_1 = __importStar(require("react"));
var react_modal_1 = __importDefault(require("react-modal"));
var PersonList_1 = require("./PersonList");
var TrashBin_1 = require("./TrashBin");
var PairingBoardList_1 = require("./PairingBoardList");
var NameForm_1 = require("../../shared/components/NameForm");
var DatabaseHelpers = __importStar(require("../../shared/helpers/DatabaseHelpers.js"));
exports.WorkspaceContext = react_1.default.createContext({});
var Workspace = function (props) {
    var _a = react_1.useState(false), newPersonOpen = _a[0], setNewPersonOpen = _a[1];
    var _b = react_1.useState(false), newPairingBoardOpen = _b[0], setNewPairingBoardOpen = _b[1];
    var _c = react_1.useState(false), newRoleOpen = _c[0], setNewRoleOpen = _c[1];
    var _d = react_1.useState(), newPersonError = _d[0], setNewPersonError = _d[1];
    var _e = react_1.useState(), newPairingBoardError = _e[0], setNewPairingBoardError = _e[1];
    var _f = react_1.useState(), newRoleError = _f[0], setNewRoleError = _f[1];
    var _g = react_1.useState(props.people), people = _g[0], setPeople = _g[1];
    var _h = react_1.useState(props.pairingBoards), pairingBoards = _h[0], setPairingBoards = _h[1];
    var createPerson = function (name) {
        return DatabaseHelpers.postPerson(props.projectId, name)
            .then(function (person) {
            setPeople(function (oldPeople) {
                return __spreadArrays(oldPeople, [person]);
            });
            setNewPersonOpen(false);
            return person;
        })
            .catch(function (error) {
            console.log("newPersonError", error);
            setNewPersonError(error);
            throw error;
        });
    };
    var createPairingBoard = function (name) {
        return DatabaseHelpers.postPairingBoard(props.projectId, name)
            .then(function (pairingBoard) {
            setPairingBoards(function (oldPairingBoards) {
                return __spreadArrays(oldPairingBoards, [pairingBoard]);
            });
            setNewPairingBoardOpen(false);
            return pairingBoard;
        })
            .catch(function (error) {
            console.log("newPairingBoardError", error);
            setNewPairingBoardError(error);
            throw error;
        });
    };
    var deletePairingBoard = function (pairingBoard) {
        return DatabaseHelpers.deletePairingBoard(props.projectId, pairingBoard.id);
    };
    var createRole = function (name, pairingBoard) {
        return DatabaseHelpers.postRole(props.projectId, pairingBoard.id, name)
            .then(function (role) {
            setNewRoleOpen(false);
            return role;
        })
            .catch(function (error) {
            console.log("newRoleError", error);
            setNewRoleError(error);
            throw error;
        });
    };
    var movePerson = function (person, position) { };
    var deletePerson = function (person) {
        return DatabaseHelpers.deletePerson(props.projectId, person.id);
    };
    var value = {
        newPersonOpen: newPersonOpen,
        newPairingBoardOpen: newPairingBoardOpen,
        newRoleOpen: newRoleOpen,
        createPerson: createPerson,
        createPairingBoard: createPairingBoard,
        createRole: createRole,
        setNewPersonOpen: setNewPersonOpen,
        setNewPairingBoardOpen: setNewPairingBoardOpen,
        setNewRoleOpen: setNewRoleOpen,
        movePerson: movePerson,
        deletePerson: deletePerson,
        people: people,
        pairingBoards: pairingBoards,
        projectId: props.projectId,
        deletePairingBoard: deletePairingBoard,
    };
    return (react_1.default.createElement(exports.WorkspaceContext.Provider, { value: value },
        react_1.default.createElement("div", { className: "workspace" },
            react_1.default.createElement("div", { className: "floating-parrits" },
                react_1.default.createElement("h2", { className: "floating-parrit-title" }, "Floating Parrits"),
                react_1.default.createElement(PersonList_1.PersonList, { people: props.people }),
                react_1.default.createElement("div", { className: "floating-parrit-actions" },
                    react_1.default.createElement("div", { className: "add-parrit-button", onClick: function () { return setNewPersonOpen(true); } }),
                    react_1.default.createElement(TrashBin_1.TrashBin, null))),
            react_1.default.createElement("div", { className: "dotted-line" }),
            react_1.default.createElement("div", { className: "pairing-boards-container" },
                react_1.default.createElement("h2", { className: "pairing-boards-title" }, "Pairing Boards"),
                react_1.default.createElement(PairingBoardList_1.PairingBoardList, { pairingBoards: pairingBoards }),
                react_1.default.createElement("div", { className: "add-board-button", onClick: function () { return setNewPairingBoardOpen(true); } })),
            react_1.default.createElement(react_modal_1.default, { contentLabel: "New Person Modal", isOpen: newPersonOpen, onRequestClose: function () { return setNewPersonOpen(false); } },
                react_1.default.createElement(NameForm_1.NameForm, { formTitle: "Add Parrit Teammate", confirmFunction: createPerson, cancelFunction: function () { return setNewPersonOpen(false); }, errorMessage: newPersonError })),
            react_1.default.createElement(react_modal_1.default, { contentLabel: "New Pairing Board Modal", isOpen: newPairingBoardOpen, onRequestClose: function () { return setNewPairingBoardOpen(false); } },
                react_1.default.createElement(NameForm_1.NameForm, { formTitle: "Add Pairing Board", confirmFunction: createPairingBoard, cancelFunction: function () { return setNewPairingBoardOpen(false); }, errorMessage: newPairingBoardError })),
            react_1.default.createElement(react_modal_1.default, { contentLabel: "New Role Modal", isOpen: newRoleOpen, onRequestClose: function () { return setNewRoleOpen(false); } }))));
};
exports.Workspace = Workspace;
// function mapStateToProps({ data, settings }: any) {
//   return {
//     people: data.project.people,
//     settings: settings,
//   };
// }
// const mapDispatchToProps = {
//   createPerson: addNewPersonThunk,
//   createPairingBoard: addNewPairingBoardThunk,
//   createRole: addNewRoleThunk,
//   setNewPersonModalOpen: setNewPersonModalOpenCreator,
//   setNewPairingBoardModalOpen: setNewPairingBoardModalOpenCreator,
//   setNewRoleModalOpen: setNewRoleModalOpenCreator,
// };
