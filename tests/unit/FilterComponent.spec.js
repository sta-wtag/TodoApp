import { describe, expect, it } from '@jest/globals';
import { shallowMount } from '@vue/test-utils';
import { Store } from 'vuex';
import NuxtI18n from 'vue-i18n';
import { v4 as uuidv4 } from 'uuid';
import localVue from '@/tests/utils/vueInstanceFactory';
import i18Mock from '@/tests/utils/i18Mock';
import { todos } from '@/tests/utils/storeHelper';
import FilterComponent from '@/components/buttons/FilterComponent';
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
  const mounted = shallowMount(FilterComponent, {
    localVue,
    i18n,
    store,
    propsData: {
      options: [{ id: uuidv4(), title: 'Incomplete', status: true }],
    },
  });

  return mounted;
}

describe('@/components/buttons/FilterComponent', () => {
  it('Translator added to filter button', async () => {
    const wrapper = await wrapperFactory();
    const filterButton = wrapper.find('[data-testid="filterButton"]');

    store.commit('todos/setIsSearching', true);
    await wrapper.vm.$nextTick();
    expect(filterButton.text()).toContain(i18Mock.en.Incomplete);
  });

  it('Filter Button disables while search is active', async () => {
    const wrapper = await wrapperFactory();
    const filterButton = wrapper.find('[data-testid="filterButton"]');

    store.commit('todos/setIsSearching', true);
    await wrapper.vm.$nextTick();
    expect(filterButton.attributes('disabled')).toBe('disabled');
  });

  it('Filter Button disables while search is active', async () => {
    const wrapper = await wrapperFactory();
    const filterButton = wrapper.find('[data-testid="filterButton"]');

    store.commit('todos/setIsSearching', false);
    await wrapper.vm.$nextTick();
    filterButton.trigger('click');

    expect(wrapper.emitted().closeAddCard).toBeTruthy();
  });
});
