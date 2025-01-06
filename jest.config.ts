import {pathsToModuleNameMapper} from "ts-jest";
import {compilerOptions} from "./tsconfig.json";

export default {
  collectCoverageFrom: ["src/**/*.ts", "!src/**/*.d.ts"],
  coverageDirectory: "./test-reports/coverage",
  coverageReporters: ["text", "lcov"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {prefix: "<rootDir>"}),
  modulePaths: ["<rootDir>/src"],
  preset: "ts-jest",
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "./test-reports",
        outputName: "junit.xml",
      },
    ],
  ],
  roots: ["<rootDir>/tests"],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
