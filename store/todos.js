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
  changeTaskState: ({ state, commit }, val) => {
    commit('changeTaskState', val);
  },
};

export const mutations = {
  addTask: (state, val) => {
    state.taskList = [...state.taskList, val];
  },
  deleteTask: (state, val) => {
    const list = state.taskList;

    state.taskList = list.filter((task) => task.id !== val.id);
  },
  changeTaskState(state, val) {
    const list = state.taskList;

    for (let i = 0; i < list.length; i++) {
      if (list[i].id === val.id) {
        list[i].done = !list[i].done;
        list[i].completedAt = new Date();
      }
    }
  },
};
