# Browser KVS

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fniceman114%2Fbrowser-kvs&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)
[![NPM Version](https://img.shields.io/npm/v/browser-kvs.svg?logo=npm)](https://www.npmjs.com/package/browser-kvs)
[![NPM Downloads](https://img.shields.io/npm/dt/browser-kvs?logo=npm)](https://www.npmjs.com/package/browser-kvs)

**Browser KVS** is a versatile key-value store library designed to provide consistent usage across various storage options supported by modern browsers, such as `localStorage` and `sessionStorage`.

## Features

- **Unified API**: Access different browser storage mechanisms through a single interface.
- **Lightweight Dependency**: Uses `is-number` to validate numeric inputs.
- **TypeScript Support**: Includes type definitions for seamless integration in TypeScript projects.
- **Various integration methods Support**
  - Both **ESM(ECMAScript Modules)** and **CJS(CommonJS)**: [Example](https://codesandbox.io/p/sandbox/drst9t)
  - **IIFE(Immediately Invoked Function Expression)**: [Example](https://drst9t.csb.app/browser-kvs.html)

## Installation

```bash
npm install browser-kvs
```

## Examples

### typescript

#### How to access `localStorage` based key value store using BrowserKvs

```ts
import {createLocalStorageStore} from "browser-kvs";

const store = createLocalStorageStore<number>({
  onSaved: (success) => console.log("Default:onSaved", success),
  onLoaded: (value) => console.log("Default:onLoaded", value),
  onRemoved: (value) => console.log("Default:onRemoved", value),
  onCleared: () => console.log("Default:onCleared"),
});

const saved: boolean = store.save("myKey1", 3.14); // "Default:onSaved" true
console.log(saved); // true

const notSaved: boolean = store.save("myKey2", 3/0, (success) => console.log("onSaved", success)); // "onSaved" false
console.log(notSaved); // false

const loaded: number|undefined = store.load("myKey1", (value) => console.log("onLoaded", value)); // "onLoaded" 3.14
console.log(loaded); // 3.14

const removed: number|undefined = store.remove("myKey1"); // "Default:onRemoved" 3.14
console.log(removed); // 3.14

const reloaded: number|undefined = store.load("myKey1"); // "Default:onLoaded" undefined
console.log(reloaded); // undefined

store.clear(); // "Default:onCleared"
```

#### How to access `sessionStorage` based key value store using BrowserKvs

Just change the `createLocalStorageStore` function to the `createSessionStorageStore` function.
<br />
The rest is exactly the same as above.

```ts
import {createSessionStorageStore} from "browser-kvs";

const store = createSessionStorageStore<number>(/* omitted */);
// The rest is the same as the example of localStorage.
```

#### How to access in-memory based key value store using BrowserKvs

Use the `createInMemoryStore` function to create in-memory based key value store.

```ts
import {createInMemoryStore} from "browser-kvs";

const store = createInMemoryStore<number>(/* omitted */);
// The rest is the same as the example of localStorage.
```

### javascript

#### How to use by **ESM(ECMAScript Modules)** or **CJS(CommonJS)**

- See this [Example](https://codesandbox.io/p/sandbox/drst9t)

#### How to use by **IIFE(Immediately Invoked Function Expression)**

- See this [Example](https://drst9t.csb.app/browser-kvs.html)


## APIs

### createInMemoryStore(defaultCallbacks?: object): Store
- Create in-memory based key value store

### createLocalStorageStore(defaultCallbacks?: object): Store
- Create `localStorage` based key value store

### createSessionStorageStore(defaultCallbacks?: object): Store
- Create `sesssionStorage` based key value store

### Store.save(key: string, value: T, callback?: (success: boolean) => void): boolean
- Save a value with key.
- Optionally accepts a callback function.

### Store.load(key: string, callback?: (value: T | undefined) => void): T|undefined
- Retrieve a value by key.
- Optionally accepts a callback function.

### Store.remove(key: string, callback?: (value: T | undefined) => void): T|undefined
- Remove a value by key.
- Optionally accepts a callback function.

### Store.clear(callback?: () => void): void
- Remove all values.
- Optionally accepts a callback function.
