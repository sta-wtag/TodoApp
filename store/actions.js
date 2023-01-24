export default {
  addTask({ state, commit }) {
    commit('addTask', val);
  },
  addFilteredList({ state, commit }) {
    commit('setFilteredList', val);
  },
  SET_LANG({ state, commit }) {
    commit('SET_LANG', val);
  },
};
