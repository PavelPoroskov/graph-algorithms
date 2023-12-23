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
