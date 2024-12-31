import Driver from "@/driver";

export type Callbacks<T> = {
  onSaved?: (success: boolean) => void;
  onLoaded?: (value: T|undefined) => void;
  onRemoved?: (value: T|undefined) => void;
  onCleared?: () => void;
};

export default class Store<T> {
  private driver: Driver<T>;
  private callbacks?: Callbacks<T>;

  constructor(driver: Driver<T>, callbacks?: Callbacks<T>) {
    this.driver = driver;
    this.callbacks = callbacks;
  }

  get calllbacks(): Callbacks<T>|undefined {
    return this.callbacks;
  }

  save(key: string, value: T, callback?: (success: boolean) => void): boolean {
    return this.driver.put(key, value, callback ?? this.callbacks?.onSaved);
  }

  load(key: string, callback?: (value: T|undefined) => void): T|undefined {
    return this.driver.get(key, callback ?? this.callbacks?.onLoaded);
  }

  remove(key: string, callback?: (value: T|undefined) => void): T|undefined {
    return this.driver.remove(key, callback ?? this.callbacks?.onRemoved);
  }

  clear(callback?: () => void): void {
    this.driver.clear(callback ?? this.callbacks?.onCleared);
  }

  count(): number {
    return this.driver.count();
  }
}
