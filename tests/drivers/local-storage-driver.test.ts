import LocalStorageDriver from "@/drivers/local-storage-driver";
import {
  describeDriverWithAny,
  describeDriverWithBoolean,
  describeDriverWithNumber,
  describeDriverWithString,
  describeDriverWithUser,
  User,
} from "$/drivers.shared";

describe("LocalStorageDriver<any>", () => {
  describeDriverWithAny(LocalStorageDriver<any>);
});

describe("LocalStorageDriver<string>", () => {
  describeDriverWithString(LocalStorageDriver<string>);
});

describe("LocalStorageDriver<number>", () => {
  describeDriverWithNumber(LocalStorageDriver<number>);
});

describe("LocalStorageDriver<boolean>", () => {
  describeDriverWithBoolean(LocalStorageDriver<boolean>);
});

describe("LocalStorageDriver<User>", () => {
  describeDriverWithUser(LocalStorageDriver<User>);
});
