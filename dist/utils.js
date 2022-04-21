"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.symbols = void 0;
const chalk_1 = require("chalk");
exports.symbols = {
    success: chalk_1.default.green("✔"),
    fail: chalk_1.default.red("✖"),
    warn: chalk_1.default.yellow("⚠"),
    info: chalk_1.default.blue("ℹ")
};
