import assert from 'node:assert/strict';
import test from 'node:test';

import { addDirectedNeighborVertexList, printGraph } from '../create-graph.mjs';
import { bfs } from './bfs.mjs';
// TODO we do not know size of the graph
// TODO generate random graph

test('BFS test', (t) => {
  const graph = {};
  // me --> myNeighborOne --> neighborOfMyNeighborOne
  //    --> myNeighborTwo
  addDirectedNeighborVertexList(graph, 'me', ['myNeighborOne', 'myNeighborTwo']);
  addDirectedNeighborVertexList(graph, 'myNeighborOne', ['neighborOfMyNeighborOne']);

  // console.log('graph');
  // printGraph(graph)
  // console.log('algorithm BFS');
  
  // for (const vertex of bfs({ graph, startVertex: 'me' })) {
  //   console.log(' vertex', vertex)
  // }

  assert.deepEqual(
    Array.from(
      bfs({ graph, startVertex: 'me' }),
    ),
    [
      'me',
      'myNeighborOne',
      'myNeighborTwo',
      'neighborOfMyNeighborOne',
    ],
  )
});


