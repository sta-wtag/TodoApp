import { jest } from '@jest/globals';
import { uuid } from 'uuidv4';
import { LIMIT } from '../../constants.js';

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
      { id: uuid(), title: 'All', status: false },
      { id: uuid(), title: 'Incomplete', status: false },
      { id: uuid(), title: 'Complete', status: false },
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
  },
};
