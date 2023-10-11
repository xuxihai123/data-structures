
/**
 * |null|10|9|8|7|6...
 * 第一项为空存储
 */

class Heap {
  constructor() {
    this.space = ['INF'];
    if (new.target === Heap) {
      throw Error('cannot to call Heap constructor direct!');
    }
  }
  // 比较两个元素
  pairIsInCorrectOrder(firstEl, secondEl) {
     throw Error('need implement!')
  }
  /**
   * @param {number} childIndex
   * @return {number}
   */
  getParentIndex(childIndex) {
    return Math.floor(childIndex / 2);
  }

  hasLeftChild(parentIndex) {
    var left = parentIndex * 2;
    return !!this.space[left];
  }
  swapElement(index1, index2) {
    var temp = this.space[index1];
    this.space[index1] = this.space[index2];
    this.space[index2] = temp;
  }
  shiftUp(customStartIdx) {
    var currentIndex = customStartIdx === undefined ? this.space.length - 1 : customStartIdx;
    var upIndex = parseInt(currentIndex / 2);
    while (upIndex > 0) {
      if (this.pairIsInCorrectOrder(this.space[upIndex], this.space[currentIndex])) {
        break;
      } else {
        this.swapElement(upIndex, currentIndex);
        currentIndex = upIndex;
        upIndex = parseInt(upIndex / 2);
      }
    }
  }

  shiftDown(customStartIdx) {
    var currentIndex = customStartIdx === undefined ? 1 : customStartIdx;
    var downIndex = currentIndex * 2;
    var extremeIndex;
    var leftval;
    var rightval;
    while (downIndex < this.space.length) {
      leftval = this.space[downIndex];
      if (downIndex + 1 < this.space.length) {
        rightval = this.space[downIndex + 1];
        if (this.pairIsInCorrectOrder(leftval, rightval)) {
          extremeIndex = downIndex;
        } else {
          extremeIndex = downIndex + 1;
        }
      } else {
        extremeIndex = downIndex;
      }
      if (this.pairIsInCorrectOrder(this.space[currentIndex], this.space[extremeIndex])) {
        // done
        break;
      } else {
        this.swapElement(currentIndex, extremeIndex);
        currentIndex = extremeIndex;
        downIndex = currentIndex * 2;
      }
    }
  }

  add(val) {
    this.space.push(val);
    this.shiftUp();
  }

  remove(val) {
    let callback;
    if (typeof val !== 'function') {
      callback = (temp) => temp === val;
    } else {
      callback = val;
    }
    var removeIndex;
    var parentIndex;
    var count = this.find(callback).length;
    for (var i = 0; i < count; i++) {
      // 这样处理是因为上浮和下沉会导致索引发生变化, 但是性能也太差了...
      removeIndex = this.find(callback).pop();
      removeIndex = removeIndex + 1;
      // head top
      if (removeIndex === 1) {
        this.poll();
      } else if (removeIndex === this.space.length - 1) {
        // head last
        this.space.pop();
      } else {
        this.space[removeIndex] = this.space.pop();
        parentIndex = this.getParentIndex(removeIndex);
        if (this.hasLeftChild(parentIndex)) {
          if (this.pairIsInCorrectOrder(this.space[parentIndex], this.space[removeIndex])) {
            // up is ok, check down
            this.shiftDown(removeIndex);
          } else {
            // current remove index value can up float to heap top
            this.shiftUp(removeIndex);
          }
        } else {
          // is last level leaf
          this.shiftUp(removeIndex);
        }
      }
    }

    return this;
  }

  poll() {
    if (this.space.length < 2) {
      return null;
    }
    this.swapElement(1, this.space.length - 1);
    const extreme = this.space.pop();
    this.shiftDown();
    return extreme;
  }

  find(val) {
    let callback;
    if (typeof val !== 'function') {
      callback = (temp) => temp === val;
    } else {
      callback = val;
    }
    var ret = [];
    for (var i = 1; i < this.space.length; i++) {
      if (callback(this.space[i])) {
        ret.push(i - 1);
      }
    }
    return ret;
  }

  peek() {
    return this.space[1] || null;
  }

  isEmpty() {
    return this.size < 2;
  }

  toString() {
    var list = this.space.slice(1);
    return list.join(',');
  }
  get size() {
    return this.space.length;
  }
}

export default Heap;
