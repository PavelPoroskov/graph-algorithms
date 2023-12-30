import { MinPQueue } from '../yy-etc/minpqueue.mjs';

export function mstPrim(graph) {
  const visitedVertexSet = new Set();
  const minpqueue = new MinPQueue();
  const parentVertex = {};
  const minWeightToVertex = {};
  
  let startVertex;
  for (let vertex in graph.vertexes) {
    startVertex = vertex;
    break;
  }
  
  minWeightToVertex[startVertex] = 0;
  minpqueue.add(0, startVertex);

  while (!minpqueue.isEmpty()) {
    const { data: currentVertex } = minpqueue.extract();
    // console.log('from queue ', currentVertex);
    // if (visitedVertexSet.has(currentVertex)) {
    //   continue;
    // }
    visitedVertexSet.add(currentVertex);

    for (const neighborVertex of graph.vertexes[currentVertex]) {
      const edgeWeight = graph.edges[currentVertex][neighborVertex];
      
      if (!visitedVertexSet.has(neighborVertex) && (!(neighborVertex in minWeightToVertex)
      || edgeWeight < minWeightToVertex[neighborVertex])) {
        minWeightToVertex[neighborVertex] = edgeWeight;
        parentVertex[neighborVertex] = currentVertex;
        // console.log('    add to queue', neighborVertex,  edgeWeight);
        minpqueue.add(edgeWeight, neighborVertex);
      }
    }
  }

  return Object.entries(parentVertex)
    .map(([vertex,parentVertex]) => [
      parentVertex,
      vertex,
      minWeightToVertex[vertex],
    ]);
}