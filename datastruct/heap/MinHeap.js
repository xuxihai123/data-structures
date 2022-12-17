import Heap from './Heap';

class MinHeap extends Heap {
  constructor() {
    super();
  }

  pairIsInCorrectOrder(first, second) {
    return first < second;
  }
}

export default MinHeap;
