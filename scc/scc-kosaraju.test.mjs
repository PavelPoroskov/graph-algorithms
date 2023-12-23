import assert from 'node:assert/strict';
import test from 'node:test';

import { Graph } from '../create-graph.mjs';
import { kosaraju } from './scc-kosaraju.mjs';

test('Shortest path. Dijkstra with priority queue', () => {
  const graph = new Graph();
  graph.addDirectedNeighborVertexList('1', ['2']);
  graph.addDirectedNeighborVertexList('2', ['3', '4']);
  graph.addDirectedNeighborVertexList('3', ['4', '6']);
  graph.addDirectedNeighborVertexList('4', ['1', '5']);
  graph.addDirectedNeighborVertexList('5', ['6']);
  graph.addDirectedNeighborVertexList('6', ['7']);
  graph.addDirectedNeighborVertexList('7', ['5']);

  const result = kosaraju(graph);

  assert.deepEqual(
    result,
    [
      ['4','2','1','3'],
      ['5','7','6'],
    ],
  )
});
