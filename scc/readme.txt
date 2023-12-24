https://medium.com/@rohitverma_87831/key-graph-algorithms-for-problem-solving-28fad4c6e1df#39d0

SCC (Strongly Connected Components) is
  a subset of vertices in a DIRECTED GRAPH where every vertex is reachable from every other vertex in the same subset.
  a group of vertices that have a mutual path to reach each other.

applications in fields
  network analysis,
    to identify clusters of closely connected nodes
  compiler optimization,
    to optimize code by identifying sections of code that can be rearranged or parallelized without changing the program’s behavior.
  database schema design.

The process of identifying SCCs typically involves running a graph traversal algorithm such as Tarjan’s algorithm or Kosaraju’s algorithm. These algorithms work by performing a DFS (depth-first search) on the graph, and keeping track of the strongly connected components as they are identified.

https://www.geeksforgeeks.org/tarjan-algorithm-find-strongly-connected-components/
https://www.geeksforgeeks.org/articulation-points-or-cut-vertices-in-a-graph/

https://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm
Any vertex that is not on a directed cycle forms a strongly connected component all by itself: for example, a vertex whose in-degree or out-degree is 0, or any vertex of an acyclic graph.

dfs
a node remains on the stack after it has been visited if and only if there exists a path in the input graph from it to some node earlier on the stack. In other words, it means that in the DFS a node would be only removed from the stack after all its connected paths have been traversed. When the DFS will backtrack it would remove the nodes on a single path and return to the root in order to start a new path.
