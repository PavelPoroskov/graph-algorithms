import assert from 'node:assert/strict';
import test from 'node:test';

import { Graph } from '../create-graph.mjs';
import { mstPrim } from './mst-prim.mjs';

test('MST: Prim`s algorithm', () => {
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
  )
});
