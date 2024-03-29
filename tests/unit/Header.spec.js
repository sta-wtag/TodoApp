import { describe, expect, it } from '@jest/globals';
import { shallowMount } from '@vue/test-utils';
import { Store } from 'vuex';
import NuxtI18n from 'vue-i18n';
import localVue from '@/tests/utils/vueInstanceFactory';
import i18Mock from '@/tests/utils/i18Mock';
import { locales, todos } from '@/tests/utils/storeHelper';
import Header from '@/components/Header';
import NavLogo from '@/assets/svg/navLogo.svg';

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
      locales,
    },
  });
});

function wrapperFactory(componentData) {
  const mounted = shallowMount(Header, {
    localVue,
    i18n,
    store,
    ...componentData,
  });

  return mounted;
}

describe('@/components/Header.vue', () => {
  it('shows search Input on button click', async () => {
    const wrapper = await wrapperFactory();

    store.commit('todos/setShowSearchField', true);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('[data-testid="searchInputField"]').exists()).toBe(
      true
    );
  });
  it('renders navLogo', async () => {
    const wrapper = await wrapperFactory();

    expect(wrapper.findComponent(NavLogo).exists()).toBe(true);
  });

  it('Add card is closed on filter button click', async () => {
    const wrapper = await wrapperFactory();
    const mock = jest.spyOn(wrapper.vm, 'setSearch');
    const searchButton = wrapper.find('[data-testid="searchButton"]');

    await searchButton.trigger('click');

    await wrapper.vm.$nextTick();
    expect(mock).toHaveBeenCalled();
    jest.restoreAllMocks();
  });
});
