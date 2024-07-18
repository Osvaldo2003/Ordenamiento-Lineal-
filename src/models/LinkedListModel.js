class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }
  
  export class LinkedListModel {
    constructor() {
      this.head = null;
    }
  
    insert(item) {
      const newNode = new Node(item);
      if (this.head === null) {
        this.head = newNode;
      } else {
        let current = this.head;
        while (current.next !== null) {
          current = current.next;
        }
        current.next = newNode;
      }
    }
  
    search(item) {
      let current = this.head;
      let index = 0;
      while (current !== null) {
        if (current.data === item) {
          return index;
        }
        current = current.next;
        index++;
      }
      return -1;
    }
  
    toArray() {
      let array = [];
      let current = this.head;
      while (current !== null) {
        array.push(current.data);
        current = current.next;
      }
      return array;
    }
  }
  