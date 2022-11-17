import 'jest-localstorage-mock';

const inputTask = global.document.querySelector('.input-tasks');

const listObj = [];

class Task {
  constructor(description, completed = false, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

const addNewTask = () => {
  const newTask = new Task(inputTask.value);
  if (listObj.length === 0) newTask.index = 1;
  if (listObj.length > 0) newTask.index = listObj.length + 1;
  listObj.push(newTask);
  localStorage.setItem('task', JSON.stringify(inputTask.value));
  inputTask.value = '';
};

export { addNewTask, listObj, inputTask };
