import { uuid } from 'uuidv4';
import { LIMIT, PER_PAGE } from '@/constants.js';

export const state = () => ({
  limit: LIMIT,
  totalTask: 0,
  perPage: PER_PAGE,
  page: 1,
  totalPage: 1,
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
    return state.taskList.slice(0, state.perPage);
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
  setTotalPage: (state, _val) => {
    state.totalPage = Math.ceil(state.taskList.length / state.limit);
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
    state.perPage = PER_PAGE;
    state.page = 1;
  },
};
