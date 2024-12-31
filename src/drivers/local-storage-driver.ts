import Driver from "@/driver";

export default class LocalStorageDriver<T> extends Driver<T> {
  protected onGet(key: string): T|undefined {
    const optional = localStorage.getItem(key);
    if (optional === null) {
      return undefined;
    }
    return JSON.parse(optional) as T;
  }

  protected onPut(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  protected onRemove(key: string): void {
    localStorage.removeItem(key);
  }

  protected onClear(): void {
    localStorage.clear();
  }

  protected onCount(): number {
    return localStorage.length;
  }
}
