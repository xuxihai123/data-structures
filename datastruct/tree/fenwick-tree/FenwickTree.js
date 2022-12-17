class FenwickTree {
  constructor(size) {
    this.treeArray = Array(size + 1).fill(0);
  }

  getLowbit(idx) {
    return idx & (-1 * idx);
  }
  asertIndexOk(index) {
    if (index < 1 || index > this.treeArray.length - 1) {
      throw Error('invalid index.');
    }
  }
  increase(idx, val) {
    this.asertIndexOk(idx);
    var currentIndex = idx;
    var tempbitVal;
    var count = 0;
    while (currentIndex < this.treeArray.length) {
      this.treeArray[currentIndex] += val;
      tempbitVal = this.getLowbit(currentIndex);
      // console.log('tempbitVal1:', tempbitVal);
      currentIndex += tempbitVal;
      count++;
    }
  }

  query(idx) {
    this.asertIndexOk(idx);
    var currentIndex = idx;
    var tempbitVal;
    var sum = 0;
    // 索引从1开始
    while (currentIndex > 0) {
      sum += this.treeArray[currentIndex];
      tempbitVal = this.getLowbit(currentIndex);
      currentIndex -= tempbitVal;
    }
    return sum;
  }

  queryRange(start, end) {
    this.asertIndexOk(start);
    this.asertIndexOk(end);
    if (start > end) {
      throw Error('start must lessthen end index.');
    }
    if (start === end) return this.query(start);
    var endSum = this.query(end);
    var startPreSum = start > 1 ? this.query(start - 1) : 0;
    return endSum - startPreSum;
  }
}

export default FenwickTree;
