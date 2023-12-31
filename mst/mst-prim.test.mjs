import assert from 'node:assert/strict';
import test from 'node:test';

import { Graph } from '../create-graph.mjs';
import { mstPrim } from './mst-prim.mjs';
import { tsortKahn } from '../tsort/tsort-kahn.mjs';

const tsortMST = (edges) => {
  const graphMST = new Graph();
  
  edges.forEach(([v1,v2]) => {
    graphMST.addDirectedEdge(v1,v2, 4);
  });

  const sortedVertexList = tsortKahn(graphMST);

  const vertexOrderMap = Object.fromEntries(
    sortedVertexList.map((item,index) => [item, index]),
  );

  return edges.toSorted((edge1, edge2) => {
    const firstVertexOrder = vertexOrderMap[edge1[0]] - vertexOrderMap[edge2[0]];

    if (firstVertexOrder === 0) {
      return vertexOrderMap[edge1[1]] - vertexOrderMap[edge2[1]];
    }

    return firstVertexOrder;
  })
}

test('MST: Prim`s algorithm', () => {
  // example graph from https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/
  const graph = new Graph();
  graph.addEdge('0', '1', 4);
  graph.addEdge('0', '7', 8);
  graph.addEdge('1', '2', 8);
  graph.addEdge('1', '7', 11);
  graph.addEdge('2', '3', 7);
  graph.addEdge('2', '5', 4);
  graph.addEdge('2', '8', 2);
  graph.addEdge('3', '4', 9);
  graph.addEdge('3', '5', 14);
  graph.addEdge('4', '5', 10);
  graph.addEdge('5', '6', 2);
  graph.addEdge('6', '7', 1);
  graph.addEdge('6', '8', 6);
  graph.addEdge('7', '8', 7);

  const result = mstPrim(graph);

  assert.deepEqual(
    result,
    [
      [ '0', '1', 4 ],
      [ '5', '2', 4 ],
      [ '2', '3', 7 ],
      [ '3', '4', 9 ],
      [ '6', '5', 2 ], 
      [ '7', '6', 1 ],
      [ '0', '7', 8 ],
      [ '2', '8', 2 ],
    ],
  );

  assert.equal(
    result.reduce((acc, item) => acc + item[2], 0),
    37,
  );

  assert.deepEqual(
    tsortMST(result),
    [
      [ '0', '1', 4 ],
      [ '0', '7', 8 ],
      [ '7', '6', 1 ],
      [ '6', '5', 2 ], 
      [ '5', '2', 4 ],
      [ '2', '3', 7 ],
      [ '2', '8', 2 ],
      [ '3', '4', 9 ],
    ],
  );
});
