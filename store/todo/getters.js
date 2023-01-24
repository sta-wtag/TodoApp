export default {
  getTodoList(state) {
    return state.states.taskList;
  },
  getFilteredList(state) {
    return state.states.getFilteredList;
  },
  getTaskById: (state) => (id) => {
    return state.states.taskList.find((elm) => elm.id === id);
  },
};
