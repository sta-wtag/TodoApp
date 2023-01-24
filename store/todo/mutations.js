export default {
  setTask(state, val) {
    console.log(state.states);
    state.states.taskList.push(val);
  },
  setFilteredList(state, val) {
    state.states.filteredList = val;
  },
  deleteTask(state, val) {
    const index = state.states.taskList.indexOf(val);

    state.states.taskList.splice(index, 1);
  },
};
