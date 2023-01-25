export default {
  addTask(state, val) {
    state.states.taskList.push(val);
  },
  deleteTask(state, val) {
    const list = state.states.taskList;

    state.states.taskList = list.filter((task) => task.id !== val.id);
  },
  setFilteredList(state, val) {
    state.states.filteredList = val;
  },
};
