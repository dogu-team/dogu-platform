import { CustomInspectSymbol } from './logs';
import { stringifyShort } from './strings/functions';

export class Registry<Key, Value> {
  protected readonly map: Map<Key, Value> = new Map();

  constructor(protected readonly name: string) {}

  register(key: Key, value: Value): void {
    if (this.map.has(key)) {
      throw new Error(`${this.name} Key ${stringifyShort(key)} already registered`);
    }

    this.map.set(key, value);
  }

  unregister(key: Key): Value | undefined {
    if (!this.map.has(key)) {
      return undefined;
    }

    const value = this.map.get(key);
    this.map.delete(key);
    return value;
  }

  keys(): Key[] {
    return Array.from(this.map.keys());
  }

  get(key: Key): Value {
    const value = this.map.get(key);
    if (value === undefined) {
      throw new Error(`${this.name} Key ${stringifyShort(key)} not registered`);
    }
    return value;
  }

  update(key: Key, value: Value): void {
    if (!this.map.has(key)) {
      throw new Error(`${this.name} Key ${stringifyShort(key)} not registered`);
    }
    this.map.set(key, value);
  }

  forEach(callback: (value: Value, key: Key, map: Map<Key, Value>) => void): void {
    this.map.forEach(callback);
  }

  clear(): void {
    this.map.clear();
  }

  [CustomInspectSymbol](depth: number, inspectOptions: unknown, inspect: unknown): string {
    const entries = Array.from(this.map.entries());
    return entries.map(([key, value]) => `${stringifyShort(key)} => ${stringifyShort(value)}`).join('\n');
  }
}
