import BinaryTreeNode from '../BinaryTreeNode';

class BinarySearchTreeNode extends BinaryTreeNode {
  constructor(val) {
    super(val);
  }

  /**
   * 插入分4种情况.
   * 1. 当前节点没有初始化， 初始化节点
   * 2. 找到相同节点，返回
   * 3. 找到一个节点，插入的值当前节点比小, if当前节点没有左节点， 则插入左为左节点，else 继续往下找
   * 4. 找到一个节点，插入的值当前节点比大, if当前节点没有右节点， 则插入左为右节点，else 继续往下找
   * @param {*} val
   * @returns
   */
  insert(val) {
    // 当前没有初始化节点值
    if (this.value === null) {
      this.value = val;
      return this;
    }
    var current = this;
    while (current) {
      // 找到相同节点
      if (current.value === val) {
        return current;
      }
      // 在current左边
      if (val < current.value) {
        // 没有左节点
        if (current.left === null) {
          var node = new BinarySearchTreeNode(val);
          current.left = node;
          node.parent = current;
          return node;
        } else {
          // 有左节点， 作为下一个继续
          current = current.left;
        }
      }
      // 在current 右边
      if (val > current.value) {
        // 没有右节点了.
        if (current.right === null) {
          var node = new BinarySearchTreeNode(val);
          current.right = node;
          node.parent = current;
          return node;
        } else {
          // 右节点作为下一个曳光弹
          current = current.right;
        }
      }
    }
  }
  /**
   * 移除节点的情况
   * 1. 无效节点，return
   * 2. 叶子节点，父节点删除该该孩子
   * 3. 存在一个子节点，使用子节点替换当前节点位置。
   * 4. 存在左右节点，找到前驱或后继节点，删除它，然后用前驱或后继节点值换掉当前节点的值
   * @param {*} val
   * @returns
   */
  remove(val, callback) {
    var toRemove = this.find(val);

    if (!toRemove) {
      throw Error('invalid node!');
    }
    var parent = toRemove.parent;

    // 没有子节点
    if (!toRemove.left && !toRemove.right) {
      if (parent) {
        // 解除节点跟父节点间的关系
        parent.removeChild(toRemove);
      } else {
        toRemove.value = null;
      }
    } else if (toRemove.left && toRemove.right) {
      // 存在两个子节点
      // 使用后继节点替换， 后继节点不可能有左节点，因为有左节点，就会继续查找到下一个小值（左值变成新的后继节点)。
      var successor = this.findSuccessor(toRemove);
      // 处理删除后继节点
      if (successor.right) {
        // 后继节点一定含有parent
        successor.parent.replaceChild(successor, successor.right);
        successor.parent = null;
      } else {
        // 前驱和后继节点都是叶子节点， 递归删除
        this.remove(successor.value);
      }
      // 复制值
      toRemove.value = successor.value;
      return true;
    } else {
      // 只有一个子节点
      var child = toRemove.left || toRemove.right;
      if (parent) {
        parent.replaceChild(toRemove, child);
        toRemove.parent = null;
      } else {
        BinaryTreeNode.copyNode(child, toRemove);
      }
    }
    toRemove.parent = null;
    if (callback) {
      callback(toRemove, parent);
    }
    return true;
  }
  contains(val) {
    return !!this.find(val);
  }
  findMin() {
    var current = this;
    while (current.left) {
      current = current.left;
    }
    return current;
  }
  findMax() {
    var current = this;
    while (current.right) {
      current = current.right;
    }
    return current;
  }
  find(val) {
    var current = this;
    while (current) {
      if (val === current.value) {
        return current;
      }

      if (val > current.value) {
        current = current.right;
      } else {
        current = current.left;
      }
    }
    return null;
  }
  /**
   * 前驱为当前节点的左子树往右找最大的那个
   * @param {*} node
   * @returns
   */
  findPrecursor(node) {
    var current = node.left;
    while (current.right) {
      current = current.right;
    }
    return current;
  }
  /**
   * 后继为当前节点的右子树往左找最小的那个
   * @param {*} node
   * @returns
   */
  findSuccessor(node) {
    var current = node.right;
    while (current.left) {
      current = current.left;
    }
    return current;
  }
}

export default BinarySearchTreeNode;
