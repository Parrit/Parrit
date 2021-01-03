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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleTile = exports.Role = void 0;
var react_1 = __importStar(require("react"));
var Role = function (props) {
    var _a = react_1.useState(false), isDragging = _a[0], setIsDragging = _a[1];
    var name = props.name;
    if (isDragging) {
        return null;
    }
    return react_1.default.createElement(exports.RoleTile, { name: name });
};
exports.Role = Role;
var RoleTile = function (props) {
    return react_1.default.createElement("div", { className: "role" }, props.name);
};
exports.RoleTile = RoleTile;
