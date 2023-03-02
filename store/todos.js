import { uuid } from 'uuidv4';

import {
  LIMIT,
  COMPLETE_TASK,
  ALL_TASK,
  INCOMPLETE_TASK,
  PER_PAGE,
} from '../constants';

export const state = () => ({
  limit: LIMIT,
  totalTask: 0,
  perPage: PER_PAGE,
  page: 1,
  totalPage: 1,
  completeRequest: false,
  taskList: [],
  taskListPerPage: [],
  searchText: '',
  isSearching: false,
  showSearchField: false,
  filterOptions: [
    { id: uuid(), title: 'All', status: false },
    { id: uuid(), title: 'Incomplete', status: false },
    { id: uuid(), title: 'Complete', status: false },
  ],
  activeFilterOption: null,
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
  getActiveFilterOption: (state) => {
    return state.activeFilterOption;
  },
  getIsSearching: (state) => {
    return state.isSearching;
  },
  getShowSearchField(state) {
    return state.showSearchField;
  },
};

export const actions = {
  // AddTask Operation

  addTask: ({ state, commit }, val) => {
    commit('addTask', val);
    // set filter option to All
    commit('filterTaskList');
  },

  // DeleteTask Operation

  deleteTask: ({ state, commit }, val) => {
    commit('setCompleteRequest', true);

    return new Promise((resolve, reject) => {
      // return to the location where is was dispatched after being resolved
      setTimeout(() => {
        commit('deleteTask', val);
        commit('filterTaskList');
        commit('setTotalPage'); // total page changes after deleting task
        commit('setCompleteRequest', false);
        resolve();
      }, 1000);
    });
  },

  // Mark Task Done Operation

  changeTaskState: ({ state, commit }, val) => {
    commit('setCompleteRequest', true);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('changeTaskState', val);
        commit('filterTaskList');
        commit('setCompleteRequest', false);
        resolve();
      }, 1000);
    });
  },

  // Managing loading state

  setCompleteRequest: ({ state, commit }, val) => {
    commit('setCompleteRequest', val);
  },

  // Managing search  state

  setShowSearchField: ({ commit }, val) => {
    commit('setShowSearchField', val);
  },

  setIsSearching: ({ commit }, val) => {
    commit('setIsSearching', val);
  },

  // Edit Task Operation

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

  // manage pagination

  increaseLimit: ({ commit }) => {
    commit('increaseLimit');
  },

  resetLimit: ({ commit }) => {
    commit('resetLimit');
  },

  setTotalPage: ({ commit }) => {
    commit('setTotalPage');
  },

  // filter task operation

  filterTaskList: ({ commit, state }, val) => {
    commit('filterTaskList', val);
  },

  // Search Input set

  setSearchText: ({ commit }, val) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('setSearchText', val);
        resolve();
      }, 500);
    });
  },

  // set filter state

  setActiveFilterOption: ({ commit }, val) => {
    commit('setActiveFilterOption', val);
  },
};

export const mutations = {
  // AddTask Operation
  addTask: (state, val) => {
    const task = {
      id: uuid(),
      done: false,
      description: val,
      completedAt: null,
      createdAt: new Date(),
    };

    state.filterOptions.forEach((element) => (element.status = false));
    state.filterOptions[0].status = true;
    state.activeFilterOption = state.filterOptions[0];
    state.taskList = [task, ...state.taskList];
  },

  // Managing loading state

  setCompleteRequest: (state, val) => {
    state.completeRequest = val;
  },

  // DeleteTask Operation

  deleteTask: (state, val) => {
    return new Promise((resolve, reject) => {
      const list = state.taskList;

      state.taskList = list.filter((task) => task.id !== val.id);
      resolve();
    });
  },

  // Mark task done

  changeTaskState(state, val) {
    return new Promise((resolve, reject) => {
      const task = state.taskList.find((task) => task.id === val.id);

      task.done = !task.done;
      task.completedAt = new Date();
      resolve();
    });
  },

  // EditTask Operation

  editTask(state, val) {
    return new Promise((resolve, reject) => {
      const task = state.taskList.find((task) => task.id === val.id);

      task.description = val.description;
      resolve();
    });
  },

  // manage pagination

  setTotalPage: (state, val) => {
    state.totalPage = Math.ceil(state.taskListPerPage.length / state.limit);
  },
  increaseLimit(state, val) {
    state.page++;
    state.perPage += state.limit;
  },
  resetLimit(state, val) {
    state.perPage = PER_PAGE;
    state.page = 1;
  },

  // Search Input set

  setSearchText(state, val) {
    state.searchText = val;
  },

  // set filter state

  setActiveFilterOption(state, val) {
    state.activeFilterOption = val;
  },

  // filter task operation

  filterTaskList(state) {
    state.taskListPerPage = state.taskList;
    state.filterOptions.map((option) => (option.status = false));
    const option = state.filterOptions.find(
      (option) => option.id === state.activeFilterOption.id
    );

    option.status = true;

    if (state.activeFilterOption.title === ALL_TASK) {
      state.taskListPerPage = state.taskList.filter((task) =>
        task.description.toLowerCase().includes(state.searchText.toLowerCase())
      );

      return;
    }

    if (state.activeFilterOption.title === INCOMPLETE_TASK) {
      state.taskListPerPage = state.taskList.filter(
        (task) =>
          task.done === false &&
          task.description
            .toLowerCase()
            .includes(state.searchText.toLowerCase())
      );

      return;
    }

    if (state.activeFilterOption.title === COMPLETE_TASK) {
      state.taskListPerPage = state.taskList.filter(
        (task) =>
          task.done === true &&
          task.description
            .toLowerCase()
            .includes(state.searchText.toLowerCase())
      );
    }
  },

  // Managing search  state

  setIsSearching: (state, val) => {
    state.isSearching = val;
  },

  setShowSearchField(state, val) {
    state.showSearchField = val;
  },
};
