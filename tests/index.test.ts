import InMemoryDriver from "@/drivers/in-memory-driver";
import LocalStorageDriver from "@/drivers/local-storage-driver";
import SessionStorageDriver from "@/drivers/session-storage-driver";
import {
  createInMemoryStore,
  createLocalStorageStore,
  createSessionStorageStore,
  Store,
  Callbacks,
} from "@/index";

function testStoreCreation<T>(createStore: (callbacks?: Callbacks<T>) => Store<T>, DriverClass: new () => any) {
  return (callbacks: Callbacks<T>) => {
    const store = createStore(callbacks);

    expect(store).toBeInstanceOf(Store);
    expect(store["driver"]).toBeInstanceOf(DriverClass);
    expect(store["callbacks"]).toEqual(callbacks);
  };
}

describe("Store creation functions", () => {
  let callbacks: Callbacks<any>;

  beforeEach(() => {
    callbacks = {
      onSaved: jest.fn(),
      onLoaded: jest.fn(),
      onRemoved: jest.fn(),
      onCleared: jest.fn(),
    };
  });

  it("should create InMemoryStore with correct driver and callbacks", () => {
    testStoreCreation(createInMemoryStore, InMemoryDriver)(callbacks);
  });

  it("should create LocalStorageStore with correct driver and callbacks", () => {
    testStoreCreation(createLocalStorageStore, LocalStorageDriver)(callbacks);
  });

  it("should create SessionStorageStore with correct driver and callbacks", () => {
    testStoreCreation(createSessionStorageStore, SessionStorageDriver)(callbacks);
  });
});
