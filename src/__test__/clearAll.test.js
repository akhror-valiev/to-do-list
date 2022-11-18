import { filteredArr, listObj } from './clearAll.js';

describe('remove all list of the tasks', () => {
  test('remove all completed', () => {
    filteredArr();
    expect(listObj.length).toBe(1);
  });
  test('testing localStorage', () => {
    // eslint-disable-next-line
        expect(Object.keys(localStorage).length).toBe(1);
  });
});