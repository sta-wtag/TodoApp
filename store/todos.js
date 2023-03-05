import { v4 as uuidv4 } from 'uuid';
import {
  LIMIT,
  COMPLETE_TASK,
  ALL_TASK,
  INCOMPLETE_TASK,
  PER_PAGE,
} from '@/constants';
import Database from '@/helpers/database';

const database = new Database();
const supabase = database.supabase;

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
    { id: uuidv4(), title: 'All', status: false },
    { id: uuidv4(), title: 'Incomplete', status: false },
    { id: uuidv4(), title: 'Complete', status: false },
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

  addTask: async ({ state, commit }, val) => {
    commit('setIsSearching', true);
    try {
      const task = {
        status: false,
        description: val,
        completed_at: null,
        created_at: new Date(),
      };
      const { error } = await supabase.from('Todos').insert(task).single();

      if (error) {
        return { success: false };
      }

      commit('resetFilter');

      commit('filterTaskList');
      commit('setIsSearching', false);

      return { success: true };
    } catch (err) {
      throw new Error(err);
    }
  },

  // DeleteTask Operation

  deleteTask: async ({ state, commit }, val) => {
    try {
      const { error } = await supabase.from('Todos').delete().eq('id', val.id);

      if (error) {
        return { success: false };
      }

      // store response to allTodos
      commit('filterTaskList');

      return { success: true };
    } catch (err) {
      throw new Error(err);
    }
  },

  // Mark Task Done Operation

  changeTaskState: async ({ state, commit, dispatch }, val) => {
    dispatch('setCompleteRequest', true);

    try {
      const { data: todo, error } = await supabase
        .from('Todos')
        .update({ status: !val.status, completed_at: new Date() })
        .eq('id', val.id)
        .select()
        .single();

      if (error) {
        return { success: false };
      }

      // store response to allTodos
      dispatch('filterTaskList');

      dispatch('setCompleteRequest', false);

      return { success: true, data: todo };
    } catch (err) {
      throw new Error(err);
    }
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

  editTask: async ({ state, commit }, val, id) => {
    commit('setCompleteRequest', true);
    try {
      const { data: todo, error } = await supabase
        .from('Todos')
        .update({ description: val.description })
        .eq('id', val.id)
        .select()
        .single();

      if (error) {
        return { success: false, data: todo };
      }

      // store response to allTodos
      commit('filterTaskList');
      commit('setCompleteRequest', false);

      return { success: true, data: todo };
    } catch (err) {
      throw new Error(err);
    }
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
  resetFilter: ({ commit }) => {
    commit('resetFilter');
  },
  // set filter state

  setActiveFilterOption: ({ commit }, val) => {
    commit('setActiveFilterOption', val);
  },
  setTodoList: async ({ commit }) => {
    try {
      const { data: todos, error } = await supabase
        .from('Todos')
        .select()
        .order('id', { ascending: false });

      if (error) {
        return { success: false };
      }

      // handle for when no todos are returned
      if (todos === null) {
        return { success: false };
      }

      // store response to allTodos
      await commit('setTodoList', todos);

      commit('filterTaskList');

      return { success: true };
    } catch (err) {
      throw new Error(err);
    }
  },
};

export const mutations = {
  resetFilter: (state) => {
    state.filterOptions.forEach((element) => (element.status = false));
    state.filterOptions[0].status = true;
    state.activeFilterOption = state.filterOptions[0];
  },
  setTodoList: (state, val) => {
    state.taskList = val;
  },

  // Managing loading state

  setCompleteRequest: (state, val) => {
    state.completeRequest = val;
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
      (option) => option.id === state.activeFilterOption?.id
    );

    option.status = true;

    if (state.activeFilterOption?.title === ALL_TASK) {
      state.taskListPerPage = state.taskList.filter((task) =>
        task.description.toLowerCase().includes(state.searchText.toLowerCase())
      );

      return;
    }

    if (state.activeFilterOption?.title === INCOMPLETE_TASK) {
      state.taskListPerPage = state.taskList.filter(
        (task) =>
          task.status === false &&
          task.description
            .toLowerCase()
            .includes(state.searchText.toLowerCase())
      );

      return;
    }

    if (state.activeFilterOption?.title === COMPLETE_TASK) {
      state.taskListPerPage = state.taskList.filter(
        (task) =>
          task.status === true &&
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
