/**
 * CodeQuest 2.3 - N03 Map/Filter Pipeline
 */

/**
 * Double tous les nombres d'un tableau
 */
/**
 * CodeQuest 2.3 - N03 Map/Filter Pipeline
 */

/**
 * Double tous les nombres d'un tableau
 */
function doubleNumbers(numbers) {
  return numbers.map(n => n * 2);
}

/**
 * Filtre les nombres pairs
 */
function filterEven(numbers) {
  return numbers.filter(n => n % 2 === 0);
}

/**
 * Pipeline: garde les pairs et les double
 */
function evenDoubled(numbers) {
  return numbers.filter(n => n % 2 === 0).map(n => n * 2);
}

// Simples
function squareNumbers(numbers) {
  return numbers.map(n => n * n);
}

function incrementAll(numbers) {
  return numbers.map(n => n + 1);
}

function onlyPositive(numbers) {
  return numbers.filter(n => n > 0);
}

function onlyStrings(values) {
  return values.filter(v => typeof v === 'string');
}

function lengths(strings) {
  return strings.map(s => s.length);
}

// Faciles
function squareOdds(numbers) {
  return numbers.filter(n => n % 2 !== 0).map(n => n * n);
}

function compact(values) {
  return values.filter(Boolean);
}

function pluck(list, key) {
  return list.map(o => o[key]);
}

function filterByKey(list, key) {
  return list.filter(o => key in o);
}

function tagEvenOdd(numbers) {
  return numbers.map(n => ({ n, type: n % 2 === 0 ? 'even' : 'odd' }));
}

// Moyens
function normalizeEmails(users) {
  return users.map(u => ({ ...u, email: u.email.toLowerCase().trim() }));
}

function uniqueById(list) {
  const seen = new Set();
  return list.filter(u => {
    if (seen.has(u.id)) return false;
    seen.add(u.id);
    return true;
  });
}

function topNByScore(list, n) {
  return [...list]
    .sort((a, b) => b.score - a.score)
    .slice(0, n);
}

function pipelineNormalize(numbers) {
  return numbers
    .filter(v => v !== undefined && !Number.isNaN(Number(v)))
    .map(v => Number(v) * 2);
}

function annotateRank(list) {
  return [...list]
    .sort((a, b) => b.score - a.score)
    .map((item, i) => ({ ...item, rank: i + 1 }));
}

// Complexes
function wordFrequencies(words) {
  const freq = {};
  words.forEach(w => {
    const key = w.toLowerCase();
    freq[key] = (freq[key] || 0) + 1;
  });
  return freq;
}

function windowedMax(numbers, k) {
  return numbers.map((_, i) => {
    if (i + k > numbers.length) return undefined;
    return Math.max(...numbers.slice(i, i + k));
  }).filter(v => v !== undefined);
}

function zipMap(a, b) {
  return a.map((val, i) => ({ a: val, b: b[i] }));
}

function difference(a, b) {
  return a.filter(x => !b.includes(x));
}

function intersection(a, b) {
  return a.filter(x => b.includes(x));
}

module.exports = {
  doubleNumbers,
  filterEven,
  evenDoubled,
  squareNumbers,
  incrementAll,
  onlyPositive,
  onlyStrings,
  lengths,
  squareOdds,
  compact,
  pluck,
  filterByKey,
  tagEvenOdd,
  normalizeEmails,
  uniqueById,
  topNByScore,
  pipelineNormalize,
  annotateRank,
  wordFrequencies,
  windowedMax,
  zipMap,
  difference,
  intersection
};
