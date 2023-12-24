
import { MinPQueue } from './min-p-queue.mjs';

// original dijkstra algorithm uses simple queue (not priority queue)
export function originalDijkstra({ graph, startVertex }) {
  const distances = {};
  const queue = [];
  
  distances[startVertex] = 0;
  queue.push(startVertex);

  while (queue.length > 0) {
    const currentVertex = queue.shift();
    
    for (const neighborVertex of graph.vertexes[currentVertex]) {  
      const newDist = distances[currentVertex] + graph.edges[currentVertex][neighborVertex];

      if ((!(neighborVertex in distances) || newDist < distances[neighborVertex])) {
        distances[neighborVertex] = newDist;
        queue.push(neighborVertex);
      }
    }
  }

  return distances;
}

export function shortestPath({ graph, startVertex, targetVertex }) {
  const distances = {};
  const previous = {};
  const queue = [];
  let isTargetReached = false;
  
  distances[startVertex] = 0;
  queue.push(startVertex);

  while (queue.length > 0) {
    const currentVertex = queue.shift();

    if (currentVertex === targetVertex) {
      isTargetReached = true;
      break;
    }
    
    for (const neighborVertex of graph.vertexes[currentVertex]) {  
      const newDist = distances[currentVertex] + graph.edges[currentVertex][neighborVertex];

      if ((!(neighborVertex in distances) || newDist < distances[neighborVertex])) {
        distances[neighborVertex] = newDist;
        previous[neighborVertex] = currentVertex;
        queue.push(neighborVertex);
      }
    }
  }

  const path = [];
  if (isTargetReached) {
    let currentVertex = targetVertex;
    while (currentVertex) {
      path.push(currentVertex)
      currentVertex = previous[currentVertex]
    }
  }

  return {
    isTargetReached,
    path: path.toReversed(),
  };
}

// optimized version uses priority queue
export function dijkstra({ graph, startVertex }) {
  const visitedVertex = new Set();
  const distances = {};
  distances[startVertex] = 0;

  const pq = new MinPQueue();
  pq.add(
    distances[startVertex],
    startVertex,
  );

  while (!pq.isEmpty()) {
    const { data: currentVertex } = pq.extract();
    
    if (visitedVertex.has(currentVertex)) {
      continue
    }
    visitedVertex.add(currentVertex);

    for (const neighborVertex of graph.vertexes[currentVertex]) {  
      const newDist = distances[currentVertex] + graph.edges[currentVertex][neighborVertex];

      if (!visitedVertex.has(neighborVertex) 
        && (!(neighborVertex in distances) || newDist < distances[neighborVertex])) {
        distances[neighborVertex] = newDist;
        pq.add(distances[neighborVertex], neighborVertex);
      }
    }
  }

  return distances;
}