function isHeap(list, compareFn) {
  var start = 0;
  var downIdx = 1;
  var maxindex;
  var last = parseInt(list.length / 2);
  while (start < last) {
    // console.log('top:', list[start], 'left:', list[downIdx], 'right:', list[downIdx + 1]);

    if (downIdx + 1 < list.length) {
      maxindex = compareFn(list[downIdx], list[downIdx + 1]) ? downIdx : downIdx + 1;
    } else {
      maxindex = downIdx;
    }
    if (compareFn(list[start], list[maxindex])) {
      // is OK to next;
      start++;
      downIdx = start * 2 + 1;
    } else {
      return false;
    }
  }
  return true;
}

function swapEl(list, index1, index2) {
  var temp = list[index1];
  list[index1] = list[index2];
  list[index2] = temp;
}

function shiftDown(list, index, compareFn) {
  var currentIdx = index;
  var maxindex;
  //   console.log('shiftDown:', index);
  while (currentIdx < list.length / 2) {
    var downidx = currentIdx * 2 + 1;
    if (downidx + 1 < list.length) {
      maxindex = compareFn(list[downidx], list[downidx + 1]) ? downidx : downidx + 1;
    } else {
      maxindex = downidx;
    }
    // console.log('shiftDown:', currentIdx, downidx, maxindex);
    if (compareFn(list[currentIdx], list[maxindex])) {
      // is OK
    } else {
      swapEl(list, currentIdx, maxindex);
    }
    currentIdx = maxindex;
  }
}

function buildMaxHeap(list) {
  var newlist = list.slice(0);
  var currentIdx = parseInt((newlist.length - 1) / 2);
  //   var maxIndex;
  while (currentIdx > -1) {
    shiftDown(newlist, currentIdx, (a, b) => a > b);
    // console.log(newlist.join(','));
    currentIdx--;
  }
  //   console.log(list.join(','));
  return newlist;
}

function buildMinHeap(list) {
  var newlist = list.slice(0);
  var currentIdx = parseInt((newlist.length - 1) / 2);
  //   var maxIndex;
  while (currentIdx > -1) {
    shiftDown(newlist, currentIdx, (a, b) => a < b);
    // console.log(newlist.join(','));
    currentIdx--;
  }
  //   console.log(list.join(','));
  return newlist;
}

function isMaxHeap(list) {
  return isHeap(list, (a, b) => a > b);
}

function isMinHeap(list) {
  return isHeap(list, (a, b) => a < b);
}

const result1 = buildMaxHeap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
const result2 = buildMinHeap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

console.log(result1.join(','));
console.log(result2.join(','));
console.log(isMaxHeap(result1));
console.log(isMinHeap(result2));
