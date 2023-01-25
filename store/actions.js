export default {
  setTask({ state, commit }) {
    commit('setTask', val);
  },
  addTask({ state, commit }) {
    commit('addTask', val);
  },
  addFilteredList({ state, commit }) {
    commit('setFilteredList', val);
  },
  deleteTask({ state, commit }) {
    commit('deleteTask', val);
  },
  changeTaskState({ state, commit }) {
    commit('changeTaskState', val);
  },
  editTask({ state, commit }) {
    commit('editTask', val);
  },
  SET_LANG({ state, commit }) {
    commit('SET_LANG', val);
  },
};
