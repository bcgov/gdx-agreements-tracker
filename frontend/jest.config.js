module.exports = {
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.js", // Include all JavaScript files in the src directory and its subdirectories
    "src/**/*.ts", // Include all TypeScript files in the src directory and its subdirectories
  ],
  coverageThreshold: {
    global: {
      lines: 0, // Change this number to the desired code coverage percentage
    },
  },
};
