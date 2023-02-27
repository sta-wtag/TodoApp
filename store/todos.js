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
  addTask: async ({ state, commit }, val) => {
    commit('addTask', val);
    // set filter option to All
    commit('filterTaskList');
  },
  deleteTask: ({ state, commit }, val) => {
    commit('setCompleteRequest', true);

    return new Promise((resolve, reject) => {
      // return to the location where is was dispatched after being resolved
      setTimeout(() => {
        commit('deleteTask', val);
        commit('setListPerPage');
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
        commit('setListPerPage');
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
  setShowSearchField: ({ commit }, val) => {
    return new Promise((resolve, reject) => {
      commit('setShowSearchField', val);
      resolve();
    });
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
  setTodoList: async ({ commit }) => {
    console.log('fshjfhj');
    commit('setCompleteRequest', true);
    try {
      const { data: todos, error } = await supabase
        .from('Todos')
        .select()
        .order('created_at', { ascending: false });

      if (error) {
        return;
      }

      // handle for when no todos are returned
      if (todos === null) {
        return;
      }

      // store response to allTodos
      await commit('setTodoList', todos);
      await commit('setListPerPage');
      commit('setCompleteRequest', false);
    } catch (err) {}
  },
  filterTaskList: ({ commit, state }, val) => {
    commit('filterTaskList', val);
  },

  setSearchText: ({ commit }, val) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('setSearchText', val);
        resolve();
      }, 500);
    });
  },
  setActiveFilterOption: ({ commit }, val) => {
    commit('setActiveFilterOption', val);
  },
  setIsSearching: ({ commit }, val) => {
    commit('setIsSearching', val);
  },
};

export const mutations = {
  setTodoList: (state, val) => {
    state.taskList = val;
  },
  addTask: (state, val) => {
    state.filterOptions.forEach((element) => (element.status = false));
    state.filterOptions[0].status = true;
    state.taskList = [val, ...state.taskList];
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
    state.perPage = PER_PAGE;
    state.page = 1;
  },
  setListPerPage(state, val) {
    state.taskListPerPage = state.taskList;
  },
  setSearchText(state, val) {
    state.searchText = val;
  },
  setActiveFilterOption(state, val) {
    state.activeFilterOption = val;
  },
  setShowSearchField(state, val) {
    state.showSearchField = val;
  },
  filterTaskList(state) {
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
  setIsSearching: (state, val) => {
    state.isSearching = val;
  },
};
