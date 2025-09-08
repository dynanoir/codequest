/**
 * CodeQuest 2.3 - N01 Pure Functions
 * 
 * Mission: Implémenter 3 fonctions pures sans effets de bord
 * 
 * Règles des fonctions pures:
 * 1. Même entrée → Même sortie (déterministe)
 * 2. Aucun effet de bord (pas de console.log, mutations, etc.)
 */

/**
 * Additionne deux nombres
 * @param {number} a - Premier nombre
 * @param {number} b - Deuxième nombre  
 * @returns {number} - Somme de a et b
 */
function add(a, b) {
  return a + b;
}

/**
 * Vérifie si un nombre est pair
 */
function isEven(n) {
  return n % 2 === 0;
}

/**
 * Calcule la somme de tous les éléments d'un tableau
 */
function sum(arr) {
  return arr.reduce((acc, val) => acc + val, 0);
}

// Simples
function negate(n) {
  return -n;
}

function maxOfTwo(a, b) {
  return a >= b ? a : b;
}

// Faciles
function clamp(n, min, max) {
  return n < min ? min : n > max ? max : n;
}

function average(arr) {
  return arr.length === 0 ? 0 : sum(arr) / arr.length;
}

function countOccurrences(arr, value) {
  return arr.filter(v => v === value).length;
}

function isPalindrome(str) {
  const s = str.replace(/\s+/g, '').toLowerCase();
  return s === s.split('').reverse().join('');
}

function sumUnique(arr) {
  return sum([...new Set(arr)]);
}

// Moyens
function unique(arr) {
  return [...new Set(arr)];
}

function pick(object, keys) {
  return keys.reduce((acc, key) => {
    if (key in object) acc[key] = object[key];
    return acc;
  }, {});
}

function omit(object, keys) {
  return Object.keys(object).reduce((acc, key) => {
    if (!keys.includes(key)) acc[key] = object[key];
    return acc;
  }, {});
}

function compose2(f, g) {
  return x => f(g(x));
}

function toKebabCase(str) {
  return str
    .replace(/[_\s]+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
}

// Complexes
function quickSort(arr) {
  if (arr.length <= 1) return [...arr];
  const [pivot, ...rest] = arr;
  return [
    ...quickSort(rest.filter(x => x < pivot)),
    pivot,
    ...quickSort(rest.filter(x => x >= pivot))
  ];
}

function memoizeUnary(fn) {
  const cache = {};
  return arg => {
    const key = JSON.stringify(arg);
    if (!(key in cache)) cache[key] = fn(arg);
    return cache[key];
  };
}

function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a && b && typeof a === 'object') {
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    if (Array.isArray(a)) {
      if (a.length !== b.length) return false;
      return a.every((v, i) => deepEqual(v, b[i]));
    } else {
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);
      if (keysA.length !== keysB.length) return false;
      return keysA.every(k => deepEqual(a[k], b[k]));
    }
  }
  return false;
}

function pipe(...fns) {
  return x => fns.reduce((v, f) => f(v), x);
}

function chunk(arr, size) {
  const res = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

module.exports = {
  add,
  isEven,
  sum,
  negate,
  maxOfTwo,
  clamp,
  average,
  countOccurrences,
  isPalindrome,
  sumUnique,
  unique,
  pick,
  omit,
  compose2,
  toKebabCase,
  quickSort,
  memoizeUnary,
  deepEqual,
  pipe,
  chunk
};