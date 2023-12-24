export function tarjan(graph) {
  const sscList = [];
  const sccStack = [];
  const vertexProperties = {};
  let traverseIndex = 1;

  function dfsWithTarjan(vertex) {
    sccStack.push(vertex);
    vertexProperties[vertex] = {
      traverseIndex,
      minReachableTraverseIndex: traverseIndex,
      isInSccStack: true,
    };
    traverseIndex += 1;

    for (const neighborVertex of graph.vertexes[vertex]) {
      if (!vertexProperties[neighborVertex]?.traverseIndex) {
        dfsWithTarjan(neighborVertex);
        vertexProperties[vertex].minReachableTraverseIndex = Math.min(
          vertexProperties[vertex].minReachableTraverseIndex,
          vertexProperties[neighborVertex].minReachableTraverseIndex
        )
      } else if (vertexProperties[neighborVertex].isInSccStack) {
        vertexProperties[vertex].minReachableTraverseIndex = Math.min(
          vertexProperties[vertex].minReachableTraverseIndex,
          vertexProperties[neighborVertex].traverseIndex
        )
      }
    }

    if (vertexProperties[vertex].minReachableTraverseIndex === vertexProperties[vertex].traverseIndex) {
      const component = []
      let node;
      while (node !== vertex) {
        node = sccStack.pop();
        component.push(node);
        vertexProperties[node].isInSccStack = false;
      }
      sscList.push(component);
    }
  }

  for (const vertex in graph.vertexes) {
    if (!vertexProperties[vertex]?.traverseIndex) {
      dfsWithTarjan(vertex);
    }
  }

  return sscList;
}