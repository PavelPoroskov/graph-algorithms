import assert from 'node:assert/strict';
import test from 'node:test';

import { addNeighborVertexList } from '../create-graph.mjs';
import { dijkstra } from './dijkstra.mjs';

test('Shortest path. Dijkstra', () => {
  const graph = {};
  addNeighborVertexList(graph, '0', ['1', '7']);
  addNeighborVertexList(graph, '1', ['2', '7']);
  addNeighborVertexList(graph, '2', ['3', '5', '8']);
  addNeighborVertexList(graph, '3', ['4', '5']);
  addNeighborVertexList(graph, '4', ['5']);
  addNeighborVertexList(graph, '5', ['6']);
  addNeighborVertexList(graph, '6', ['7', '8']);
  addNeighborVertexList(graph, '7', ['8']);

  const result = dijkstra({ graph, startVertex: '0' });

  assert.deepEqual(
    result,
    {
      '0': 0,
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 3,
      '6': 2,
      '7': 1,
      '8': 2,
    },
  )
});
