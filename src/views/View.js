export class View {
  constructor() {
    this.fileInput = document.getElementById('fileInput');
    this.loadDataBtn = document.getElementById('loadDataBtn');
    this.insertArrayBtn = document.getElementById('insertArrayBtn');
    this.insertLinkedListBtn = document.getElementById('insertLinkedListBtn');
    this.searchArrayBtn = document.getElementById('searchArrayBtn');
    this.searchLinkedListBtn = document.getElementById('searchLinkedListBtn');
    this.bubbleSortBtn = document.getElementById('bubbleSortBtn');
    this.mergeSortBtn = document.getElementById('mergeSortBtn');
    this.radixSortBtn = document.getElementById('radixSortBtn');

    this.insertItemInput = document.getElementById('insertItem');
    this.searchItemInput = document.getElementById('searchItem');

    this.arrayInsertTime = document.getElementById('arrayInsertTime');
    this.linkedListInsertTime = document.getElementById('linkedListInsertTime');
    this.arraySearchTime = document.getElementById('arraySearchTime');
    this.linkedListSearchTime = document.getElementById('linkedListSearchTime');
    this.sortTime = document.getElementById('sortTime');

    this.chartContext = document.getElementById('sortChart').getContext('2d');
    this.chart = new Chart(this.chartContext, {
      type: 'bar',
      data: {
        labels: ['Bubble Sort', 'Merge Sort', 'Radix Sort'],
        datasets: [
          {
            label: 'Tiempo de Ordenamiento (s)',
            data: [0, 0, 0],
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
            borderWidth: 1
          },
          {
            label: 'Tiempo de Búsqueda (s)',
            data: [0, 0, 0],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  formatTime(seconds) {
    return `${seconds.toFixed(4)}s`;
  }

  displayInsertTime(structure, time) {
    if (structure === 'array') {
      this.arrayInsertTime.textContent = `Tiempo de inserción en Array: ${this.formatTime(time)}`;
    } else {
      this.linkedListInsertTime.textContent = `Tiempo de inserción en LinkedList: ${this.formatTime(time)}`;
    }
  }

  displaySearchTime(structure, time) {
    if (structure === 'array') {
      this.arraySearchTime.textContent = `Tiempo de búsqueda en Array: ${this.formatTime(time)}`;
    } else {
      this.linkedListSearchTime.textContent = `Tiempo de búsqueda en LinkedList: ${this.formatTime(time)}`;
    }
  }

  displaySortTime(time, iterations) {
    this.sortTime.textContent = `Tiempo de ordenamiento: ${this.formatTime(time)}, Iteraciones: ${iterations}`;
  }

  updateChart(sortTime, searchTime, algorithm) {
    let sortIndex;
    switch (algorithm) {
      case 'bubble':
        sortIndex = 0;
        break;
      case 'merge':
        sortIndex = 1;
        break;
      case 'radix':
        sortIndex = 2;
        break;
    }
    this.chart.data.datasets[0].data = [0, 0, 0];
    this.chart.data.datasets[0].data[sortIndex] = sortTime;
    this.chart.data.datasets[1].data = [0, 0, 0];
    this.chart.data.datasets[1].data[sortIndex] = searchTime;
    this.chart.update();
  }

  showMessage(message, element) {
    element.textContent = message;
    element.style.backgroundColor = 'green';
    element.style.color = 'white';
    element.disabled = true;
  }

  resetButton(element, originalText) {
    element.textContent = originalText;
    element.style.backgroundColor = '';
    element.style.color = '';
    element.disabled = false;
  }
}
