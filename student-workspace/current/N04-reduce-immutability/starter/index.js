/**
 * CodeQuest 2.3 - N04 Reduce & Immutability
 */

/**
 * Somme via reduce
 */
function sum(numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}

/**
 * Produit via reduce
 */
function product(numbers) {
  return numbers.reduce((acc, n) => acc * n, 1);
}

/**
 * Compte occurrences d'éléments (immutabilité)
 */
function frequencyMap(values) {
  return values.reduce((acc, v) => {
    return { ...acc, [v]: (acc[v] || 0) + 1 };
  }, {});
}

/**
 * Concatène chaînes avec séparateur via reduce
 */
function joinWith(values, sep = ',') {
  return values.reduce((acc, v, i) => (i === 0 ? v : acc + sep + v), '');
}

// Simples
function minValue(numbers) {
  return numbers.reduce((min, n) => (n < min ? n : min), Infinity);
}

function maxValue(numbers) {
  return numbers.reduce((max, n) => (n > max ? n : max), -Infinity);
}

function countTruthy(values) {
  return values.reduce((count, v) => count + (v ? 1 : 0), 0);
}

function flattenOnce(arrays) {
  return arrays.reduce((acc, arr) => [...acc, ...arr], []);
}

function sumBy(list, key) {
  return list.reduce((acc, obj) => acc + (obj[key] || 0), 0);
}

// Faciles
function groupBy(list, key) {
  return list.reduce((acc, item) => {
    const k = item[key];
    return { ...acc, [k]: [...(acc[k] || []), item] };
  }, {});
}

function unique(numbers) {
  return numbers.reduce((acc, n) => {
    return acc.includes(n) ? acc : [...acc, n];
  }, []);
}

function mapWithReduce(list, fn) {
  return list.reduce((acc, item) => [...acc, fn(item)], []);
}

function filterWithReduce(list, predicate) {
  return list.reduce(
    (acc, item) => (predicate(item) ? [...acc, item] : acc),
    []
  );
}

function partition(list, predicate) {
  return list.reduce(
    (acc, item) =>
      predicate(item)
        ? { ...acc, pass: [...acc.pass, item] }
        : { ...acc, fail: [...acc.fail, item] },
    { pass: [], fail: [] }
  );
}

// Moyens
function compose(...fns) {
  return x => fns.reduceRight((acc, fn) => fn(acc), x);
}

function pipe(...fns) {
  return x => fns.reduce((acc, fn) => fn(acc), x);
}

function dedupeStable(list) {
  return list.reduce(
    (acc, item) => (acc.includes(item) ? acc : [...acc, item]),
    []
  );
}

function runningSum(numbers) {
  return numbers.reduce(
    (acc, n) => [...acc, (acc.length ? acc[acc.length - 1] : 0) + n],
    []
  );
}

function histogram(strings) {
  return strings.reduce((acc, s) => {
    const len = s.length;
    return { ...acc, [len]: (acc[len] || 0) + 1 };
  }, {});
}

// Complexes
function deepFreezeClone(object) {
  if (object && typeof object === 'object') {
    const clone = Array.isArray(object)
      ? object.map(deepFreezeClone)
      : Object.fromEntries(
          Object.entries(object).map(([k, v]) => [k, deepFreezeClone(v)])
        );
    return Object.freeze(clone);
  }
  return object;
}

function deepMerge(objects) {
  return objects.reduce((acc, obj) => {
    return Object.entries(obj).reduce((acc2, [k, v]) => {
      if (
        v &&
        typeof v === 'object' &&
        !Array.isArray(v) &&
        acc2[k] &&
        typeof acc2[k] === 'object'
      ) {
        return { ...acc2, [k]: deepMerge([acc2[k], v]) };
      }
      return { ...acc2, [k]: v };
    }, acc);
  }, {});
}

function diffArrays(a, b) {
  return {
    added: b.filter(x => !a.includes(x)),
    removed: a.filter(x => !b.includes(x)),
    kept: a.filter(x => b.includes(x)),
  };
}

function toCSV(rows) {
  if (rows.length === 0) return '';
  const headers = Object.keys(rows[0]);
  const lines = rows.reduce(
    (acc, row) => [
      ...acc,
      headers.map(h => JSON.stringify(row[h] ?? '')).join(','),
    ],
    [headers.join(',')]
  );
  return lines.join('\n');
}

function indexBy(list, key) {
  return list.reduce((acc, item) => ({ ...acc, [item[key]]: item }), {});
}

module.exports = {
  sum,
  product,
  frequencyMap,
  joinWith,
  minValue,
  maxValue,
  countTruthy,
  flattenOnce,
  sumBy,
  groupBy,
  unique,
  mapWithReduce,
  filterWithReduce,
  partition,
  compose,
  pipe,
  dedupeStable,
  runningSum,
  histogram,
  deepFreezeClone,
  deepMerge,
  diffArrays,
  toCSV,
  indexBy,
};
