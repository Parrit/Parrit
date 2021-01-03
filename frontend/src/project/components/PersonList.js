"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonList = void 0;
var react_1 = __importDefault(require("react"));
// import {
//   deletePersonThunk,
//   movePersonThunk,
// } from "../actions/thunks/DataThunks";
var Person_1 = require("./Person");
var PersonList = function (props) {
    return (react_1.default.createElement("div", { className: "person-list" }, props.people.map(function (person, idx) {
        return (react_1.default.createElement(Person_1.Person, { key: "person-" + idx, id: person.id, name: person.name }));
    })));
};
exports.PersonList = PersonList;
// const mapDispatchToProps = {
//   movePerson: movePersonThunk,
//   deletePerson: deletePersonThunk,
// };
