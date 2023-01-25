export default {
  addTask({ state, commit }, val) {
    commit('addTask', val);
  },
  addFilteredList({ state, commit }, val) {
    commit('setFilteredList', val);
  },
  deleteTask({ commit }, val) {
    commit('deleteTask', val);
  },
  changeTaskState({ state, commit }, val) {
    commit('changeTaskState', val);
  },
  editTask({ state, commit }, val) {
    commit('editTask', val);
  },
};
