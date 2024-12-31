import Driver from "@/driver";

export function describeDriverWithAny(DriverClass: new () => Driver<any>) {
  let driver: Driver<any>;

  beforeEach(() => {
    driver = new DriverClass();
  });

  it("should call callbacks", () => {
    const callbacks = {
      put: jest.fn(),
      get: jest.fn(),
      remove: jest.fn(),
      clear: jest.fn(),
    };

    driver.put("key", "initValue", callbacks.put);
    driver.put("key", "value", callbacks.put);
    driver.get("key", callbacks.get);
    driver.remove("key", callbacks.remove);
    driver.get("key", callbacks.get);
    driver.put("key1", 0, callbacks.put);
    driver.put("key2", false, callbacks.put);
    driver.clear(callbacks.clear);

    expect(callbacks.put).toHaveBeenNthCalledWith(1, true);
    expect(callbacks.put).toHaveBeenNthCalledWith(2, true);
    expect(callbacks.get).toHaveBeenNthCalledWith(1, "value");
    expect(callbacks.remove).toHaveBeenCalledWith("value");
    expect(callbacks.get).toHaveBeenNthCalledWith(2, undefined);
    expect(callbacks.put).toHaveBeenNthCalledWith(3, true);
    expect(callbacks.put).toHaveBeenNthCalledWith(4, true);
    expect(callbacks.clear).toHaveBeenCalled();
  });

  it("should return undefined for a non-existent key", () => {
    expect(driver.get("nonExistentKey")).toBeUndefined();
  });
}

export function describeDriverWithString(DriverClass: new () => Driver<string>) {
  let driver: Driver<string>;

  beforeEach(() => {
    driver = new DriverClass();
  });

  it("should store and retrieve a value", () => {
    const key = "key";
    const value = "value";

    expect(driver.put(key, value)).toBe(true);
    expect(driver.get(key)).toStrictEqual(value);
  });

  it("should overwrite and retrieve the latest value", () => {
    const key = "key";
    const values = ["value1", "value2", "value3", ""];

    expect(values.every((value) => driver.put(key, value))).toBe(true);
    expect(driver.get(key)).toStrictEqual(values.pop());
  });

  it("should remove a value", () => {
    const key = "key";
    const value = "value";

    expect(driver.put(key, value)).toBe(true);
    expect(driver.remove(key)).toStrictEqual(value);
    expect(driver.get(key)).toBeUndefined();
  });

  it("should clear all values", () => {
    type KeyValue = {[key: string]: string};
    const keyValues: KeyValue[] = [{"key1": "value1"}, {"key2": "value2"}];

    keyValues.forEach((kv) => {
      const key = Object.keys(kv)[0];
      const value = kv[key];
      expect(driver.put(key, value)).toBe(true);
    });

    driver.clear();

    keyValues.forEach((kv) => {
      const key = Object.keys(kv)[0];
      expect(driver.get(key)).toBeUndefined();
    });
  });
}

export function describeDriverWithNumber(DriverClass: new () => Driver<number>) {
  let driver: Driver<number>;

  beforeEach(() => {
    driver = new DriverClass();
    driver.clear();
  });

  it("should store and retrieve a value", () => {
    const key = "key";
    const values = [0, 314, -314, 3.14, -3.14, 0.0314E+2, -0.0314E+2];

    values.forEach(value => {
      expect(driver.put(key, value)).toBe(true);
      expect(driver.get(key)).toStrictEqual(value);
    });
  });

  it("should not store and retrieve a abnormal value", () => {
    const key = "key";
    const abnormalValues = [NaN, Infinity, 3/0, 0/0];

    abnormalValues.forEach(value => {
      expect(driver.put(key, value)).toBe(false);
      expect(driver.get(key)).toBeUndefined();
    });
  });

  it("should overwrite and retrieve the latest value", () => {
    const key = "key";
    const values = [45, 100];

    expect(values.every((value) => driver.put(key, value))).toBe(true);
    expect(driver.put(key, NaN)).toBe(false); // ignored abnormal value
    expect(driver.get(key)).toStrictEqual(100);
  });

  it("should remove a value", () => {
    const key = "key";
    const value = 100;

    expect(driver.put(key, value)).toBe(true);
    expect(driver.remove(key)).toStrictEqual(value);
    expect(driver.get(key)).toBeUndefined();
  });

  it("should clear all values", () => {
    type KeyValue = {[key: string]: number};
    const keyValues: KeyValue[] = [{"key1": 100}, {"key2": 200}];

    keyValues.forEach((kv) => {
      const key = Object.keys(kv)[0];
      const value = kv[key];
      expect(driver.put(key, value)).toBe(true);
    });

    driver.clear();

    keyValues.forEach((kv) => {
      const key = Object.keys(kv)[0];
      expect(driver.get(key)).toBeUndefined();
    });
  });
}

