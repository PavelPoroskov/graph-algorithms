const addEdge = (graph, v1, v2) => {
  if (!graph[v1]) {
    graph[v1] = new Set();
  }

  if (!graph[v2]) {
    graph[v2] = new Set();
  }

  graph[v1].add(v2);
  graph[v2].add(v1);
}

const addDirectedEdge = (graph, v1, v2) => {
  if (!graph[v1]) {
    graph[v1] = new Set();
  }

  if (!graph[v2]) {
    graph[v2] = new Set();
  }

  graph[v1].add(v2);
}

export const addNeighborVertexList = (graph, v1, neighborVertexList) => {
  for (const neighborVertex of neighborVertexList) {
    addEdge(graph, v1, neighborVertex)
  }
}

export const addDirectedNeighborVertexList = (graph, v1, neighborVertexList) => {
  for (const neighborVertex of neighborVertexList) {
    addDirectedEdge(graph, v1, neighborVertex)
  }
}

export const printGraph = (graph) => {
  for (const v in graph) {
    console.log(v, graph[v]);
  }  
}
