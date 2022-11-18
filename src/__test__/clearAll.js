// eslint-disable-next-line import/no-mutable-exports
export let listObj = [
  {
    description: 'go to swimming',
    completed: true,
    index: 1,
  },
  {
    description: 'play football',
    completed: false,
    index: 2,
  },
  {
    description: 'go to hiking',
    completed: true,
    index: 3,
  },
];

const updateTasks = (data) => {
  listObj = data;
};

export const filteredArr = () => {
  updateTasks(listObj.filter((task) => task.completed === false));
  listObj.forEach((task, i) => {
    task.index = i + 1;
  });
  localStorage.setItem('task', JSON.stringify(listObj));
};