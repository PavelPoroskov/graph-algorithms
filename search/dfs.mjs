
export function* dfs({ graph, startVertex }) {
  if (!startVertex) {
    throw new Error('Undefined start vertex');
  }

  if (!(startVertex in graph.vertexes)) {
    throw new Error('Start vertex is not in graph');
  }

  const stack = [];
  const wasInStackVertex = new Set();

  stack.push(startVertex);
  wasInStackVertex.add(startVertex);

  while (stack.length > 0) {
    // visit
    const currentVertex = stack.pop();
    yield currentVertex;

    // for (const neighborVertex of graph.vertexes[currentVertex]) {
    // imitate order as for recursion
    for (const neighborVertex of Array.from(graph.vertexes[currentVertex]).toReversed()) {
      if (!wasInStackVertex.has(neighborVertex)) {
        stack.push(neighborVertex);
        wasInStackVertex.add(neighborVertex);
      }
    }
  }
}
