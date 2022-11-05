import _ from 'lodash';
import './style.css';

function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['', ''], ' ');

  return element;
}

document.body.appendChild(component());

const taskInput = document.querySelector('.task-input input');

const clearAll = document.querySelector('.clear-btn');
const taskBox = document.querySelector('.task-box');

let editId;
let isEditTask = false;
let todos = JSON.parse(localStorage.getItem('todo-list'));

// // filters.forEach((btn) => {
// //   btn.addEventListener('click', () => {
// //     document.querySelector('span.active').classList.remove('active');
// //     btn.classList.add('active');
// //     showTodo(btn.id);
// //   });
// // });

function showTodo(filter) {
  let liTag = '';
  if (todos) {
    todos.forEach((todo, id) => {
      if (filter === todo.status || filter === 'all') {
        liTag += `<li class="task">
                            <label for="${id}">
                                <input onClick="window.updateStatus(this)" type="checkbox" id="${id}" >
                                <p >${todo.name}</p>
                            </label>
                            <div class="settings">
                                <i onClick="window.showMenu(this)" class="uil uil-ellipsis-v"></i>
                                <ul class="task-menu">
                                    <li onClick='window.editTask()'(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                                    <li onClick='window.deleteTask()'(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                                </ul >
                            </div >
                        </li > `;
      }
    });
  }
  taskBox.innerHTML = liTag || '<span>You don\'t have any task here</span>';
}
showTodo('all');

function updateStatus(selectedTask) {
  const taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add('checked');
    todos[selectedTask.id].status = 'completed';
  } else {
    taskName.classList.remove('checked');
    todos[selectedTask.id].status = 'pending';
  }
  localStorage.setItem('todo-list', JSON.stringify(todos));
}

window.updateStatus = updateStatus;

function showMenu(selectedTask) {
  const menuDiv = selectedTask.parentElement.lastElementChild;
  menuDiv.classList.add('show');
  document.addEventListener('click', (e) => {
    if (e.target.tagName !== 'I' || e.target !== selectedTask) {
      menuDiv.classList.remove('show');
    }
  });
}
window.showMenu = showMenu;

function editTask(taskId, textName) {
  editId = taskId;
  isEditTask = true;
  taskInput.value = textName;
  taskInput.focus();
  taskInput.classList.add('active');
}

window.editTask = editTask;

function deleteTask(deleteId, filter) {
  isEditTask = false;
  todos.splice(deleteId, 1);
  localStorage.setItem('todo-list', JSON.stringify(todos));
  showTodo(filter);
}

window.deleteTask = deleteTask;

clearAll.addEventListener('click', () => {
  isEditTask = false;
  todos.splice(0, todos.length);
  localStorage.setItem('todo-list', JSON.stringify(todos));
  showTodo();
});

taskInput.addEventListener('keyup', (e) => {
  const userTask = taskInput.value.trim();
  if (e.key === 'Enter' && userTask) {
    if (!isEditTask) {
      todos = !todos ? [] : todos;
      const taskInfo = { name: userTask, status: 'pending' };
      todos.push(taskInfo);
    } else {
      isEditTask = false;
      todos[editId].name = userTask;
    }
    taskInput.value = '';
    localStorage.setItem('todo-list', JSON.stringify(todos));
    showTodo(document.querySelector('span.active').id);
  }
});
