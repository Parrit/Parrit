"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleList = void 0;
var react_1 = __importDefault(require("react"));
var Role_1 = require("./Role");
var RoleList = function (props) {
    return (react_1.default.createElement("div", { className: "role-list" }, props.roles.map(function (role) {
        return (react_1.default.createElement(Role_1.Role, { key: "role-" + role.id, id: role.id, name: role.name, moveRole: props.moveRole, deleteRole: props.deleteRole }));
    })));
};
exports.RoleList = RoleList;
exports.default = exports.RoleList;
