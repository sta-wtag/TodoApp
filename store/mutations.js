export default {
  addTask(state, val) {
    state.states.taskList.push(val);
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
  setFilteredList(state, val) {
    state.states.filteredList = val;
  },
};
