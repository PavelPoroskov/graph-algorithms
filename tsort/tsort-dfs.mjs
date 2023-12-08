
// no protection from cycled graph
export function tsortDfsM0(graph) {
  const visitedVertex = new Set();
  const resultStack = [];

  function tsortFromVertex(vertex) {
    visitedVertex.add(vertex);

    for (const neighborVertex of graph[vertex]) {
      if (!visitedVertex.has(neighborVertex)) {
        tsortFromVertex(neighborVertex);
      }
    }

    resultStack.push(vertex);
  }

  for (const vertex in graph) {
    if (!visitedVertex.has(vertex)) {
      tsortFromVertex(vertex);
    }
  }

  return resultStack.toReversed();
}

// protection from cycled graph
export function tsortDfs(graph) {
  const visitedVertex = new Set();
  const checkCycles = new Set();
  const resultStack = [];

  function tsortFromVertex(vertex) {
    visitedVertex.add(vertex);
    checkCycles.add(vertex);

    for (const neighborVertex of graph[vertex]) {
      if (!visitedVertex.has(neighborVertex)) {
        tsortFromVertex(neighborVertex);
      } else if (checkCycles.has(neighborVertex)) {
        throw new Error('Graph contains cycle');
      }
    }

    checkCycles.delete(vertex);
    resultStack.push(vertex);
  }

  for (const vertex in graph) {
    if (!visitedVertex.has(vertex)) {
      tsortFromVertex(vertex);
    }
  }

  return resultStack.toReversed();
}
