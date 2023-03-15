import { jest } from '@jest/globals';
import { v4 as uuidv4 } from 'uuid';
import { LIMIT } from '@/constants.js';

export const todos = {
  namespaced: true,
  state: {
    limit: LIMIT,
    totalTask: 0,
    perPage: 9,
    page: 1,
    totalPage: 1,
    completeRequest: false,
    taskList: [],
    taskListPerPage: [],
    searchText: '',
    isSearching: false,
    filterOptions: [
      { id: uuidv4(), title: 'All', status: false },
      { id: uuidv4(), title: 'Incomplete', status: false },
      { id: uuidv4(), title: 'Complete', status: false },
    ],
    activeFilterOption: null,
  },
  getters: {
    getTodoList() {},
    getFilterOptions() {},
    getCompleteRequest() {},
    getListPerPage() {},
    getTotalTask() {},
    getTotalPage() {},
    getActiveFilterOption() {},
    getIsSearching() {},
    getShowSearchField() {
      return true;
    },
  },
  actions: {
    addTask: jest.fn(),
    deleteTask: jest.fn(),
    changeTaskState: jest.fn(),
    setCompleteRequest: jest.fn(),
    setListPerPage: jest.fn(),
    editTask: jest.fn(),
    increaseLimit: jest.fn(),
    resetLimit: jest.fn(),
    setTotalPage: jest.fn(),
    filterTaskList: jest.fn(),
    setSearchText: jest.fn(),
    setActiveFilterOption: jest.fn(),
    setIsSearching: jest.fn(),
    setTodoList: jest.fn(),
    setShowSearchField: jest.fn(),
  },
};

export const locales = {
  namespaced: true,
  state: {
    locales: [],
    currentLocale: 'en',
  },
  getters: {
    getCurrentLocale() {},
    getLocales() {},
  },
  actions: {
    setLocale: jest.fn(),
  },
};
