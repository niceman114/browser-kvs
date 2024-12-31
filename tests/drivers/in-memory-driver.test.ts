import InMemoryDriver from "@/drivers/in-memory-driver";
import {
  describeDriverWithAny,
  describeDriverWithBoolean,
  describeDriverWithNumber,
  describeDriverWithString,
  describeDriverWithUser,
  User,
} from "$/drivers.shared";

describe("InMemoryDriver<any>", () => {
  describeDriverWithAny(InMemoryDriver<any>);
});

describe("InMemoryDriver<string>", () => {
  describeDriverWithString(InMemoryDriver<string>);
});

describe("InMemoryDriver<number>", () => {
  describeDriverWithNumber(InMemoryDriver<number>);
});

describe("InMemoryDriver<boolean>", () => {
  describeDriverWithBoolean(InMemoryDriver<boolean>);
});

describe("InMemoryDriver<User>", () => {
  describeDriverWithUser(InMemoryDriver<User>);
});
