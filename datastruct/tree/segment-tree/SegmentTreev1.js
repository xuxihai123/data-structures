class SegmentTree {
  constructor(arr, operateFunc, operateFallbackVal) {
    this.orginalList = arr;
    this.segmentTree = [];
    this.operateFunc = operateFunc || this.defaultOperateFunc;
    this.operateFallbackVal = operateFallbackVal || 0;
    this.initSegmentTree(arr.length);
    this.buildSegmentTree();
    // console.log(this.segmentTree);
  }
  defaultOperateFunc(a, b) {
    return a + b;
  }
  initSegmentTree(listlen) {
    var zeroval = listlen & (listlen - 1);
    var arrlen;
    if (zeroval === 0) {
      arrlen = listlen * 2 - 1;
    } else {
      var powlevel = Math.floor(Math.log2(listlen));
      var nextpowlevel = Math.pow(2, powlevel + 1);
      arrlen = nextpowlevel * 2 - 1;
    }
    // console.log('listlen:', listlen, arrlen);
    this.segmentTree = Array(arrlen).fill(null);
  }
  // 10=8+2, 2^3+2
  buildSegmentTree() {
    var list = this.orginalList;
    var result = this.buildSegmentTreeNode(this.segmentTree, list, 0, 0, list.length - 1);
    this.segmentTree[0] = result;
  }
  buildSegmentTreeNode(tree, arr, index, left, right) {
    // console.log('section:', left, right, ' index:', index);
    if (left === right) {
      tree[index] = arr[left];
      return arr[left];
    }
    var mid = Math.floor((left + right) / 2);
    var leftLeafIdx = 2 * index + 1;
    var rightLeafIdx = 2 * index + 2;
    var leftVal = this.buildSegmentTreeNode(tree, arr, leftLeafIdx, left, mid);
    var rightVal = this.buildSegmentTreeNode(tree, arr, rightLeafIdx, mid + 1, right);
    tree[index] = this.operateFunc(leftVal, rightVal);
    return tree[index];
  }
  update(idx, val) {
    // TODO
  }
  rangeQuery(l, r) {
    // return
    return this.rangeQueryRecv(0, l, r, 0, this.orginalList.length - 1);
  }
  rangeQueryRecv(idx, l, r, start, end) {
    if (start === end) {
      return this.segmentTree[idx];
    }
    if (start > r || end < l) {
      return this.operateFallbackVal;
    }
    if (start >= l && end <= r) {
      return this.segmentTree[idx];
    }
    var mid = Math.floor((start + end) / 2);
    var nextleft = 2 * idx + 1;
    var nextright = 2 * idx + 2;
    var leftvl = this.rangeQueryRecv(nextleft, l, r, start, mid);
    var rightvl = this.rangeQueryRecv(nextright, l, r, mid + 1, end);
    return this.operateFunc(leftvl, rightvl);
  }
}

export default SegmentTree;