export function describeDriverWithBoolean(DriverClass: new () => Driver<boolean>) {
  let driver: Driver<boolean>;

  beforeEach(() => {
    driver = new DriverClass();
  });

  it("should store and retrieve a value", () => {
    const key = "key";

    expect(driver.put(key, false)).toBe(true);
    expect(driver.get(key)).toStrictEqual(false);
  });

  it("should overwrite and retrieve the latest value", () => {
    const key = "key";
    const values = [false, true];

    expect(values.every((value) => driver.put(key, value))).toBe(true);
    expect(driver.get(key)).toStrictEqual(true);
  });

  it("should remove a value", () => {
    const key = "key";
    const value = false;

    expect(driver.put(key, value)).toBe(true);
    expect(driver.remove(key)).toStrictEqual(value);
    expect(driver.get(key)).toBeUndefined();
  });

  it("should clear all values", () => {
    type KeyValue = {[key: string]: boolean};
    const keyValues: KeyValue[] = [{"key1": false}, {"key2": true}];

    keyValues.forEach((kv) => {
      const key = Object.keys(kv)[0];
      const value = kv[key];
      expect(driver.put(key, value)).toBe(true);
    });

    driver.clear();

    keyValues.forEach((kv) => {
      const key = Object.keys(kv)[0];
      expect(driver.get(key)).toBeUndefined();
    });
  });
}

export type User = {
  id:  number;
  name: string;
  isAdmin: boolean;
}

export function describeDriverWithUser(DriverClass: new () => Driver<User>) {
  let driver: Driver<User>;

  beforeEach(() => {
    driver = new DriverClass();
  });

  it("should store and retrieve a value", () => {
    const key = "key";
    const value: User = {id: 1, name: "Dean", isAdmin: true};

    expect(driver.put(key, value)).toBe(true);
    expect(driver.get(key)).toStrictEqual(value);
  });

  it("should overwrite and retrieve the latest value", () => {
    const key = "key";
    const values: User[] = [
      {id: 1, name: "Dean", isAdmin: true},
      {id: 2, name: "Stella", isAdmin: false},
    ];

    expect(values.every((value) => driver.put(key, value))).toBe(true);
    expect(driver.get(key)).toStrictEqual(values.pop());
  });

  it("should remove a value", () => {
    const key = "key";
    const value: User = {id: 1, name: "Dean", isAdmin: true};

    expect(driver.put(key, value)).toBe(true);
    expect(driver.remove(key)).toStrictEqual(value);
    expect(driver.get(key)).toBeUndefined();
  });

  it("should clear all values", () => {
    type KeyValue = {[key: string]: User};
    const keyValues: KeyValue[] = [
      {"key1": {id: 1, name: "Dean", isAdmin: true}},
      {"key2": {id: 2, name: "Stella", isAdmin: false}},
    ];

    keyValues.forEach((kv) => {
      const key = Object.keys(kv)[0];
      const value = kv[key];
      expect(driver.put(key, value)).toBe(true);
    });

    driver.clear();

    keyValues.forEach((kv) => {
      const key = Object.keys(kv)[0];
      expect(driver.get(key)).toBeUndefined();
    });
  });
}
