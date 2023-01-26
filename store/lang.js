export const state = () => ({
  language: '',
});

export const getters = {
  getLang: (state) => {
    return state.language;
  },
};

export const actions = {
  setLang: ({ state, commit }, val) => {
    commit('setLang', val);
  },
};

export const mutations = {
  setLang: (state, val) => {
    state.language = val;
  },
};
