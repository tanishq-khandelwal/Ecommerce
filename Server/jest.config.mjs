export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",

  transform: {
    "^.+\\.[tj]sx?$": ["babel-jest", { presets: ["@babel/preset-env"] }],
  },

  testEnvironment: "node",

  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)",
  ],

  transformIgnorePatterns: [
    "node_modules/(?!(graphql-request|@babel/runtime)/)", // Allow Jest to transform ES modules in these packages
  ],

  verbose: true,
};
