import 'jest-localstorage-mock';
import _ from 'lodash';

export const listObj = [
  {
    description: 'go to swimming',
    completed: true,
    index: 1,
  },
  {
    description: 'paly football',
    completed: false,
    index: 2,
  },
  {
    description: 'go to hiking',
    completed: true,
    index: 3,
  },
];

const container = global.document.querySelector('.list');

const populateList = (values) => {
  const storeValue = _.sortBy(values, 'index');
  _.forEach(storeValue, (toDo) => {
    const htmlText = `
    <li class='item'>
      <input type='checkbox' class='checkbox' id='${toDo.description[0]}${toDo.index
}' ${toDo.completed ? 'checked' : ''}/>
      <div class="inside-div">
        <span contentEditable='true' class='item-description ${toDo.completed ? 'item-description-done' : ''
}'>${toDo.description
}<ion-icon name="trash-outline" class="display-icon trash-icon"></ion-icon></span>
        <ion-icon name='ellipsis-vertical-outline' class='dynamic-icons'></ion-icon>
      </div>
    </li>`;

    container.insertAdjacentHTML('beforeend', htmlText);
  });
};

populateList(listObj);

export const textDesc = [
  ...global.document.querySelectorAll('.item-description'),
];

export const listOfItems = () => {
  listObj[1].description = textDesc[1].textContent;
  localStorage.setItem('task', JSON.stringify(listObj));
  container.innerHTML = '';
  populateList(listObj);
};