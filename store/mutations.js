export default {
  setTask(state, val) {
    state.states.task = val;
  },
  addTask(state, val) {
    state.states.taskList.push(val);
  },
  setFilteredList(state, val) {
    state.states.filteredList = val;
  },
  deleteTask(state, val) {
    const index = state.states.taskList.indexOf(val);

    state.states.taskList.splice(index, 1);
  },
  changeTaskState(state, val) {
    const index = state.states.taskList.indexOf(val);
    const list = state.states.taskList;

    for (let k = 0; k < list.length; k++) {
      if (k === index) {
        list[k].done = !list[k].done;
        list[k].completedAt = new Date();
      }
    }
  },
  editTask(state, val) {
    const list = state.states.taskList;

    console.log(val);

    console.log(val.description);

    for (let k = 0; k < list.length; k++) {
      if (list[k].id === val.id) {
        list[k].description = val.description;
      }
    }
  },
};
