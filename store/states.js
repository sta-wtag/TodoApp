export const state = () => ({
  task: {
    id: 0,
    done: false,
    description: '',
    createdAt: null,
    completedAt: null,
  },
  taskList: [],
  filteredList: [],
});
