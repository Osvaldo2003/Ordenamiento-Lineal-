import { ArrayModel } from '../models/ArrayModel.js';
import { LinkedListModel } from '../models/LinkedListModel.js';
import { SortingAlgorithms } from '../models/SortingAlgorithms.js';

export class Controller {
  constructor(view) {
    this.view = view;
    this.arrayModel = new ArrayModel();
    this.linkedListModel = new LinkedListModel();
    this.sortingAlgorithms = SortingAlgorithms;
    this.sortTimes = {};
    this.searchTimes = {};
  }

  async loadData(file) {
    this.view.showMessage("Cargando datos...", this.view.loadDataBtn);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = JSON.parse(e.target.result);
      await this.insertDataAsync(data);
      this.view.showMessage("Carga de datos correctamente", this.view.loadDataBtn);
      setTimeout(() => {
        this.view.resetButton(this.view.loadDataBtn, 'Cargar datos');
      }, 3000);
    };
    reader.readAsText(file);
  }

  async insertDataAsync(data) {
    for (let item of data) {
      this.arrayModel.insert(item);
      this.linkedListModel.insert(item);
    }
  }

  insertIntoArray(item) {
    this.view.showMessage("Insertando en Array...", this.view.insertArrayBtn);
    const start = performance.now();
    this.arrayModel.insert(item);
    const end = performance.now();
    this.view.displayInsertTime('array', (end - start) / 1000);
    this.view.showMessage("Insertar en Array", this.view.insertArrayBtn);
  }

  insertIntoLinkedList(item) {
    this.view.showMessage("Insertando en LinkedList...", this.view.insertLinkedListBtn);
    const start = performance.now();
    this.linkedListModel.insert(item);
    const end = performance.now();
    this.view.displayInsertTime('linkedlist', (end - start) / 1000);
    this.view.showMessage("Insertar en LinkedList", this.view.insertLinkedListBtn);
  }

  searchInArray(item) {
    this.view.showMessage("Buscando en Array...", this.view.searchArrayBtn);
    const start = performance.now();
    this.arrayModel.search(item);
    const end = performance.now();
    this.view.displaySearchTime('array', (end - start) / 1000);
    this.view.showMessage("Buscar en Array", this.view.searchArrayBtn);
  }

  searchInLinkedList(item) {
    this.view.showMessage("Buscando en LinkedList...", this.view.searchLinkedListBtn);
    const start = performance.now();
    this.linkedListModel.search(item);
    const end = performance.now();
    this.view.displaySearchTime('linkedlist', (end - start) / 1000);
    this.view.showMessage("Buscar en LinkedList", this.view.searchLinkedListBtn);
  }

  sortArray(algorithm) {
    const element = document.getElementById(`${algorithm}SortBtn`);
    this.view.showMessage(`Ordenando con ${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort...`, element);
    const array = this.arrayModel.getData();

    setTimeout(() => {
      let result;
      let searchTime;
      switch (algorithm) {
        case 'bubble':
          result = this.sortingAlgorithms.bubbleSort(array);
          break;
        case 'merge':
          result = this.sortingAlgorithms.mergeSort(array);
          break;
        case 'radix':
          result = this.sortingAlgorithms.radixSort(array);
          break;
      }
      const searchStart = performance.now();
      this.arrayModel.search(array[0]);
      const searchEnd = performance.now();
      searchTime = (searchEnd - searchStart) / 1000;

      this.sortTimes[algorithm] = result.time;
      this.searchTimes[algorithm] = searchTime;

      this.view.displaySortTime(result.time, result.iterations);
      this.view.updateChart(result.time, searchTime, algorithm);
      this.view.resetButton(element, `Ordenar con ${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort`);
    }, 0);
  }
}
