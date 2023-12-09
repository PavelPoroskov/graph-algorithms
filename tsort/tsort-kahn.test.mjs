import assert from 'node:assert/strict';
import test from 'node:test';

import { addDirectedNeighborVertexList } from '../create-graph.mjs';
import { tsortKahn } from './tsort-kahn.mjs';

test('tsort Kahn test', () => {
  const graph = {};
  addDirectedNeighborVertexList(graph, '6', ['3', '1']);
  addDirectedNeighborVertexList(graph, '5', ['1', '2']);
  addDirectedNeighborVertexList(graph, '3', ['4']);
  addDirectedNeighborVertexList(graph, '4', ['2']);

  const result = tsortKahn(graph);

  assert.deepEqual(
    result,
    [ '5', '6', '3', '1', '4', '2' ],
  )
});

test('tsort Kahn. throw if graph contains cycle', () => {
  const graph = {};
  addDirectedNeighborVertexList(graph, '6', ['3', '1']);
  addDirectedNeighborVertexList(graph, '5', ['1', '2']);
  addDirectedNeighborVertexList(graph, '3', ['4']);
  addDirectedNeighborVertexList(graph, '4', ['2', '3']);

  assert.throws(
    () => {
      tsortKahn(graph);
    },
    {
      message: 'Graph contains cycle',
    }
  )
});