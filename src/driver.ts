import isNumber from "is-number";

export default abstract class Driver<T> {
  get(key: string, callback?: (value: T|undefined) => void): T|undefined {
    const value = this.onGet(key);
    callback?.(value);
    return value;
  }

  put(key: string, value: T, callback?: (success: boolean) => void): boolean {
    let success = true;
    if (typeof value === "number" && !isNumber(value)) {
      success = false;
    }

    if (success) {
      this.onPut(key, value);
    }

    callback?.(success);
    return success;
  }

  remove(key: string, callback?: (value: T|undefined) => void): T|undefined {
    const value = this.get(key);
    this.onRemove(key);
    callback?.(value);
    return value;
  }

  clear(callback?: () => void): void {
    this.onClear();
    callback?.();
  }

  count(): number {
    return this.onCount();
  }

  protected abstract onGet(key: string): T|undefined;
  protected abstract onPut(key: string, value: T): void;
  protected abstract onRemove(key: string): void;
  protected abstract onClear(): void;
  protected abstract onCount(): number;
}
