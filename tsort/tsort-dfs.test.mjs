import assert from 'node:assert/strict';
import test from 'node:test';

import { Graph } from '../create-graph.mjs';
import { tsortDfs } from './tsort-dfs.mjs';

test('tsort DFS test', () => {
  const graph = new Graph();
  graph.addDirectedNeighborVertexList('6', ['3', '1']);
  graph.addDirectedNeighborVertexList('5', ['1', '2']);
  graph.addDirectedNeighborVertexList('3', ['4']);
  graph.addDirectedNeighborVertexList('4', ['2']);

  const result = tsortDfs(graph);

  assert.deepEqual(
    result,
    [ '6', '5', '3', '4', '2', '1' ],
  )
});

test('tsort DFS. throw if graph contains cycle', () => {
  const graph = new Graph();
  graph.addDirectedNeighborVertexList('6', ['3', '1']);
  graph.addDirectedNeighborVertexList('5', ['1', '2']);
  graph.addDirectedNeighborVertexList('3', ['4']);
  graph.addDirectedNeighborVertexList('4', ['2', '3']);

  assert.throws(
    () => {
      tsortDfs(graph);
    },
    {
      message: 'Graph contains cycle',
    }
  )
});