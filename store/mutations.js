export default {
  setTask(state, val) {
    console.log(state.states);
    state.states.taskList.push(val);
  },
  setFilteredList(state, val) {
    state.states.filteredList = val;
  },
  SET_LANG(state, locale) {
    if (state.states.locales.includes(locale)) {
      state.states.locale = locale;
    }
  },
};
