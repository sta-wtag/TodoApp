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
    const list = state.states.taskList;

    for (let i = 0; i < list.length; i++) {
      if (list[i].id === val.id) {
        const index = list.indexOf(list[i]);

        list.splice(index, 1);
      }
    }
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
};
