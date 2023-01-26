export const state = () => ({
  taskList: [],
  filteredList: [],
});

export const getters = {
  getTodoList: (state) => {
    return state.taskList;
  },
};

export const actions = {
  addTask: ({ state, commit }, val) => {
    commit('addTask', val);
  },
  deleteTask: ({ state, commit }, val) => {
    commit('deleteTask', val);
  },
};

export const mutations = {
  addTask: (state, val) => {
    state.taskList.unshift(val);
  },
  deleteTask: (state, val) => {
    const list = state.taskList;

    state.taskList = list.filter((task) => task.id !== val.id);
  },
};
