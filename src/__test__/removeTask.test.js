import { removeTask, tasks } from './removeTask.js';

describe('cheking: add item and remove item ', () => {
  test('remove task', () => {
    removeTask(1);
    expect(tasks.length).toBe(2);
  });
  test('test local storage', () => {
    // eslint-disable-next-line
        expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  });
});