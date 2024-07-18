import { Controller } from './controllers/Controller.js';
import { View } from './views/View.js';

document.addEventListener('DOMContentLoaded', () => {
  const view = new View();
  const controller = new Controller(view);

  view.loadDataBtn.addEventListener('click', async () => {
    const file = view.fileInput.files[0];
    if (file) {
      await controller.loadData(file);
    } else {
      view.showMessage("Por favor, selecciona un archivo JSON.");
    }
  });

  view.insertArrayBtn.addEventListener('click', () => {
    const item = view.insertItemInput.value;
    controller.insertIntoArray(item);
  });

  view.insertLinkedListBtn.addEventListener('click', () => {
    const item = view.insertItemInput.value;
    controller.insertIntoLinkedList(item);
  });

  view.searchArrayBtn.addEventListener('click', () => {
    const item = view.searchItemInput.value;
    controller.searchInArray(item);
  });

  view.searchLinkedListBtn.addEventListener('click', () => {
    const item = view.searchItemInput.value;
    controller.searchInLinkedList(item);
  });

  view.bubbleSortBtn.addEventListener('click', () => {
    controller.sortArray('bubble');
  });

  view.mergeSortBtn.addEventListener('click', () => {
    controller.sortArray('merge');
  });

  view.radixSortBtn.addEventListener('click', () => {
    controller.sortArray('radix');
  });
});
