import Driver from "@/driver";
import InMemoryDriver from "@/drivers/in-memory-driver";
import Store from "@/store";

function testCallbacks(defaultCallback: jest.Mock, callback: jest.Mock, args?: any) {
  if (callback) {
    expect(defaultCallback).not.toHaveBeenCalled();
    if (args) {
      expect(callback).toHaveBeenCalledWith(args);
    } else {
      expect(callback).toHaveBeenCalled();
    }
  } else if (defaultCallback) {
    if (args) {
      expect(defaultCallback).toHaveBeenCalledWith(args);
    } else {
      expect(defaultCallback).toHaveBeenCalled();
    }
    expect(callback).not.toHaveBeenCalled();
  } else {
    expect(defaultCallback).not.toHaveBeenCalled();
    expect(callback).not.toHaveBeenCalled();
  }
}

function testSave(
  store: Store<any>,
  key: string,
  value: any,
  options?: {
    callback?: jest.Mock<void, [boolean]>,
  }) {

  const optionalCallback = options?.callback ?? jest.fn<void, [boolean]>();
  const success = store.save(key, value, optionalCallback);
  const defaultCallback = jest.fn<void, [boolean]>(store.calllbacks?.onSaved);

  expect(success).toBe(true);
  testCallbacks(defaultCallback, optionalCallback, success);
}

function testLoad(
  store: Store<any>,
  key: string,
  expected: any,
  options?: {
    callback?: jest.Mock<void, [boolean]>,
  }) {

  const optionalCallback = options?.callback ?? jest.fn<void, [boolean]>();
  const loaded = store.load(key, optionalCallback);
  expect(loaded).toStrictEqual(expected);

  const defaultCallback = jest.fn<void, [any]>(store.calllbacks?.onLoaded);
  testCallbacks(defaultCallback, optionalCallback, loaded);
}

function testRemove(
  store: Store<any>,
  key: string,
  expected: any,
  options?: {
    callback?: jest.Mock<void, [boolean]>,
  }) {

  const optionalCallback = options?.callback ?? jest.fn<void, [boolean]>();
  const removed = store.remove(key, optionalCallback);
  expect(removed).toStrictEqual(expected);

  const loaded = store.load(key);
  expect(loaded).toBeUndefined();

  const defaultCallback = jest.fn<void, [any]>(store.calllbacks?.onRemoved);
  testCallbacks(defaultCallback, optionalCallback, removed);
}

function testClear(
  store: Store<any>,
  options?: {
    callback?: jest.Mock<void, []>,
  }) {

  const optionalCallback = options?.callback ?? jest.fn<void, []>();
  store.clear(optionalCallback);
  const counted = store.count();
  expect(counted).toStrictEqual(0);

  const defaultCallback = jest.fn<void, [any]>(store.calllbacks?.onCleared);
  testCallbacks(defaultCallback, optionalCallback);
}

describe("Store", () => {
  let driver: Driver<any>;

  beforeEach(() => {
    driver = new InMemoryDriver<any>();
  });

  describe("Save feature", () => {
    it("should save a value when no callbacks are defined", () => {
      const store = new Store<any>(driver);

      testSave(store, "key", "value");
    });

    it("should save a value and call the explicit callback", () => {
      const store = new Store<any>(driver);
      const callback = jest.fn<void, [boolean]>();

      testSave(store, "key", "value", {callback});
    });

    it("should save a value and call the default callback", () => {
      const store = new Store<any>(driver, {
        onSaved: jest.fn<void, [boolean]>(),
      });

      testSave(store, "key", "value");
    });

    it("should save a value and call the explicit callback instead of default callback", () => {
      const store = new Store<any>(driver, {
        onSaved: jest.fn<void, [boolean]>(),
      });
      const callback = jest.fn<void, [boolean]>();

      testSave(store, "key", "value", {callback});
    });
  });

  describe("Load feature", () => {
    it("should load a value when no callbacks are defined", () => {
      const store = new Store<any>(driver);

      store.clear();
      testLoad(store, "key", undefined);

      store.clear();
      store.save("key", "value");
      testLoad(store, "key", "value");
    });

    it("should load a value and call the explicit callback", () => {
      const store = new Store<any>(driver);
      const callback = jest.fn<void, [any]>();

      store.clear();
      testLoad(store, "key", undefined, {callback});

      store.clear();
      store.save("key", "value");
      testLoad(store, "key", "value", {callback});
    });

    it("should load a value and call the default callback", () => {
      const store = new Store<any>(driver, {
        onLoaded: jest.fn<void, [any]>(),
      });

      store.clear();
      testLoad(store, "key", undefined);

      store.clear();
      store.save("key", "value");
      testLoad(store, "key", "value");
    });

    it("should load a value and call the explicit callback instead of default callback", () => {
      const store = new Store<any>(driver, {
        onLoaded: jest.fn<void, [boolean]>(),
      });
      const callback = jest.fn<void, [any]>();

      store.clear();
      testLoad(store, "key", undefined, {callback});

      store.clear();
      store.save("key", "value");
      testLoad(store, "key", "value", {callback});
    });
  });

  describe("Remove feature", () => {
    it("should remove a value when no callbacks are defined", () => {
      const store = new Store<any>(driver);

      store.clear();
      testRemove(store, "key", undefined);

      store.clear();
      store.save("key", "value");
      testRemove(store, "key", "value");
    });

    it("should remove a value and call the explicit callback", () => {
      const store = new Store<any>(driver);
      const callback = jest.fn<void, [any]>();

      store.clear();
      testRemove(store, "key", undefined, {callback});

      store.clear();
      store.save("key", "value");
      testRemove(store, "key", "value", {callback});
    });

    it("should remove a value and call the default callback", () => {
      const store = new Store<any>(driver, {
        onRemoved: jest.fn<void, [any]>(),
      });

      store.clear();
      testRemove(store, "key", undefined);

      store.clear();
      store.save("key", "value");
      testRemove(store, "key", "value");
    });

    it("should remove a value and call the explicit callback instead of default callback", () => {
      const store = new Store<any>(driver, {
        onRemoved: jest.fn<void, [any]>(),
      });
      const callback = jest.fn<void, [any]>();

      store.clear();
      testLoad(store, "key", undefined, {callback});

      store.clear();
      store.save("key", "value");
      testLoad(store, "key", "value", {callback});
    });
  });

  describe("Clear feature", () => {
    it("should clear when no callbacks are defined", () => {
      const store = new Store<any>(driver);

      store.save("key", "value");
      testClear(store);
    });

    it("should clear and call the explicit callback", () => {
      const store = new Store<any>(driver);
      const callback = jest.fn<void, []>();

      store.save("key", "value");
      testClear(store, {callback});
    });

    it("should clear and call the default callback", () => {
      const store = new Store<any>(driver, {
        onCleared: jest.fn<void, []>(),
      });

      store.save("key", "value");
      testClear(store);
    });

    it("should clear and call the explicit callback instead of default callback", () => {
      const store = new Store<any>(driver, {
        onCleared: jest.fn<void, []>(),
      });
      const callback = jest.fn<void, []>();

      store.save("key", "value");
      testClear(store, {callback});
    });
  });
});
