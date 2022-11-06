/* eslint-disable linebreak-style */
import getPositionOfElement from './getElements.js';
// eslint-disable-next-line import/no-cycle
import { task } from './task.js';

export default function draggingDrop() {
  const dragging = document.querySelectorAll('.dragging');

  const container = document.getElementById('list-id');

  function setIndex() {
    const objArr = [...container.querySelectorAll('.dragging')];

    const tempArr = objArr.map((element) => ({
      description: element.children[0].children[1].value,
      completed: element.children[0].children[0].checked,
      index: element.id.substring(
        element.id.indexOf('-') + 1,
        element.id.length,
      ),
    }));
    task.listObj = tempArr;
    task.display();
    task.populateLocalStorage();
  }

  dragging.forEach((drag) => {
    drag.addEventListener('dragstart', () => {
      drag.classList.add('dragging');
      drag.classList.add('dot-menu');
    });
    drag.addEventListener('dragend', () => {
      drag.classList.remove('dragging');
      drag.classList.remove('dot-menu');
      setIndex();
    });
    container.addEventListener('dragover', (e) => {
      const dragging = document.querySelector('.dragging');
      e.preventDefault();
      const detectElement = getPositionOfElement(container, e.clientY);
      if (detectElement !== null) {
        container.insertBefore(dragging, detectElement);
      }
    });
  });
}