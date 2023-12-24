import { Graph } from '../create-graph.mjs';

function reverseGraph(graph) {
  const reversedGraph = new Graph();

  for (const fromV in graph.edges) {
    for (const toV in graph.edges[fromV]) {
      reversedGraph.addDirectedEdge(toV, fromV);
    }
  }

  return reversedGraph;
}

export function kosaraju(graph) {
  function dfs({ graph, startVertex, visitedVertexSet, visitedVertexList }) {
    const stack = [];
    const wasInStackVertex = new Set(visitedVertexSet);
  
    stack.push(startVertex);
    wasInStackVertex.add(startVertex);
  
    while (stack.length > 0) {
      // visit
      const currentVertex = stack.pop();
      visitedVertexList.push(currentVertex);
      visitedVertexSet.add(currentVertex);
  
      // for (const neighborVertex of graph.vertexes[currentVertex]) {
      // imitate order as for recursion
      for (const neighborVertex of Array.from(graph.vertexes[currentVertex]).toReversed()) {
        if (!wasInStackVertex.has(neighborVertex)) {
          stack.push(neighborVertex);
          wasInStackVertex.add(neighborVertex);
        }
      }
    }
  }

  const visitedVertexDirectStepSet = new Set();
  const visitedVertexDirectStepList = [];

  // Step 1: Perform DFS on the graph and store the nodes in the order of their finishing times
  for (const vertex in graph.vertexes) {
    if (!visitedVertexDirectStepSet.has(vertex)) {    
      dfs({
        graph,
        startVertex: vertex,
        visitedVertexSet: visitedVertexDirectStepSet,
        visitedVertexList: visitedVertexDirectStepList,
      })
    }
  }
  visitedVertexDirectStepSet.clear();

  // Step 2: Reverse the graph
  const reversedGraph = reverseGraph(graph);

  // Step 3: Perform DFS on the reversed graph in the order of the finishing times from Step 1
  const stronglyConnectedComponentList = [];
  const visitedVertexReverseStepSet = new Set();
  
  while (visitedVertexDirectStepList.length > 0) {
    const vertex = visitedVertexDirectStepList.pop();

    if (!visitedVertexReverseStepSet.has(vertex)) {
      const component = [];
      dfs({
        graph: reversedGraph,
        startVertex: vertex,
        visitedVertexSet: visitedVertexReverseStepSet,
        visitedVertexList: component,
      })
      stronglyConnectedComponentList.push(component);
    }
  }

  return stronglyConnectedComponentList;
}