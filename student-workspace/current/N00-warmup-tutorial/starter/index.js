/**
 * CodeQuest 2.3 - N00 Warmup Tutorial
 */

// ==============================
// N00 Warmup - Strings
// ==============================

function ping(message) {
  return `pong: ${message}`;
}

// Simples
function echoUpper(s) {
  return s.toUpperCase();
}

function trimAndPing(s) {
  return `pong: ${s.trim()}`;
}

function prefix(s, p = '>> ') {
  return `${p}${s}`;
}

function suffix(s, suf = ' <<') {
  return `${s}${suf}`;
}

function surround(s, left = '[', right = ']') {
  return `${left}${s}${right}`;
}

// Faciles
function countWords(s) {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

function maskEmail(email) {
  const [user, domain] = email.split('@');
  return `${user[0]}***@${domain}`;
}

function kebab(str) {
  return str.trim().replace(/[\s_]+/g, '-').toLowerCase();
}

function snake(str) {
  return str.trim().replace(/[\s-]+/g, '_').toLowerCase();
}

function capitalizeWords(str) {
  return str.replace(/\b\w/g, c => c.toUpperCase());
}

// Moyens
function wrapAt(s, width) {
  const words = s.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    if ((current + ' ' + word).trim().length > width) {
      lines.push(current.trim());
      current = word;
    } else {
      current += ' ' + word;
    }
  }
  if (current) lines.push(current.trim());
  return lines;
}

function parseQuery(query) {
  return Object.fromEntries(
    query.replace(/^\?/, '').split('&').map(pair => pair.split('='))
  );
}

function serializeQuery(obj) {
  return (
    '?' +
    Object.entries(obj)
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join('&')
  );
}

function stripAnsi(s) {
  return s.replace(/\x1b\[[0-9;]*m/g, '');
}

function isAnagram(a, b) {
  const normalize = str => str.replace(/\s+/g, '').toLowerCase().split('').sort().join('');
  return normalize(a) === normalize(b);
}

// Complexes
function wrapMarkdownCodeBlocks(md) {
  return md.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
}

function highlightKeyword(s, kw) {
  const re = new RegExp(`(${kw})`, 'gi');
  return s.replace(re, '**$1**');
}

function justifyText(s, width) {
  const lines = s.split('\n').map(line => line.trim());
  const justified = lines.map(line => {
    const words = line.split(/\s+/);
    if (words.length === 1) return words[0];
    let spaces = width - words.join('').length;
    const gaps = words.length - 1;
    const spacesPerGap = Math.floor(spaces / gaps);
    const extra = spaces % gaps;
    return words.map((w, i) => {
      if (i === words.length - 1) return w;
      return w + ' '.repeat(spacesPerGap + (i < extra ? 1 : 0));
    }).join('');
  });
  return justified.join('\n');
}

function diffStrings(a, b) {
  // simple diff: return array of operations ['keep', 'insert', 'delete']
  const ops = [];
  const la = a.split('');
  const lb = b.split('');
  let i = 0, j = 0;
  while (i < la.length || j < lb.length) {
    if (la[i] === lb[j]) {
      ops.push({ op: 'keep', char: la[i] });
      i++; j++;
    } else if (lb[j] && !la.includes(lb[j])) {
      ops.push({ op: 'insert', char: lb[j] });
      j++;
    } else if (la[i]) {
      ops.push({ op: 'delete', char: la[i] });
      i++;
    } else {
      j++;
    }
  }
  return ops;
}

function slugifyWithStopwords(s, stopwords = ['the','a','of']) {
  return s
    .toLowerCase()
    .split(/\W+/)
    .filter(word => word && !stopwords.includes(word))
    .join('-');
}

// Export
module.exports = {
  ping,
  echoUpper,
  trimAndPing,
  prefix,
  suffix,
  surround,
  countWords,
  maskEmail,
  kebab,
  snake,
  capitalizeWords,
  wrapAt,
  parseQuery,
  serializeQuery,
  stripAnsi,
  isAnagram,
  wrapMarkdownCodeBlocks,
  highlightKeyword,
  justifyText,
  diffStrings,
  slugifyWithStopwords
};
