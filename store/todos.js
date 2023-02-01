import { uuid } from 'uuidv4';
import { Limit } from '@/constants.js';

export const state = () => ({
  limit: Limit,
  totalTask: 0,
  perPage: 9,
  page: 1,
  totalPage: 1,
  completeRequest: false,
  taskList: [],
  taskListPerPage: [],
  filterOptions: [
    { id: uuid(), title: 'All', status: true },
    { id: uuid(), title: 'Incomplete', status: false },
    { id: uuid(), title: 'Complete', status: false },
  ],
});

export const getters = {
  getTodoList: (state) => {
    return state.taskList;
  },
  getFilterOptions: (state) => {
    return state.filterOptions;
  },
  getCompleteRequest: (state) => {
    return state.completeRequest;
  },
  getListPerPage: (state) => {
    return state.taskListPerPage.slice(0, state.perPage);
  },
  getTotalTask: (state) => {
    return state.taskList.length;
  },
  getTotalPage: (state) => {
    return state.totalPage;
  },
};

export const actions = {
  addTask: ({ state, commit }, val) => {
    commit('addTask', val);
    commit('setListPerPage');
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
  setListPerPage: ({ commit }) => {
    commit('setListPerPage');
  },
  editTask: ({ state, commit }, val, id) => {
    commit('setCompleteRequest', true);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('editTask', val, id);
        commit('setCompleteRequest', false);
        resolve();
      }, 1000);
    });
  },
  increaseLimit: ({ commit }) => {
    commit('increaseLimit');
  },
  resetLimit: ({ commit }) => {
    commit('resetLimit');
  },
  setTotalPage: ({ commit }) => {
    commit('setTotalPage');
  },
  filterTaskList: ({ commit, state }, val) => {
    commit('filterTaskList', val);
  },
};

export const mutations = {
  addTask: (state, val) => {
    const task = {
      id: uuid(),
      done: false,
      description: val,
      completedAt: null,
      createdAt: new Date().toDateString(),
    };

    state.taskList = [task, ...state.taskList];
  },
  setCompleteRequest: (state, val) => {
    state.completeRequest = val;
  },
  setTotalPage: (state, val) => {
    state.totalPage = Math.ceil(state.taskListPerPage.length / state.limit);
  },
  deleteTask: (state, val) => {
    const list = state.taskList;

    state.taskList = list.filter((task) => task.id !== val.id);
  },
  changeTaskState(state, val) {
    const task = state.taskList.find((task) => task.id === val.id);

    task.done = !task.done;
    task.completedAt = new Date();
  },
  editTask(state, val) {
    const task = state.taskList.find((task) => task.id === val.id);

    task.description = val.description;
  },
  increaseLimit(state, val) {
    state.page++;
    state.perPage += state.limit;
  },
  resetLimit(state, val) {
    state.perPage = 9;
    state.page = 1;
  },
  setListPerPage(state, val) {
    state.taskListPerPage = state.taskList;
  },
  filterTaskList(state, val) {
    state.filterOptions.map((option) => (option.status = false));
    const option = state.filterOptions.find((option) => option.id === val.id);

    option.status = true;

    if (val.title === 'All') {
      state.taskListPerPage = state.taskList;

      return;
    }

    if (val.title === 'Incomplete') {
      state.taskListPerPage = state.taskList.filter(
        (task) => task.done === false
      );

      return;
    }

    if (val.title === 'Complete') {
      state.taskListPerPage = state.taskList.filter(
        (task) => task.done === true
      );
    }
  },
};
