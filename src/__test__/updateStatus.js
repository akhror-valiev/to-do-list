import _ from 'lodash';
import 'jest-localstorage-mock';

export const listObj = [
  {
    description: 'go to swimm',
    completed: false,
    index: 1,
  },
  {
    description: 'play football',
    completed: false,
    index: 2,
  },
  {
    description: 'go to hiking',
    completed: false,
    index: 3,
  },
];

export const container = global.document.querySelector('.list');

const populateList = (values) => {
  const storeValue = _.sortBy(values, 'index');
  _.forEach(storeValue, (toDo) => {
    const htmlText = `
    <li class='item'>
      <input type='checkbox' class='checkbox' id='${toDo.description[0]}${
  toDo.index
}' ${toDo.completed ? 'checked' : ''}/>
      <div class="inside-div">
        <span contentEditable='true' class='item-description ${
  toDo.completed ? 'item-description-done' : ''
}'>${
  toDo.description
}<ion-icon name="trash-outline" class="display-icon trash-icon"></ion-icon></span>
        <ion-icon name='ellipsis-vertical-outline' class='dynamic-icons'></ion-icon>
      </div>
    </li>`;

    container.insertAdjacentHTML('beforeend', htmlText);
  });
};

populateList(listObj);
const check = [...global.document.querySelectorAll('.checkbox')];

export const removeTask = () => {
  listObj[1].completed = check[1].checked;
  localStorage.setItem('task', JSON.stringify(listObj));
  const itemDesc = Array.from(
    global.document.querySelectorAll('.item-description'),
  );
  // eslint-disable-next-line
  if ((listObj[1].completed = check[1].checked)) {
    itemDesc[1].classList.add('label-text');
  } else {
    itemDesc[1].classList.remove('label-text');
    itemDesc[1].contentEditable = 'true';
  }
  populateList(listObj);
};

export const checkBox = [...document.querySelectorAll('.checkbox')];
