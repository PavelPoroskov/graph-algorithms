import assert from 'node:assert/strict';
import test from 'node:test';

import { Graph } from '../create-graph.mjs';
import { tsortKahn } from './tsort-kahn.mjs';

test('tsort Kahn test', () => {
  const graph = new Graph();
  graph.addDirectedNeighborVertexList('6', ['3', '1']);
  graph.addDirectedNeighborVertexList('5', ['1', '2']);
  graph.addDirectedNeighborVertexList('3', ['4']);
  graph.addDirectedNeighborVertexList('4', ['2']);

  const result = tsortKahn(graph);

  assert.deepEqual(
    result,
    [ '5', '6', '3', '1', '4', '2' ],
  )
});

test('tsort Kahn. throw if graph contains cycle', () => {
  const graph = new Graph();
  graph.addDirectedNeighborVertexList('6', ['3', '1']);
  graph.addDirectedNeighborVertexList('5', ['1', '2']);
  graph.addDirectedNeighborVertexList('3', ['4']);
  graph.addDirectedNeighborVertexList('4', ['2', '3']);

  assert.throws(
    () => {
      tsortKahn(graph);
    },
    {
      message: 'Graph contains cycle',
    }
  )
});