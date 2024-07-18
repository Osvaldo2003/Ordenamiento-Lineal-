export class ArrayModel {
    constructor() {
      this.data = [];
    }
  
    insert(item) {
      this.data.push(item);
    }
  
    search(item) {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i] === item) {
          return i;
        }
      }
      return -1;
    }
  
    getData() {
      return this.data;
    }
  }
  