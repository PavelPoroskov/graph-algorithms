import assert from 'node:assert/strict';
import test from 'node:test';

import { Graph } from '../create-graph.mjs';
import { mstKruskal } from './mst-kruskal.mjs';

test('MST: Kruskal`s algorithm', () => {
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

  const result = mstKruskal(graph);

  assert.deepEqual(
    result,
    [
      [ '6', '7', 1 ], 
      [ '2', '8', 2 ], 
      [ '5', '6', 2 ], 
      [ '0', '1', 4 ], 
      [ '2', '5', 4 ], 
      [ '2', '3', 7 ], 
      [ '0', '7', 8 ], 
      [ '3', '4', 9 ],
    ],
  );

  assert.equal(
    result.reduce((acc, item) => acc + item[2], 0),
    37,
  );

  const normalizeEdges = (edges) => edges
    .map(([v1, v2, weight]) => [...([v1,v2].sort()), weight])
    .sort((edge1, edge2) => edge1[0].localeCompare(edge2[0]) || edge1[1].localeCompare(edge2[1]));

  assert.deepEqual(
    normalizeEdges(result),
    [
      [ '0', '1', 4 ],
      [ '0', '7', 8 ],
      [ '2', '3', 7 ], 
      [ '2', '5', 4 ],
      [ '2', '8', 2 ], 
      [ '3', '4', 9 ], 
      [ '5', '6', 2 ],
      [ '6', '7', 1 ],
    ],
  );
});
