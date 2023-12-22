import assert from 'node:assert/strict';
import test from 'node:test';

import { Graph } from '../create-graph.mjs';
import { originalDijkstra, dijkstra, shortestPath } from './dijkstra.mjs';

test('Shortest path. Dijkstra with priority queue', () => {
  const graph = new Graph();
  graph.addNeighborVertexList('0', ['1', '7']);
  graph.addNeighborVertexList('1', ['2', '7']);
  graph.addNeighborVertexList('2', ['3', '5', '8']);
  graph.addNeighborVertexList('3', ['4', '5']);
  graph.addNeighborVertexList('4', ['5']);
  graph.addNeighborVertexList('5', ['6']);
  graph.addNeighborVertexList('6', ['7', '8']);
  graph.addNeighborVertexList('7', ['8']);

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

test('Shortest path. Dijkstra original (without priority )', () => {
  const graph = new Graph();
  graph.addNeighborVertexList('0', ['1', '7']);
  graph.addNeighborVertexList('1', ['2', '7']);
  graph.addNeighborVertexList('2', ['3', '5', '8']);
  graph.addNeighborVertexList('3', ['4', '5']);
  graph.addNeighborVertexList('4', ['5']);
  graph.addNeighborVertexList('5', ['6']);
  graph.addNeighborVertexList('6', ['7', '8']);
  graph.addNeighborVertexList('7', ['8']);

  const result = originalDijkstra({ graph, startVertex: '0' });

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

test('Shortest path.', () => {
  const graph = new Graph();
  graph.addNeighborVertexList('0', ['1', '7']);
  graph.addNeighborVertexList('1', ['2', '7']);
  graph.addNeighborVertexList('2', ['3', '5', '8']);
  graph.addNeighborVertexList('3', ['4', '5']);
  graph.addNeighborVertexList('4', ['5']);
  graph.addNeighborVertexList('5', ['6']);
  graph.addNeighborVertexList('6', ['7', '8']);
  graph.addNeighborVertexList('7', ['8']);

  const { path: result0to4 } = shortestPath({ graph, startVertex: '0', targetVertex: '4' });
  assert.deepEqual(
    result0to4,
    ['0','1','2','3','4'],
  )

  const { path: result0to5 }= shortestPath({ graph, startVertex: '0', targetVertex: '5' });

  assert.deepEqual(
    result0to5,
    ['0','1','2','5'],
  )
});
