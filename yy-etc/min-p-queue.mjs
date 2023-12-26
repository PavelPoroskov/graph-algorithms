export class MinPQueue {
  constructor () {
    this.heapSize = 0;
    this.treeRoot = null;
    this.nodesWithoutChildren = {};
    this.insertOrder = 0;
  }
  isEmpty() {
    return this.heapSize === 0;
  }
  isPriority(nodeA, nodeB) {
    if (nodeA.value < nodeB.value) {
      return true;
    }

    if (nodeA.value === nodeB.value && nodeA.insertOrder < nodeB.insertOrder) {
      return true;
    }

    return false;
  }
  swapNodeValues(nodeA, nodeB) {
    const { value, insertOrder, data } = nodeA;
    nodeA.value = nodeB.value;
    nodeA.insertOrder = nodeB.insertOrder;
    nodeA.data = nodeB.data;
    
    nodeB.value = value;
    nodeB.insertOrder = insertOrder;
    nodeB.data = data;
  }
  add(value,data) {
    this.insertOrder += 1;
    const newNode = {
      value,
      insertOrder: this.insertOrder,
      data,
      // left
      child1: null,
      // right
      child2: null,
      parent: null,
    }
    const indexForNew = this.heapSize;
    const parentIndex = Math.floor((indexForNew - 1) / 2);

    if (0 <= parentIndex) {
      const parentNode = this.nodesWithoutChildren[parentIndex];

      if (indexForNew % 2 == 1) {
        parentNode.child1 = newNode;
      } else {
        parentNode.child2 = newNode;
        delete this.nodesWithoutChildren[parentIndex];
      }
      newNode.parent = parentNode;
    } else {
      this.treeRoot = newNode;
    }

    this.nodesWithoutChildren[indexForNew] = newNode;
    this.heapSize += 1;

    let currentNode = newNode;
    let parentNode = currentNode.parent;
    while (parentNode && this.isPriority(currentNode, parentNode)) { 
      this.swapNodeValues(parentNode, currentNode);      
      currentNode = parentNode;
      parentNode = currentNode.parent;
    }
  }
  minHeapify(node) { 
    let smallest = node; 
    if (node.child1 && this.isPriority(node.child1, node)) { 
      smallest = node.child1; 
    } 
    if (node.child2 && this.isPriority(node.child2, smallest)) { 
      smallest = node.child2;
    } 
    if (smallest !== node) { 
      this.swapNodeValues(node, smallest); 
      this.minHeapify(smallest); 
    } 
  } 
  extract () {
    const { value, data } = this.treeRoot;

    if (this.heapSize == 1) {
      this.treeRoot = null;
      delete this.nodesWithoutChildren[0];
      this.heapSize -= 1;
    } else {
      const lastIndex = this.heapSize - 1;
      const lastNode = this.nodesWithoutChildren[lastIndex];
      this.treeRoot.value = lastNode.value;
      this.treeRoot.data = lastNode.data;

      // delete last node
      const parentNode = lastNode.parent;
      if (lastIndex % 2 == 1) {
        parentNode.child1 = null;
      } else {
        parentNode.child2 = null;
      }  
      const parentIndex = Math.floor((lastIndex - 1) / 2);
      this.nodesWithoutChildren[parentIndex] = parentNode;

      delete this.nodesWithoutChildren[lastIndex];
      this.heapSize -= 1;
      

      this.minHeapify(this.treeRoot);
    }

    return {
      value,
      data,
    }
  }
  peek() {
    return {
      value: this.treeRoot.value,
      data: this.treeRoot.data,
    };
  }
}