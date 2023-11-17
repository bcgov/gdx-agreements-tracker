module.exports = {
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleNameMapper: {
    "^@models(.*)$": "<rootDir>/src/models/$1",
    "^@controllers(.*)$": "<rootDir>/src/controllers/$1",
    "^@routes(.*)$": "<rootDir>/src/routes/$1",
    "^@validators(.*)$": "<rootDir>/src/validators/$1",
    "^@database(.*)$": "<rootDir>/src/database/$1",
    "^@helpers(.*)$": "<rootDir>/src/helpers/$1",
    "^@facilities(.*)$": "<rootDir>/src/facilities/$1",
  },
  collectCoverage: true,
  coverageThreshold: {
    global: {
      lines: 0, //Change this number to the desired code covergae percentage
    },
  },
};
