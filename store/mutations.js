export default {
  addTask(state, val) {
    // state.states.taskList = [val, ...state.states.taskList];
    state.states.taskList.push(val);
  },
  setFilteredList(state, val) {
    state.states.filteredList = val;
  },
  deleteTask(state, val) {
    const list = state.states.taskList;

    state.states.taskList = list.filter((task) => task.id !== val.id);
  },
  changeTaskState(state, val) {
    const list = state.states.taskList;

    for (let i = 0; i < list.length; i++) {
      if (list[i].id === val.id) {
        list[i].done = !list[i].done;
        list[i].completedAt = new Date();
      }
    }
  },
  editTask(state, val) {
    for (let k = 0; k < state.states.taskList.length; k++) {
      if (state.states.taskList[k].id === val.id) {
        state.states.taskList[k].description = val.description;
      }
    }
  },
};
