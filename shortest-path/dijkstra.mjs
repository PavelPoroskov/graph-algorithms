import { MinPQueue } from './min-p-queue.mjs';

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
    
    // if (currentVertex === targetVertex) {
    //   return
    // }

    if (visitedVertex.has(currentVertex)) {
      continue
    }

    visitedVertex.add(currentVertex);
    const newDist = distances[currentVertex] + 1;

    for (const neighborVertex of graph[currentVertex]) {  
      if (!visitedVertex.has(neighborVertex) 
        && (!(neighborVertex in distances) || newDist < distances[neighborVertex])) {
      // if ((!(neighborVertex in distances) || newDist < distances[neighborVertex])) {
        distances[neighborVertex] = newDist;
        pq.add(distances[neighborVertex], neighborVertex);
      }
    }
  }

  return distances;
}