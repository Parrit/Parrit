// jest.config.ts
const { defaults } = require("jest-config");
module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
  testMatch: ["<rootDir>/src/**/*.spec.tsx"],
  setupFiles: [
    "<rootDir>/polyfills.js",
    "<rootDir>/src/shared/misc/TestSetup.js",
  ],
};
