import _ from 'lodash';
import './style.css';

function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['', ''], ' ');

  return element;
}

document.body.appendChild(component());

const data = [
  {
    description: 'make practice of coding',
    completed: true,
    index: 1,
  },
  {
    description: 'go to the swimming',
    completed: false,
    index: 1,
  },
  {
    description: 'online meeting',
    completed: true,
    index: 1,
  },
];
const todoWrapper = document.querySelector('.new-task');
// const newToDo = document.querySelector('.input-text');
// const addToDo = document.querySelector('.btn-add');
// const info = [];

const renderData = () => {
  data.forEach((info) => {
    todoWrapper.innerHTML += `
    <li className="input-li">
                    <label class="input-label" htmlFor="">
<input type="checkbox" />
<p>${info.description}</p>

<i class="fa-solid fa-ellipsis-vertical"></i>
</label>
                </li>
    `;
  });
};

renderData();