/**
 * CodeQuest 2.3 - N05 Closures & Modules
 */

/**
 * Compteur via fermeture
 */
function createCounter(start = 0) {
  let count = start;
  return {
    next: () => ++count,
    value: () => count,
  };
}

/**
 * Fabrique de logger silencieux (pas d'I/O): accumulate messages
 */
function createLogger() {
  let messages = [];
  return {
    log: m => {
      messages = [...messages, m];
    },
    get: () => [...messages],
    clear: () => {
      messages = [];
    },
  };
}

/**
 * Module de cache en fermeture
 */
function createCache() {
  let store = {};
  return {
    get: key => store[key],
    set: (key, value) => {
      store = { ...store, [key]: value };
    },
    has: key => key in store,
    size: () => Object.keys(store).length,
  };
}

// Simples
function makeAdder(x) {
  return y => x + y;
}

function once(fn) {
  let called = false;
  let result;
  return (...args) => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}

function throttle(fn, wait) {
  let lastTime = 0;
  let lastResult;
  return (time, ...args) => {
    if (time - lastTime >= wait) {
      lastTime = time;
      lastResult = fn(...args);
    }
    return lastResult;
  };
}

function memoize(fn) {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    if (!(key in cache)) {
      cache[key] = fn(...args);
    }
    return cache[key];
  };
}

function withDefaults(fn, defaults) {
  return (args = {}) => fn({ ...defaults, ...args });
}

// Faciles
function createIdGenerator(prefix = 'id') {
  let n = 0;
  return () => `${prefix}-${n++}`;
}

function tap(value, fn) {
  fn(value);
  return value;
}

function ns(namespace) {
  const store = {};
  return {
    set: (k, v) => {
      store[`${namespace}.${k}`] = v;
      return this;
    },
    get: k => store[`${namespace}.${k}`],
  };
}

function counterModule(start = 0) {
  let count = start;
  return {
    inc: () => ++count,
    dec: () => --count,
    value: () => count,
  };
}

function composeMiddleware(...middlewares) {
  return ctx =>
    middlewares.reduceRight((next, mw) => () => mw(ctx, next), () => {})(ctx);
}

// Moyens
function eventBus() {
  const handlers = {};
  return {
    on: (event, cb) => {
      handlers[event] = [...(handlers[event] || []), cb];
    },
    off: (event, cb) => {
      handlers[event] = (handlers[event] || []).filter(fn => fn !== cb);
    },
    emit: (event, data) => {
      (handlers[event] || []).forEach(fn => fn(data));
    },
  };
}

function scheduler() {
  let tasks = [];
  return {
    add: task => {
      tasks = [...tasks, task];
    },
    tick: () => {
      const [head, ...rest] = tasks;
      tasks = rest;
      return head ? head() : undefined;
    },
  };
}

function retry(fn, maxRetries = 3) {
  return (...args) => {
    let attempts = 0;
    while (attempts < maxRetries) {
      try {
        return fn(...args);
      } catch (e) {
        attempts++;
        if (attempts >= maxRetries) throw e;
      }
    }
  };
}

function circuitBreaker(fn, failureThreshold = 3) {
  let failures = 0;
  let state = 'CLOSED';
  return (...args) => {
    if (state === 'OPEN') throw new Error('Circuit open');
    try {
      const result = fn(...args);
      failures = 0;
      state = 'CLOSED';
      return result;
    } catch (e) {
      failures++;
      if (failures >= failureThreshold) state = 'OPEN';
      throw e;
    }
  };
}

function createStore(initialState) {
  let state = initialState;
  let listeners = [];
  return {
    getState: () => state,
    dispatch: action => {
      state = action(state);
      listeners.forEach(l => l());
    },
    subscribe: fn => {
      listeners = [...listeners, fn];
      return () => {
        listeners = listeners.filter(f => f !== fn);
      };
    },
  };
}

// Complexes
function iocContainer() {
  const registry = {};
  const cache = {};
  return {
    register: (name, factory) => {
      registry[name] = factory;
    },
    resolve: name => {
      if (cache[name]) return cache[name];
      if (!registry[name]) throw new Error(`Not registered: ${name}`);
      cache[name] = registry[name]();
      return cache[name];
    },
  };
}

function moduleLoader(modules) {
  const resolved = {};
  function resolve(name) {
    if (resolved[name]) return resolved[name];
    if (!modules[name]) throw new Error(`Module not found: ${name}`);
    const { deps = [], factory } = modules[name];
    const depInstances = deps.map(resolve);
    resolved[name] = factory(...depInstances);
    return resolved[name];
  }
  return { resolve };
}

function taskQueue(concurrency = 2) {
  let queue = [];
  return {
    add: task => {
      queue = [...queue, task];
    },
    tick: () => {
      const tasks = queue.slice(0, concurrency);
      queue = queue.slice(concurrency);
      return tasks.map(fn => fn());
    },
  };
}

function lruCache(maxSize = 3) {
  let store = new Map();
  return {
    get: key => {
      if (!store.has(key)) return undefined;
      const value = store.get(key);
      store.delete(key);
      store.set(key, value);
      return value;
    },
    set: (key, value) => {
      if (store.has(key)) store.delete(key);
      store.set(key, value);
      if (store.size > maxSize) {
        const firstKey = store.keys().next().value;
        store.delete(firstKey);
      }
    },
    size: () => store.size,
  };
}

function sandbox(env = {}) {
  return expr => {
    const fn = new Function(...Object.keys(env), `return ${expr}`);
    return fn(...Object.values(env));
  };
}

module.exports = {
  createCounter,
  createLogger,
  createCache,
  makeAdder,
  once,
  throttle,
  memoize,
  withDefaults,
  createIdGenerator,
  tap,
  ns,
  counterModule,
  composeMiddleware,
  eventBus,
  scheduler,
  retry,
  circuitBreaker,
  createStore,
  iocContainer,
  moduleLoader,
  taskQueue,
  lruCache,
  sandbox,
};
