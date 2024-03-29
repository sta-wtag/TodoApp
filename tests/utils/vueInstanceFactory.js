import Vuex from 'vuex';
import NuxtI18n from 'vue-i18n';
import { createLocalVue } from '@vue/test-utils';

const localVue = createLocalVue();

localVue.prototype.$nuxt = {}; // Resolves $nuxt is undefined
localVue.use(Vuex);
localVue.use(NuxtI18n);

export default localVue;
