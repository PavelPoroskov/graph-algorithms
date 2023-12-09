export function tsortKahn(graph) {
  const result = [];
  const inDegree = {};
  const queue = [];

  // calculate in-degrees of all vertices
  for (const vertex in graph) {
    inDegree[vertex] = inDegree[vertex] || 0;

    for (const neighborVertex of graph[vertex]) {
      inDegree[neighborVertex] = (inDegree[neighborVertex] || 0) + 1;
    }
  }

  // add all vertices with in-degree 0 to the queue
  for (const vertex in inDegree) {
    if (inDegree[vertex] == 0) {
      queue.push(vertex);
    }
  }

  // perform topological sort
  while (queue.length > 0) {
    const currentVertex = queue.shift();
    result.push(currentVertex);

    // decrement in-degree of all adjacent vertices
    for (const neighborVertex of graph[currentVertex]) {
      inDegree[neighborVertex] = inDegree[neighborVertex] - 1;

      if (inDegree[neighborVertex] == 0) {
        queue.push(neighborVertex);
      }
    }
  }

  if (result.length < Object.keys(inDegree).length) {
    throw new Error('Graph contains cycle');
  }

  return result;
}
