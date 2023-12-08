https://medium.com/@rohitverma_87831/key-graph-algorithms-for-problem-solving-28fad4c6e1df#fc1c

Topological sorting is commonly used in 
  job scheduling, 
  task sequencing, and 
  dependency resolution. 

Topological sorting can be performed using DFS or BFS. 
The DFS-based approach involves visiting the nodes in a depth-first manner and keeping track of the finish times of the nodes. The nodes are then sorted in decreasing order of finish time to get the topological ordering. 
The BFS-based approach involves using a queue and maintaining the in-degree of each node. The nodes are processed in a way that the node with zero in-degree is processed first and its adjacent nodes’ in-degree is decremented.

https://www.geeksforgeeks.org/topological-sorting/?ref=lbp

Topological sorting for Directed Acyclic Graph (DAG) is a linear ordering of vertices such that for every directed edge u-v, vertex u comes before v in the ordering.

The first vertex in topological sorting is always a vertex with an in-degree of 0 (a vertex with no incoming edges).

There can be more than one topological sorting for a graph. 