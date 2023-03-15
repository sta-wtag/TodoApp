export const state = () => ({
  locales: [
    { code: 'en', name: 'English' },
    { code: 'bn', name: 'বাংলা' },
  ],
  currentLocale: { code: 'en', name: 'English' },
});

export const getters = {
  getCurrentLocale: (state) => {
    return state.currentLocale;
  },
  getLocales: (state) => {
    return state.locales;
  },
};

export const mutations = {
  setLocale(state, locale) {
    state.currentLocale = locale;
  },
};

export const actions = {
  setLocale({ commit }, locale) {
    commit('setLocale', locale);
  },
};
