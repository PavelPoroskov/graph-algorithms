export function* dfsr({ graph, startVertex }) {
  if (!startVertex) {
    throw new Error('Undefined start vertex');
  }

  if (!(startVertex in graph)) {
    throw new Error('Start vertex is not in graph');
  }

  const visitedVertex = new Set();

  function* visitVertex(currentVertex) {
    yield currentVertex;
    visitedVertex.add(currentVertex);

    for (const neighborVertex of graph[currentVertex]) {
      if (!visitedVertex.has(neighborVertex)) {
        yield *visitVertex(neighborVertex);
      }
    }
  }

  yield* visitVertex(startVertex)
}
