import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  displayName: "webstart-project-id",
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
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
