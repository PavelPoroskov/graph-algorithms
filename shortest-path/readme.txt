https://medium.com/@rohitverma_87831/key-graph-algorithms-for-problem-solving-28fad4c6e1df#21c9

Dijkstra’s algorithm is a shortest path algorithm used to find the shortest path between a source node and all other nodes in a weighted graph. The algorithm maintains a priority queue of nodes to visit and a set of visited nodes. It starts with the source node and visits its neighbors, updating their distances from the source node. It then selects the node with the smallest distance and repeats the process until all nodes are visited.

https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
  not use visitedVertex
  but not use priority queue

  from using priority queue we can use visitedVertex optimization