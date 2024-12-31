import {pathsToModuleNameMapper} from "ts-jest";
import {compilerOptions} from "./tsconfig.json";

export default {
  collectCoverageFrom: ["src/**/*.ts", "!src/**/*.d.ts"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {prefix: "<rootDir>"}),
  modulePaths: ["<rootDir>/src"],
  preset: "ts-jest",
  roots: ["<rootDir>/tests"],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
