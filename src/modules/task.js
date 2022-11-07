/* eslint-disable linebreak-style */
import listItem from './listOfItems.js';
// import getPositionOfElement from './getElementPostion.js';
// eslint-disable-next-line import/no-cycle
import dragging from './draggingDrop.js';

export default class TaskList {
  constructor() {
    this.listObj = JSON.parse(localStorage.getItem('Tasks')) || [];
  }

  self = this;

  i = 0;

  add(description, completed = false, index = (this.i += 1)) {
    this.listObj.push({ description, completed, index });
    this.populateLocalStorage();
  }

  findIndex() {
    let k = 0;
    this.listObj.forEach((elem) => {
      k += 1;
      elem.index = k;
    });
  }

  removeTask(checkbox) {
    const checkboxId = checkbox.target;
    if (checkboxId.checked) {
      document
        .getElementById(`label-text ${checkboxId.id}`)
        .classList.add('checked');
      this.listObj[checkboxId.id - 1].completed = true;
    } else {
      document
        .getElementById(`label-text ${checkboxId.id}`)
        .classList.remove('checked');
      this.listObj[checkboxId.id - 1].completed = false;
    }
    this.populateLocalStorage();
  }

  // eslint-disable-next-line class-methods-use-this
  dotMenu(dot) {
    const targetMenu = dot.target;
    const targetParent = targetMenu.parentElement;
    targetParent.classList.add('dot-menu');
    targetParent.children[0].children[1].disabled = false;
    targetParent.children[1].style.display = 'none';
    targetParent.children[3].style.display = 'block';
    targetParent.children[2].style.display = 'block';
  }

  foundMenu(done) {
    const targebtn = done.target;
    const targetParent = targebtn.parentElement;
    targetParent.classList.remove('dot-menu');
    targetParent.children[0].children[1].disabled = true;
    targetParent.children[1].style.display = 'block';
    targetParent.children[3].style.display = 'none';
    targetParent.children[2].style.display = 'none';

    this.listObj.forEach((n) => {
      if (targebtn.id === `done${n.index}`) {
        n.description = targebtn.parentElement.children[0].children[1].value;
      }
    });
    this.populateLocalStorage();
    this.display();
  }

  removeBtn(del) {
    const delBtn = del.target;
    this.listObj.forEach((n) => {
      if (delBtn.id === `del${n.index}`) {
        this.self.listObj.splice(n.index - 1, 1);
      }
    });
    this.findIndex();
    this.populateLocalStorage();
    this.display();
  }

  storeValue(label) {
    const labelId = label.target;
    labelId.addEventListener('keypress', (e) => {
      if (e.code === 'Enter') {
        const parentElem = labelId.parentElement.parentElement;
        parentElem.classList.remove('dot-menu');
        parentElem.children[0].children[1].disabled = true;
        parentElem.children[1].style.display = 'block';
        parentElem.children[3].style.display = 'none';
        parentElem.children[2].style.display = 'none';

        this.listObj.forEach((n) => {
          if (labelId.id === `label-text ${n.index}`) {
            n.description = parentElem.children[0].children[1].value;
          }
        });

        this.populateLocalStorage();
        this.display();
      }
    });
  }

  findElement() {
    if (this.listObj.length > 0) {
      const checkboxes = document.querySelectorAll('.check-box');
      const targetLabel = document.querySelectorAll('.labels');
      const dots = document.querySelectorAll('.vertical-dots');
      const doneBtn = document.querySelectorAll('.done-btn');
      const delBtn = document.querySelectorAll('.delete-btn');

      checkboxes.forEach((box) => {
        box.addEventListener('click', this.removeTask.bind(this));
      });
      targetLabel.forEach((input) => {
        input.addEventListener('click', this.storeValue.bind(this));
      });
      dots.forEach((dot) => {
        dot.addEventListener('click', this.dotMenu.bind(this));
      });
      doneBtn.forEach((done) => {
        done.addEventListener('click', this.foundMenu.bind(this));
      });
      delBtn.forEach((del) => {
        del.addEventListener('click', this.removeBtn.bind(this));
      });
      dragging();
    }
  }

  display() {
    const container = document.getElementById('list-id');
    container.innerHTML = '';
    let j = 0;
    this.listObj.forEach((i) => {
      j += 1;
      container.innerHTML += listItem(j, i.description, i.completed);
    });
    this.findElement();
  }

  populateLocalStorage() {
    const data = JSON.stringify(this.listObj);
    localStorage.setItem('Tasks', data);
  }
}

export const task = new TaskList();
const addTask = document.getElementById('input-form');
const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  task.add(addTask.value);
  form.reset();
  task.findIndex();
  task.populateLocalStorage();
  task.display();
});

const targetClearBtn = document.getElementById('clear-btn');

targetClearBtn.addEventListener('click', () => {
  const filteredArr = task.listObj.filter((x) => x.completed !== false);
  task.listObj = filteredArr;

  task.populateLocalStorage();
  task.display();
});
