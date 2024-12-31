import Driver from "@/driver";

export default class SessionStorageDriver<T> extends Driver<T> {
  protected onGet(key: string): T|undefined {
    const optional = sessionStorage.getItem(key);
    if (optional === null) {
      return undefined;
    }
    return JSON.parse(optional) as T;
  }

  protected onPut(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  protected onRemove(key: string): void {
    sessionStorage.removeItem(key);
  }

  protected onClear(): void {
    sessionStorage.clear();
  }

  protected onCount(): number {
    return sessionStorage.length;
  }
}
