class DSU {
  constructor(vertexList=[]) {
    this.parent = {};
    this.rank = {};

    for (const v of vertexList) {
      this.parent[v] = v;
      this.rank[v] = 0;
    }
  }

  find(v) {
    if (this.parent[v] != v) {
      this.parent[v] = this.find(this.parent[v]); // Path compression
    }

    return this.parent[v];
  }

  union(x, y) {
    const xRoot = this.find(x);
    const yRoot = this.find(y);

    if (xRoot == yRoot) {
      return;
    }

    // Union by rank
    if (this.rank[xRoot] < this.rank[yRoot]) {
      this.parent[xRoot] = yRoot;
    } else if (this.rank[xRoot] > this.rank[yRoot]) {
      this.parent[yRoot] = xRoot;
    } else {
      this.parent[xRoot] = yRoot;
      this.rank[yRoot]++;
    }
  }
}

export function mstKruskal(graph) {
  const edges = [];

  // undirected. edges must not be duplicated
  for (const fromV in graph.edges) {
    for (const toV in graph.edges[fromV]) {
      edges.push({
        v1: fromV,
        v2: toV,
        weight: graph.edges[fromV][toV],
      });
    }
  }

  edges.sort((edge1, edge2) => edge1.weight - edge2.weight);

  const dsu = new DSU(Object.keys(graph.vertexes));
  const result = [];

  for (const { v1, v2, weight } of edges) {
    const v1Parent = dsu.find(v1);
    const v2Parent = dsu.find(v2);

    // Check if adding this edge will form a cycle
    if (v1Parent != v2Parent) {
      result.push([v1, v2, weight]);
      dsu.union(v1Parent, v2Parent);
    }
  }

  return result;
}