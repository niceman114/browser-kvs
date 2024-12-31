import Driver from "@/driver";

export default class InMemoryDriver<T> extends Driver<T> {
  private storage: {[key: string]: T} = {};

  protected onGet(key: string): T|undefined {
    return this.storage[key];
  }

  protected onPut(key: string, value: T): void {
    this.storage[key] = value;
  }

  protected onRemove(key: string): void {
    delete this.storage[key];
  }

  protected onClear(): void {
    this.storage = {};
  }

  protected onCount(): number {
    return Object.entries(this.storage)
      .filter(([_, value]) => value !== undefined)
      .map(([key]) => key).length;
  }
}
