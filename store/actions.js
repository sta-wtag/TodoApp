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
};
