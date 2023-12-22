export function* bfs({ graph, startVertex }) {
  if (!startVertex) {
    throw new Error('Undefined start vertex');
  }

  if (!(startVertex in graph.vertexes)) {
    throw new Error('Start vertex is not in graph');
  }

  const queue = [];
  const wasInQueueVertex = new Set();

  // queue -> visit -> (vertex.neighbors -> queue)
  queue.push(startVertex);
  wasInQueueVertex.add(startVertex);

  while (queue.length > 0) {
    // visit
    const currentVertex = queue.shift();
    yield currentVertex;

    for (const neighborVertex of graph.vertexes[currentVertex]) {
      if (!wasInQueueVertex.has(neighborVertex)) {
        queue.push(neighborVertex);
        wasInQueueVertex.add(neighborVertex);
      }
    }
  }
}
