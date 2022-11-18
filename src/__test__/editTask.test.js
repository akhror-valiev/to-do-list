import { textDesc, listOfItems, listObj } from './editTask.js';

describe('test edit task', () => {
  test('edit task', () => {
    textDesc[1].textContent = 'buy milk and bread';
    if (textDesc[1].textContent !== '') {
      listOfItems();
    }
    expect(listObj[1].description).toBe('buy milk and bread');
  });
  test('test edit task in the local storage', () => {
    // eslint-disable-next-line
        expect(Object.keys(localStorage).length).toBe(1);
  });
});