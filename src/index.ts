import InMemoryDriver from "@/drivers/in-memory-driver";
import LocalStorageDriver from "@/drivers/local-storage-driver";
import SessionStorageDriver from "@/drivers/session-storage-driver";
import Store, {Callbacks} from "@/store";

export {default as Store, Callbacks} from "@/store";

export function createInMemoryStore<T>(callbacks?: Callbacks<T>): Store<T> {
  const driver = new InMemoryDriver<T>();
  return new Store<T>(driver, callbacks);
}

export function createLocalStorageStore<T>(callbacks?: Callbacks<T>): Store<T> {
  const driver = new LocalStorageDriver<T>();
  return new Store<T>(driver, callbacks);
}

export function createSessionStorageStore<T>(callbacks?: Callbacks<T>): Store<T> {
  const driver = new SessionStorageDriver<T>();
  return new Store<T>(driver, callbacks);
}
