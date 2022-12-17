import BinarySearchTreeNode from './BinarySearchTreeNode';

class BinarySearchTree {
  constructor() {
    this.root = new BinarySearchTreeNode();
    this.left = null;
    this.right = null;
  }

  insert(val) {
    return this.root.insert(val);
  }

  remove(val) {
    return this.root.remove(val);
  }
  contains(val) {
    return this.root.contains(val);
  }
  toString() {
    return this.root.toString();
  }

  toPreOrderString() {
    return this.root.toPreOrderString();
  }

  toPostOrderString() {
    return this.root.toPostOrderString();
  }
}

export default BinarySearchTree;
