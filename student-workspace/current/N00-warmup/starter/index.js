/**
 * N00: System Check & Warm-up
 * Your first CodeQuest challenge!
 */

/**
 * Returns environment information
 */
function getEnvironment() {
  const version = process.version.replace(/^v/, "");
  const major = parseInt(version.split(".")[0], 10);
  return {
    node: process.version,
    platform: process.platform,
    ready: major >= 16
  };
}

/**
 * Creates a welcome message
 */
function warmUp(name = 'Adventurer') {
  return `Welcome ${name} to CodeQuest!`;
}

// ==============================
// Extra: 20 Warm-up mini-défis
// ==============================

// Simples
function greetUpper(name) {
  return `HELLO, ${name}!`;
}

function reverseString(s) {
  return s.split("").reverse().join("");
}

function repeatString(s, n) {
  return s.repeat(n);
}

function parseSemver(version) {
  const [major, minor, patch] = version.replace(/^v/, "").split(".").map(Number);
  return { major, minor, patch };
}

function isNodeGte(required) {
  const [curMaj, curMin, curPatch] = process.version.replace(/^v/, "").split(".").map(Number);
  const [reqMaj, reqMin, reqPatch] = required.replace(/^v/, "").split(".").map(Number);
  if (curMaj !== reqMaj) return curMaj > reqMaj;
  if (curMin !== reqMin) return curMin > reqMin;
  return curPatch >= reqPatch;
}

// Faciles
function sumRange(n) {
  return (n * (n + 1)) / 2;
}

function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
}

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function toKebab(str) {
  return str.trim().replace(/[\s_]+/g, "-").toLowerCase();
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["B", "KB", "MB", "GB", "TB"];
  let i = 0;
  let val = bytes;
  while (val >= 1024 && i < units.length - 1) {
    val /= 1024;
    i++;
  }
  return `${Math.round(val)} ${units[i]}`;
}

// Moyens
function range(start, end, step = 1) {
  const arr = [];
  for (let i = start; i <= end; i += step) arr.push(i);
  return arr;
}

function uniqueSorted(arr) {
  return [...new Set(arr)].sort((a, b) => a - b);
}

function chunkArray(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
  return result;
}

function median(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

// Export
module.exports = {
  getEnvironment,
  warmUp,
  greetUpper,
  reverseString,
  repeatString,
  parseSemver,
  isNodeGte,
  sumRange,
  factorial,
  isPrime,
  toKebab,
  formatBytes,
  range,
  uniqueSorted,
  chunkArray,
  median
};
