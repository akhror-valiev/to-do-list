import { removeTask, checkBox, listObj } from './updateStatus.js';

describe('test change state', () => {
  test('should change state', () => {
    checkBox[1].checked = true;
    removeTask();
    expect(listObj[1].completed).toBe(true);
  });
  test('test local storage', () => {
    // eslint-disable-next-line
        expect(Object.keys(localStorage).length).toBe(1);
  });
});