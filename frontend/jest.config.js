// jest.config.ts
const { defaults } = require("jest-config");
module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
  testMatch: ["<rootDir>/src/**/*.spec.tsx", "<rootDir>/src/**/*.spec.ts"],
};
