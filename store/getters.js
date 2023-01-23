export default {
  getTodoList(state) {
    return state.states.taskList;
  },
  getFilteredList(state) {
    return state.states.getFilteredList;
  },
};
