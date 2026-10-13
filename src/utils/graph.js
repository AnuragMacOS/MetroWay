export const STATIONS = [
  'New Delhi',
  'Chandni Chowk',
  'Lal Quila',
  'Connaught Place',
  'Karol Bagh',
  'Dwarka',
  'Hauz Khas',
  'Punjabi Bagh',
  'Rajouri Garden',
  'Rohini',
  'Dilshad Garden',
  'Gurugram',
  'Noida',
  'Vaishali',
  'Kashmere Gate',
  'Central Secretariat',
  'AIIMS',
  'Saket',
  'Mandi House',
  'Janakpuri West',
  'Botanical Garden',
  'Kalkaji Mandir',
  'Netaji Subhash Place',
  'Anand Vihar ISBT',
  'IGI Airport',
];

export const EDGES = [
  ['New Delhi', 'Chandni Chowk', 5],
  ['New Delhi', 'Lal Quila', 3],
  ['New Delhi', 'Connaught Place', 2],
  ['Connaught Place', 'Karol Bagh', 4],
  ['Connaught Place', 'Hauz Khas', 7],
  ['Connaught Place', 'Punjabi Bagh', 5],
  ['Karol Bagh', 'Rajouri Garden', 2],
  ['Karol Bagh', 'Rohini', 9],
  ['Hauz Khas', 'Rohini', 6],
  ['Hauz Khas', 'Dwarka', 8],
  ['Rohini', 'Dilshad Garden', 8],
  ['Rohini', 'Gurugram', 7],
  ['Rohini', 'Noida', 9],
  ['Dwarka', 'Gurugram', 3],
  ['Dwarka', 'Noida', 6],
  ['Gurugram', 'Noida', 2],
  ['Noida', 'Vaishali', 3],
  ['Kashmere Gate', 'Chandni Chowk', 2],
  ['Kashmere Gate', 'Netaji Subhash Place', 6],
  ['Kashmere Gate', 'Dilshad Garden', 9],
  ['Netaji Subhash Place', 'Rohini', 5],
  ['Netaji Subhash Place', 'Punjabi Bagh', 4],
  ['Punjabi Bagh', 'Rajouri Garden', 4],
  ['Rajouri Garden', 'Janakpuri West', 5],
  ['Janakpuri West', 'Dwarka', 6],
  ['Dwarka', 'IGI Airport', 4],
  ['New Delhi', 'IGI Airport', 19],
  ['Connaught Place', 'Central Secretariat', 3],
  ['Connaught Place', 'Mandi House', 2],
  ['Mandi House', 'Lal Quila', 4],
  ['Mandi House', 'Anand Vihar ISBT', 8],
  ['Anand Vihar ISBT', 'Vaishali', 3],
  ['Central Secretariat', 'AIIMS', 4],
  ['AIIMS', 'Hauz Khas', 4],
  ['Hauz Khas', 'Saket', 3],
  ['Saket', 'Gurugram', 12],
  ['Hauz Khas', 'Kalkaji Mandir', 6],
  ['Kalkaji Mandir', 'Botanical Garden', 7],
  ['Botanical Garden', 'Noida', 4],
];

const adj = {};
STATIONS.forEach((s) => {
  adj[s] = [];
});

EDGES.forEach(([u, v, dist]) => {
  if (adj[u] && adj[v]) {
    adj[u].push({ node: v, dist });
    adj[v].push({ node: u, dist });
  }
});

export function findShortestPath(source, destination) {
  if (!source || !destination) return null;

  if (source === destination) {
    return {
      path: [source],
      pathString: source,
      distance: 0,
      time: 0,
      cost: 0,
    };
  }

  const dist = {};
  const parent = {};
  const unvisited = new Set(STATIONS);

  STATIONS.forEach((s) => {
    dist[s] = Infinity;
    parent[s] = null;
  });

  dist[source] = 0;

  while (unvisited.size > 0) {
    let current = null;
    let minDist = Infinity;

    for (const node of unvisited) {
      if (dist[node] < minDist) {
        minDist = dist[node];
        current = node;
      }
    }

    if (!current || minDist === Infinity) break;
    if (current === destination) break;

    unvisited.delete(current);

    const neighbors = adj[current] || [];
    for (const nbr of neighbors) {
      if (unvisited.has(nbr.node)) {
        const candidate = dist[current] + nbr.dist;
        if (candidate < dist[nbr.node]) {
          dist[nbr.node] = candidate;
          parent[nbr.node] = current;
        }
      }
    }
  }

  if (dist[destination] === Infinity) {
    return null;
  }

  const path = [];
  let curr = destination;
  while (curr) {
    path.unshift(curr);
    curr = parent[curr];
  }

  const totalDistance = dist[destination];
  const stationHops = Math.max(1, path.length - 1);
  const totalTime = Math.round(totalDistance * 2 + stationHops * 1.5);
  const totalCost = totalDistance;

  return {
    path,
    pathString: path.join(' -> '),
    distance: totalDistance,
    time: totalTime,
    cost: totalCost,
  };
}
