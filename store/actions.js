export default {
  addTask({ state, commit }) {
    commit('addTask', val);
  },
  addFilteredList({ state, commit }) {
    commit('setFilteredList', val);
  },
  deleteTask({ state, commit }) {
    commit('deleteTask', val)
  },
  SET_LANG({ state, commit }) {
    commit('SET_LANG', val);
  },
};
