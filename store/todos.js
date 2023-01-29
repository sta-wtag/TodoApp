export const state = () => ({
  limit: 2,
  completeRequest: false,
  taskList: [],
  filteredList: [],
});

export const getters = {
  getTodoList: (state) => {
    return state.taskList;
  },
  getCompleteRequest: (state) => {
    return state.completeRequest;
  },
  getListPerPage: (state) => {
    return state.taskList.slice(0, state.limit);
  },
};

export const actions = {
  addTask: ({ state, commit }, val) => {
    commit('addTask', val);
  },
  deleteTask: ({ state, commit }, val) => {
    commit('setCompleteRequest', true);

    return new Promise((resolve, reject) => {
      // return to the location where is was dispatched after being resolved
      setTimeout(() => {
        commit('deleteTask', val);
        commit('setCompleteRequest', false);
        resolve();
      }, 1000);
    });
  },
  changeTaskState: ({ state, commit }, val) => {
    commit('setCompleteRequest', true);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('changeTaskState', val);
        commit('setCompleteRequest', false);
        resolve();
      }, 1000);
    });
  },
  setCompleteRequest: ({ state, commit }, val) => {
    commit('setCompleteRequest', val);
  },
  editTask: ({ state, commit }, val) => {
    commit('setCompleteRequest', true);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('editTask', val);
        commit('setCompleteRequest', false);
        resolve();
      }, 1000);
    });
  },
  increasePageCount: ({ commit }) => {
    commit('increasePageCount');
  },
};

export const mutations = {
  addTask: (state, val) => {
    state.taskList = [...state.taskList, val];
  },
  setCompleteRequest: (state, val) => {
    state.completeRequest = val;
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
  editTask(state, val) {
    for (let k = 0; k < state.taskList.length; k++) {
      if (state.taskList[k].id === val.id) {
        state.taskList[k].description = val.description;
      }
    }
  },
  increasePageCount(state, val) {
    state.limit += state.limit;
  },
};
