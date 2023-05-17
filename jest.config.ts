import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  displayName: "webstart-id",
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  coverageReporters: ["text", "text-summary"],
  coveragePathIgnorePatterns: [
    "src/config", 
    "src/index.ts", 
    "src/logging.ts", 
    "src/application-lifecycle.ts"
  ],
};

export default jestConfig;
