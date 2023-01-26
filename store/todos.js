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
};

export const mutations = {
  addTask: (state, val) => {
    state.taskList.unshift(val);
  },
};
