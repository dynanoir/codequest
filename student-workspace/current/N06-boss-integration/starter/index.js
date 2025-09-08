/**
 * CodeQuest 2.3 - N06 Boss Integration
 */

// Fonction principale
function generateScoreboard(players) {
  return players
    .map(p => ({ name: p.name, total: p.score + p.bonus }))
    .sort((a, b) => b.total - a.total)
    .map((p, i) => ({ rank: i + 1, name: p.name, total: p.total }));
}

// Simples
function computeTotals(players) {
  return players.map(p => ({ name: p.name, total: p.score + p.bonus }));
}

function sortByTotalDesc(entries) {
  return [...entries].sort((a, b) => b.total - a.total);
}

function addRanks(sorted) {
  return sorted.map((p, i) => ({ rank: i + 1, ...p }));
}

function top3(sorted) {
  return sorted.slice(0, 3);
}

function formatScoreboard(entries) {
  return entries.map(({ rank, name, total }) => ({ rank, name, total }));
}

// Faciles
function validatePlayers(players) {
  return players.filter(
    p => typeof p.score === "number" && typeof p.bonus === "number"
  );
}

function normalizeNames(players) {
  return players.map(p => {
    const name = p.name.trim();
    return { ...p, name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() };
  });
}

function mergeDuplicatesByName(players) {
  const map = {};
  for (const p of players) {
    if (!map[p.name]) {
      map[p.name] = { ...p };
    } else {
      map[p.name].score += p.score;
      map[p.name].bonus += p.bonus;
    }
  }
  return Object.values(map);
}

function withAverage(players) {
  return players.map(p => ({ ...p, avg: (p.score + p.bonus) / 2 }));
}

function annotateTier(entries) {
  return entries.map(p => {
    let tier = "C";
    if (p.total >= 200) tier = "S";
    else if (p.total >= 150) tier = "A";
    else if (p.total >= 100) tier = "B";
    return { ...p, tier };
  });
}

// Moyens
function paginate(entries, page = 1, perPage = 10) {
  const start = (page - 1) * perPage;
  return entries.slice(start, start + perPage);
}

function searchByName(entries, q) {
  const lower = q.toLowerCase();
  return entries.filter(p => p.name.toLowerCase().includes(lower));
}

function computeStats(entries) {
  if (entries.length === 0) return { count: 0, min: 0, max: 0, avg: 0 };
  const totals = entries.map(e => e.total);
  const count = totals.length;
  const min = Math.min(...totals);
  const max = Math.max(...totals);
  const avg = totals.reduce((a, b) => a + b, 0) / count;
  return { count, min, max, avg };
}

function rankWithTies(sorted) {
  let lastTotal = null;
  let lastRank = 0;
  return sorted.map((p, i) => {
    if (p.total !== lastTotal) {
      lastRank = i + 1;
      lastTotal = p.total;
    }
    return { ...p, rank: lastRank };
  });
}

function formatTable(entries) {
  return entries
    .map(e => `${e.rank.toString().padEnd(3)} ${e.name.padEnd(10)} ${e.total}`)
    .join("\n");
}

// Complexes
function pipeline(players) {
  return annotateTier(
    addRanks(
      sortByTotalDesc(
        computeTotals(
          mergeDuplicatesByName(normalizeNames(validatePlayers(players)))
        )
      )
    )
  );
}

function leaderboardDiff(oldBoard, newBoard) {
  const mapOld = Object.fromEntries(oldBoard.map(e => [e.name, e.rank]));
  return newBoard.map(e => {
    const from = mapOld[e.name] ?? null;
    const to = e.rank;
    return { name: e.name, from, to, delta: from ? from - to : 0 };
  });
}

function bucketize(entries) {
  return entries.reduce((acc, e) => {
    acc[e.tier] = acc[e.tier] || [];
    acc[e.tier].push(e);
    return acc;
  }, {});
}

function topNPerTier(entries, n = 3) {
  const buckets = bucketize(entries);
  for (const tier in buckets) {
    buckets[tier] = buckets[tier].slice(0, n);
  }
  return buckets;
}

function serializeCSV(entries) {
  if (entries.length === 0) return "";
  const headers = Object.keys(entries[0]);
  const rows = entries.map(e => headers.map(h => e[h]).join(","));
  return [headers.join(","), ...rows].join("\n");
}

module.exports = {
  generateScoreboard,
  computeTotals,
  sortByTotalDesc,
  addRanks,
  top3,
  formatScoreboard,
  validatePlayers,
  normalizeNames,
  mergeDuplicatesByName,
  withAverage,
  annotateTier,
  paginate,
  searchByName,
  computeStats,
  rankWithTies,
  formatTable,
  pipeline,
  leaderboardDiff,
  bucketize,
  topNPerTier,
  serializeCSV,
};