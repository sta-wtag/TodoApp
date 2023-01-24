export default {
  addTask(state, val) {
    console.log(state.states);
    state.states.taskList.push(val);
  },
  deleteTask(state, val) {
    const index = state.states.taskList.indexOf(val);

    state.states.taskList.splice(index, 1)
},
  setFilteredList(state, val) {
    state.states.filteredList = val;
  },
  
};
