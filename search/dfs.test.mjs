import assert from 'node:assert/strict';
import test from 'node:test';

import { Graph } from '../create-graph.mjs';
import { dfs } from './dfs.mjs';

test('DFS test', () => {
  const graph = new Graph();
  // me --> myNeighborOne --> neighborOfMyNeighborOne
  //    --> myNeighborTwo
  graph.addDirectedNeighborVertexList('me', ['myNeighborOne', 'myNeighborTwo']);
  graph.addDirectedNeighborVertexList('myNeighborOne', ['neighborOfMyNeighborOne']);

  // console.log('graph');
  // printGraph(graph)
  // console.log('algorithm DFS');
  
  // for (const vertex of dfs({ graph, startVertex: 'me' })) {
  //   console.log(' vertex', vertex)
  // }

  assert.deepEqual(
    Array.from(
      dfs({ graph, startVertex: 'me' }),
    ),
    [
      'me',
      'myNeighborOne',
      'neighborOfMyNeighborOne',
      'myNeighborTwo',
    ],
  )
});