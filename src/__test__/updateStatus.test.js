import { removeTask, checkBox, listObj } from './updateStatus.js';

describe('testing status of task', () => {
  test('testing status of task', () => {
    checkBox[1].checked = true;
    removeTask();
    expect(listObj[1].completed).toBe(true);
  });
  test('test local storage of task', () => {
    // eslint-disable-next-line
    expect(Object.keys(localStorage).length).toBe(1);
  });
});
