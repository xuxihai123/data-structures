import Queue from '../queue/Queue';
class BinaryTreeNode {
  constructor(val) {
    this.parent = null;
    this.left = null; // 左
    this.right = null; // 右
    if (val !== undefined) {
      this.value = val;
    } else {
      this.value = null;
    }
    this.meta = new Map();
  }

  setColor(color) {
    this.meta.set('color', color);
  }

  setLeft(node) {
    if (this.left) {
      this.left.parent = null;
      this.left = node;
    } else {
      this.left = node;
    }
    if (node) {
      node.parent = this;
    }

    return this;
  }
  setRight(node) {
    if (this.right) {
      this.right.parent = null;
      this.right = node;
    } else {
      this.right = node;
    }
    if (node) {
      node.parent = this;
    }
    return this;
  }

  setValue(val) {
    this.value = val;
    return this;
  }

  removeChild(node) {
    if (!node) return false;
    if (this.left && this.left.value === node.value) {
      this.left = null;
      node.parent = null;
      return true;
    }
    if (this.right && this.right.value === node.value) {
      this.right = null;
      node.parent = null;
      return true;
    }
    return false;
  }

  replaceChild(node, newNode) {
    if (!node || !newNode) {
      return false;
    }
    if (this.left && this.left.value === node.value) {
      this.left = newNode;
      newNode.parent = this;
      node.parent = null;
      return true;
    }
    if (this.right && this.right.value === node.value) {
      this.right = newNode;
      newNode.parent = this;
      node.parent = null;
      return true;
    }
    return false;
  }

  static copyNode(sourceNode, targetNode) {
    targetNode.setValue(sourceNode.value);
    targetNode.setLeft(sourceNode.left);
    targetNode.setRight(sourceNode.right);
  }

  traverseInOrder() {
    var result = [];
    this.midOrderTraverse((node) => result.push(node.value));
    return result;
  }

  levelOrderTraverse(callback) {
    var queue = new Queue();
    var root = this;
    var temp;
    queue.enqueue(root);
    while (queue.isEmpty() === false) {
      temp = queue.dequeue();
      callback && callback(temp);
      if (temp.left) {
        queue.enqueue(temp.left);
      }
      if (temp.right) {
        queue.enqueue(temp.right);
      }
    }
  }
  traverse(node, preCallback, midCallback, lastCallback) {
    if (!node) {
      return;
    }
    preCallback && preCallback(node);
    this.traverse(node.left, preCallback, midCallback, lastCallback);
    midCallback && midCallback(node);
    this.traverse(node.right, preCallback, midCallback, lastCallback);
    lastCallback && lastCallback(node);
  }
  preOrderTraverse(callback) {
    return this.traverse(this, callback);
  }
  midOrderTraverse(callback) {
    return this.traverse(this, null, callback);
  }
  postOrderTraverse(callback) {
    return this.traverse(this, null, null, callback);
  }

  get leftHeight() {
    if (!this.left) {
      return 0;
    }
    var left = this.left;
    return left.height + 1;
  }

  get rightHeight() {
    if (!this.right) {
      return 0;
    }

    var right = this.right;
    return right.height + 1;
  }

  get height() {
    return Math.max(this.leftHeight, this.rightHeight);
  }

  get depth() {
    var _current = this;
    var val = 0;
    while (_current) {
      if (!_current.parent) {
        break;
      }
      _current = _current.parent;
      val++;
    }
    return val;
  }

  get uncle() {
    if (!this.grandparent) return undefined;
    if (this.grandparent.left === this.parent) {
      return this.grandparent.right || undefined;
    } else {
      return this.grandparent.left || undefined;
    }
  }

  get balanceFactor() {
    return this.leftHeight - this.rightHeight;
  }

  get color() {
    var col = this.meta.get('color');
    if (col) {
      return col;
    } else {
      return 'black';
    }
  }

  get grandparent() {
    if (this.parent) {
      return this.parent.parent;
    } else {
      return null;
    }
  }

  toString() {
    var result = this.traverseInOrder();
    return result.join(',');
  }

  toPreOrderString() {
    var result = [];
    this.traverse(this, (node) => result.push(node.value));
    return result.join(',');
  }

  toPostOrderString() {
    var result = [];
    this.traverse(this, null, null, (node) => result.push(node.value));
    return result.join(',');
  }
}

export default BinaryTreeNode;
