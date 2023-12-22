export class Graph {
  constructor() {
    this.vertexes = {};
    this.edges = {};
  }

  addEdge(v1, v2, edgeWeight=1) {
    if (!this.vertexes[v1]) {
      this.vertexes[v1] = new Set();
    }
  
    if (!this.vertexes[v2]) {
      this.vertexes[v2] = new Set();
    }
  
    this.vertexes[v1].add(v2);
    this.vertexes[v2].add(v1);

    if (!this.edges[v1]) {
      this.edges[v1] = {};
    }
  
    if (!this.edges[v2]) {
      this.edges[v2] = {};
    }

    this.edges[v1][v2] = edgeWeight;
    this.edges[v2][v1] = edgeWeight;
  }

  addDirectedEdge(v1, v2, edgeWeight=1) {
    if (!this.vertexes[v1]) {
      this.vertexes[v1] = new Set();
    }
  
    if (!this.vertexes[v2]) {
      this.vertexes[v2] = new Set();
    }
  
    this.vertexes[v1].add(v2);

    if (!this.edges[v1]) {
      this.edges[v1] = {};
    }
  
    this.edges[v1][v2] = edgeWeight;
  }

  addNeighborVertexList(v1, neighborVertexList) {
    for (const neighborVertex of neighborVertexList) {
      this.addEdge(v1, neighborVertex)
    }
  }

  addDirectedNeighborVertexList(v1, neighborVertexList) {
    for (const neighborVertex of neighborVertexList) {
      this.addDirectedEdge(v1, neighborVertex)
    }
  }

  printGraph() {
    for (const v in this.vertexes) {
      console.log(v, this.vertexes[v]);
    }  
  }
}
