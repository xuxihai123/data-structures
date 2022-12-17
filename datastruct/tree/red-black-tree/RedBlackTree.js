import BinarySearchTree from '../binary-search-tree/BinarySearchTree';

class RedBlackTree extends BinarySearchTree {
  constructor() {
    super();
  }
  insert(val) {
    var insertNode = this.root.insert(val);
    insertNode.setColor('red');
    this.blanceNode(insertNode);
    return insertNode;
  }
  blanceNode(node) {
    if (node === this.root) {
      node.setColor('black');
      return;
    } else if (node.parent.color === 'black') {
      // 2节点增加一个元素. 3节点增加一个元素, 4节点增加上一个元素， 当父节点是黑色时, 无需调整
      node.setColor('red');
      return;
    } else if (node.uncle && node.uncle.color === 'red') {
      // 叔叔和父亲都是红色
      node.parent.setColor('black');
      node.uncle.setColor('black');
      node.grandparent.setColor('red');
      this.blanceNode(node.grandparent); // 把grandparent当做新插入的节点，重新调整
    } else {
      if (node.parent.right === node && node.grandparent.left === node.parent) {
        this.leftRotate(node.parent);
        node = node.left;
      } else if (node.parent.left === node && node.grandparent.right === node.parent) {
        this.rightRotate(node.parent);
        node = node.right;
      }

      if (node.parent.left === node && node.grandparent.left === node.parent) {
        node.grandparent.setColor('red');
        node.parent.setColor('black');
        this.rightRotate(node.grandparent);
      } else {
        node.grandparent.setColor('red');
        node.parent.setColor('black');
        this.leftRotate(node.grandparent);
      }
    }
  }

  remove(val) {
    throw new Error(`Can't remove ${val}. Remove method is not implemented yet`);
  }

  isNodeColored(node) {
    return node.color === 'red' || node.color === 'black';
  }

  isNodeBlack(node) {
    return node.color === 'black';
  }
  isNodeRed(node) {
    return node.color === 'red';
  }

  // 右旋(对应LL情况)
  rightRotate(unblanceroot) {
    var leftchild = unblanceroot.left;
    // 处理左子树右节点情况
    if (leftchild.right) {
      leftchild.right.parent = unblanceroot;
      unblanceroot.left = leftchild.right;
    } else {
      unblanceroot.left = null;
    }

    if (unblanceroot.parent) {
      unblanceroot.parent.replaceChild(unblanceroot, leftchild);
      leftchild.setRight(unblanceroot);
    } else {
      this.root = leftchild;
      leftchild.setRight(unblanceroot);
      leftchild.parent = null; // 避免出现环, 要不然计算平衡因子时死循环了
    }
  }

  // 左旋, 对应(RR情况)
  leftRotate(unblanceroot) {
    var rightchild = unblanceroot.right;
    if (rightchild.left) {
      rightchild.left.parent = unblanceroot;
      unblanceroot.right = rightchild.left;
    } else {
      unblanceroot.right = null;
    }

    if (unblanceroot.parent) {
      unblanceroot.parent.replaceChild(unblanceroot, rightchild);
      rightchild.setLeft(unblanceroot);
    } else {
      this.root = rightchild;
      rightchild.setLeft(unblanceroot);
      rightchild.parent = null; // 避免出现环, 要不然计算平衡因子时死循环了
    }
  }
}

export default RedBlackTree;
