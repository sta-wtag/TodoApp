export default {
  addTask(state, val) {
    state.states.taskList.push(val);
  },
  setFilteredList(state, val) {
    state.states.filteredList = val;
  },
};
