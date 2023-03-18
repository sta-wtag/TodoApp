import { describe, expect, it } from '@jest/globals';
import { shallowMount } from '@vue/test-utils';
import { Store } from 'vuex';
import NuxtI18n from 'vue-i18n';
import localVue from '@/tests/utils/vueInstanceFactory';
import i18Mock from '@/tests/utils/i18Mock';
import { todos } from '@/tests/utils/storeHelper';
import IndexPage from '@/pages/index';
import Header from '@/components/Header';
let store;
const currentLocale = 'en';
const i18n = new NuxtI18n({
  locale: currentLocale,
  messages: i18Mock,
});

beforeEach(() => {
  store = new Store({
    modules: {
      todos,
    },
  });
});
function wrapperFactory() {
  const mounted = shallowMount(IndexPage, {
    stubs: {
      SplashScreen: true,
      Header: true,
      TaskContainer: true,
    },
    i18n,
    store,
    localVue,
  });

  return mounted;
}

describe('@/pages/index', () => {
  it('Shows splash screen on list load', async () => {
    const wrapper = await wrapperFactory();

    store.commit('todos/setIsListLoading', true);
    await wrapper.vm.$nextTick();
    expect(
      wrapper.findComponent('[data-testid="splash-screen"]').exists()
    ).toBe(true);
  });

  it('shows loader while search is active', async () => {
    const wrapper = await wrapperFactory();

    store.commit('todos/setIsListLoading', false);
    store.commit('todos/setIsSearching', true);
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent('[data-testid="loader"]').exists()).toBe(true);
  });

  it('shows loader while search is active', async () => {
    const wrapper = await wrapperFactory();

    store.commit('todos/setIsListLoading', false);
    store.commit('todos/setIsSearching', true);
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent('[data-testid="loader"]').exists()).toBe(true);
  });

  it('Index has header', async () => {
    const wrapper = await wrapperFactory();

    store.commit('todos/setIsListLoading', false);
    store.commit('todos/setIsSearching', true);
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(Header).exists()).toBe(true);
  });
});
