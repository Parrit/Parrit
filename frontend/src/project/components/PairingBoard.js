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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PairingBoard = void 0;
var react_1 = __importStar(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var PairingBoardHeader_1 = require("./PairingBoardHeader");
var RoleList_1 = require("./RoleList");
var PersonList_1 = require("./PersonList");
var DatabaseHelpers = __importStar(require("../../shared/helpers/DatabaseHelpers"));
var Workspace_1 = require("./Workspace");
var PairingBoard = function (props) {
    var _a = props.pairingBoard, name = _a.name, exempt = _a.exempt, people = _a.people;
    var _b = react_1.useState(false), editing = _b[0], setEditing = _b[1];
    var _c = react_1.useState(), editingError = _c[0], setEditingError = _c[1];
    var _d = react_1.useState(props.pairingBoard.roles), roles = _d[0], setRoles = _d[1];
    var _e = react_1.useContext(Workspace_1.WorkspaceContext), projectId = _e.projectId, deletePairingBoard = _e.deletePairingBoard;
    var pairingBoardClasses = classnames_1.default({
        "pairing-board": true,
        editing: editing,
        exempt: exempt,
    });
    var renamePairingBoard = function (name) {
        DatabaseHelpers.putPairingBoard(projectId, props.pairingBoard.id, name)
            .then(function () { return setEditing(false); })
            .catch(function (error) {
            console.log("rename error", error);
            setEditingError(error);
        });
    };
    var moveRole = function () { };
    var deleteRole = function () { };
    return (react_1.default.createElement("div", { className: pairingBoardClasses },
        react_1.default.createElement(PairingBoardHeader_1.PairingBoardHeader, { name: name, exempt: exempt, editMode: editing, editErrorMessage: editingError, renamePairingBoard: renamePairingBoard, deletePairingBoard: function () { return deletePairingBoard; }, setEditing: setEditing }),
        react_1.default.createElement(RoleList_1.RoleList, { roles: roles, moveRole: moveRole, deleteRole: deleteRole }),
        react_1.default.createElement(PersonList_1.PersonList, { people: people })));
};
exports.PairingBoard = PairingBoard;
