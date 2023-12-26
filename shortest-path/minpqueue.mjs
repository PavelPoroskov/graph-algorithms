export class MinPQueue {
  constructor () {
    this.object = {};
    this.queueSize = 0;
  }
  isEmpty() {
    return this.queueSize < 1;
  }
  add(value, data) {
    if (!this.object[value]) {
      this.object[value] = [];
    }

    this.object[value].push({
      data,
    });
    this.queueSize += 1;
  }
  extract () {
    let firstKey;

    for (const key in this.object) {
      firstKey = key;
      break;
    }

    const { data } = this.object[firstKey].shift();

    if (this.object[firstKey].length === 0) {
      delete this.object[firstKey];
    }

    this.queueSize -= 1;

    return {
      value: +firstKey,
      data,
    }
  }
}