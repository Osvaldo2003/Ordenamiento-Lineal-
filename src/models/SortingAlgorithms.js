export class SortingAlgorithms {
    static bubbleSort(data) {
      let arr = [...data];
      let iterations = 0;
      const start = performance.now();
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
          iterations++;
          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          }
        }
      }
      const end = performance.now();
      return { sortedArray: arr, iterations, time: (end - start) / 1000 };
    }
  
    static mergeSort(data) {
      let iterations = 0;
      const start = performance.now();
  
      function merge(left, right) {
        let resultArray = [];
        let leftIndex = 0;
        let rightIndex = 0;
  
        while (leftIndex < left.length && rightIndex < right.length) {
          iterations++;
          if (left[leftIndex] < right[rightIndex]) {
            resultArray.push(left[leftIndex]);
            leftIndex++;
          } else {
            resultArray.push(right[rightIndex]);
            rightIndex++;
          }
        }
        return resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
      }
  
      function mergeSortRecursive(arr) {
        if (arr.length <= 1) {
          return arr;
        }
        const middleIndex = Math.floor(arr.length / 2);
        const left = arr.slice(0, middleIndex);
        const right = arr.slice(middleIndex);
        return merge(mergeSortRecursive(left), mergeSortRecursive(right));
      }
  
      let sortedArray = mergeSortRecursive([...data]);
      const end = performance.now();
      return { sortedArray, iterations, time: (end - start) / 1000 };
    }
  
    static radixSort(data) {
      let arr = [...data];
      let iterations = 0;
      const start = performance.now();
  
      const getMax = (arr) => {
        let max = arr[0];
        for (let i = 1; i < arr.length; i++) {
          if (arr[i] > max) {
            max = arr[i];
          }
        }
        return max;
      };
  
      const countingSort = (arr, exp) => {
        let output = new Array(arr.length);
        let count = new Array(10).fill(0);
  
        for (let i = 0; i < arr.length; i++) {
          count[Math.floor(arr[i] / exp) % 10]++;
        }
  
        for (let i = 1; i < 10; i++) {
          count[i] += count[i - 1];
        }
  
        for (let i = arr.length - 1; i >= 0; i--) {
          iterations++;
          output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
          count[Math.floor(arr[i] / exp) % 10]--;
        }
  
        for (let i = 0; i < arr.length; i++) {
          arr[i] = output[i];
        }
      };
  
      let max = getMax(arr);
      for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSort(arr, exp);
      }
  
      const end = performance.now();
      return { sortedArray: arr, iterations, time: (end - start) / 1000 };
    }
  }
  