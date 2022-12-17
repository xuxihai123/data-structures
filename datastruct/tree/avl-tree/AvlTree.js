import BinarySearchTree from '../binary-search-tree/BinarySearchTree';

class AvlTree extends BinarySearchTree {
  constructor() {
    super();
    // console.log('create avl tree');
  }
  insert(val) {
    var inserted = this.root.insert(val);
    var current = inserted.parent;
    while (current) {
      if (Math.abs(current.balanceFactor) > 1) {
        this.blanceRoot(current); // 平衡一次就OK
        break;
      }
      current = current.parent;
    }
    return inserted;
  }

  remove(val) {
    var removeNode;
    var self = this;
    return this.root.remove(val, function (removed, parent) {
      removeNode = removed;
      // self.blanceRoot(self.root);
      while (parent) {
        self.blanceRoot(parent); // 需要被删除节点的父节点开始平衡, 回溯到根节点.
        parent = parent.parent;
      }
    });
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

  blanceRoot(node) {
    if (!node) {
      node = this.root;
    }
    var left;
    var right;
    // 左边高了
    if (node.balanceFactor > 1) {
      left = node.left;
      if (left.balanceFactor === 1) {
        this.rightRotate(node);
      } else if (left.balanceFactor === -1) {
        this.leftRotate(left);
        this.rightRotate(node);
      }
    }
    // 右边高了
    if (node.balanceFactor < -1) {
      right = node.right;
      if (right.balanceFactor === 1) {
        this.rightRotate(right);
        this.leftRotate(node);
      } else if (right.balanceFactor === -1) {
        this.leftRotate(node);
      }
    }
  }
}

export default AvlTree;
