/**
 * CodeQuest 2.3 - N02 Destructuring & Rest/Spread
 */

/**
 * Extrait la propriété name d'un objet user
 */
function extractName(user) {
  const { name } = user;
  return name;
}

/**
 * Fusionne deux objets, obj2 écrase obj1
 */
function mergeObjects(obj1, obj2) {
  return { ...obj1, ...obj2 };
}

/**
 * Ajoute des valeurs par défaut à config
 * Défauts: { lang: 'en', debug: false }
 */
function setDefault(config) {
  const defaults = { lang: 'en', debug: false };
  return { ...defaults, ...config };
}

// Simples
function firstAndSecond([first, second]) {
  return { first, second };
}

function swapPair([a, b]) {
  return [b, a];
}

function defaultsParams({ mode = 'light', size = 'md' } = {}) {
  return { mode, size };
}

function renameProps({ id: userId, name: fullName }) {
  return { userId, fullName };
}

function restArray([head, ...tail]) {
  return { head, tail };
}

// Faciles
function mergeArrays(a, b) {
  return [...a, ...b];
}

function removeProp(obj, key) {
  const { [key]: _, ...rest } = obj;
  return rest;
}

function pickProps(obj, keys) {
  return keys.reduce((res, key) => {
    if (key in obj) res[key] = obj[key];
    return res;
  }, {});
}

function splitFullName({ firstName, lastName, ...rest }) {
  return { firstName, lastName, rest };
}

function cloneDeepShallow(obj) {
  return { ...obj };
}

// Moyens
function nestedDestructure(user) {
  const { address: { city } = {} } = user;
  return { city };
}

function withIndexMap(arr) {
  return arr.map((value, index) => ({ index, value }));
}

function mergeMany(...objects) {
  return Object.assign({}, ...objects);
}

function arrayToObject(pairs) {
  return Object.fromEntries(pairs);
}

function objectToPairs(obj) {
  return Object.entries(obj);
}

// Complexes
function deepMerge(a, b) {
  const result = { ...a };
  for (const key in b) {
    if (
      b[key] &&
      typeof b[key] === 'object' &&
      !Array.isArray(b[key]) &&
      a[key] &&
      typeof a[key] === 'object'
    ) {
      result[key] = deepMerge(a[key], b[key]);
    } else {
      result[key] = b[key];
    }
  }
  return result;
}

function pluck(list, path) {
  const keys = path.split('.');
  return list.map(item => keys.reduce((obj, k) => (obj ? obj[k] : undefined), item));
}

function partitionByKeys(obj, keys) {
  const picked = {};
  const omitted = {};
  for (const k in obj) {
    if (keys.includes(k)) picked[k] = obj[k];
    else omitted[k] = obj[k];
  }
  return { picked, omitted };
}

function spreadCall(fn, argsArray) {
  return fn(...argsArray);
}

function unzip(pairs) {
  const keys = [];
  const values = [];
  for (const [k, v] of pairs) {
    keys.push(k);
    values.push(v);
  }
  return { keys, values };
}

module.exports = {
  extractName,
  mergeObjects,
  setDefault,
  firstAndSecond,
  swapPair,
  defaultsParams,
  renameProps,
  restArray,
  mergeArrays,
  removeProp,
  pickProps,
  splitFullName,
  cloneDeepShallow,
  nestedDestructure,
  withIndexMap,
  mergeMany,
  arrayToObject,
  objectToPairs,
  deepMerge,
  pluck,
  partitionByKeys,
  spreadCall,
  unzip
};
