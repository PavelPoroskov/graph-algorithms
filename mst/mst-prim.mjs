import { MinPQueue } from '../yy-etc/minpqueue.mjs';

export function mstPrim(graph) {
  // {
  //   'V': {
  //     minWeightToVertex
  //     parentVertex
  //     ?visited
  //   }
  // }
  const vertexData = {};
  const minpqueue = new MinPQueue();  
  
  let startVertex;
  for (let vertex in graph.vertexes) {
    startVertex = vertex;
    break;
  }
  
  vertexData[startVertex] = {};
  vertexData[startVertex].minWeightToVertex = 0,

  minpqueue.add(0, startVertex);

  while (!minpqueue.isEmpty()) {
    const { data: currentVertex } = minpqueue.extract();
    vertexData[currentVertex].isInTree = true;

    for (const neighborVertex of graph.vertexes[currentVertex]) {
      if (vertexData[neighborVertex]?.isInTree) {
        continue
      }
      
      const edgeWeight = graph.edges[currentVertex][neighborVertex];
      const curMinWeightToNextVertex = vertexData[neighborVertex]?.minWeightToVertex;
      
      if (curMinWeightToNextVertex === undefined || edgeWeight < curMinWeightToNextVertex) {

        vertexData[neighborVertex] = vertexData[neighborVertex] || {};
        vertexData[neighborVertex].minWeightToVertex = edgeWeight;
        vertexData[neighborVertex].parentVertex = currentVertex;

        minpqueue.add(edgeWeight, neighborVertex);
      }
    }
  }

  return Object.entries(vertexData)
    .filter(([ , { parentVertex }]) => !!parentVertex)
    .map(([vertex, { parentVertex, minWeightToVertex }]) => [
      parentVertex,
      vertex,
      minWeightToVertex,
    ]);
}