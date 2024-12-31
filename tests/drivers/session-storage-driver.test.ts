import SessionStorageDriver from "@/drivers/session-storage-driver";
import {
  describeDriverWithAny,
  describeDriverWithBoolean,
  describeDriverWithNumber,
  describeDriverWithString,
  describeDriverWithUser,
  User,
} from "$/drivers.shared";

describe("SessionStorageDriver<any>", () => {
  describeDriverWithAny(SessionStorageDriver<any>);
});

describe("SessionStorageDriver<string>", () => {
  describeDriverWithString(SessionStorageDriver<string>);
});

describe("SessionStorageDriver<number>", () => {
  describeDriverWithNumber(SessionStorageDriver<number>);
});

describe("SessionStorageDriver<boolean>", () => {
  describeDriverWithBoolean(SessionStorageDriver<boolean>);
});

describe("SessionStorageDriver<User>", () => {
  describeDriverWithUser(SessionStorageDriver<User>);
});
