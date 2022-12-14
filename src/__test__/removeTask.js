import _ from 'lodash';
import 'jest-localstorage-mock';

const listObj = [
  {
    description: 'go to swimming',
    completed: true,
    index: 1,
  },
  {
    description: 'do homework',
    completed: false,
    index: 2,
  },
  {
    description: 'play football',
    completed: true,
    index: 3,
  },

];

const container = document.querySelector('.list');

const populateList = (values) => {
  const sortedlistObj = _.sortBy(values, 'index');
  _.forEach(sortedlistObj, (toDo) => {
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

const removeTask = (i) => {
  listObj.splice(i, 1);
  _.forEach(listObj, (task, i) => {
    task.index = i + 1;
  });
  localStorage.setItem('task', JSON.stringify(listObj));
  container.innerHTML = '';
  populateList(listObj);
};

export { removeTask, listObj };