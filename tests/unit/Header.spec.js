import { describe, expect, it } from '@jest/globals';
import { shallowMount } from '@vue/test-utils';
import { Store } from 'vuex';
import NuxtI18n from 'vue-i18n';
import localVue from '@/tests/utils/vueInstanceFactory';
import i18Mock from '@/tests/utils/i18Mock';
import { currentlang, todos } from '@/tests/utils/storeHelper';
import Header from '@/components/Header';
import NavLogo from '@/assets/svg/navLogo.svg';

const helper = require('../../helpers/debounce.js');
// const event = new KeyboardEvent('keyup');
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
      currentlang,
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
    const wrapper = await wrapperFactory({
      computed: {
        showSearchInput: () => true,
      },
    });

    expect(wrapper.find('[data-testid="searchInputField"]').exists()).toBe(
      true
    );
  });
  it('renders navLogo', async () => {
    const wrapper = await wrapperFactory();

    expect(wrapper.findComponent(NavLogo).exists()).toBe(true);
  });
  //   it('calls search method', async () => {
  //     const wrapper = await wrapperFactory({
  //       computed: {
  //         showSearchInput: () => true,
  //       },
  //     });

  //     const debounce = jest.spyOn(helper, 'debounce');

  //     const mock = jest.spyOn(wrapper.vm, 'searchTask');

  //     await wrapper.setData({
  //       debounced: debounce(mock, 0),
  //     });

  //     const input = wrapper.find('[data-testid="searchInputField"]');

  //     input.setValue('test');
  //     await input.trigger('keyup');

  //     expect(mock).toHaveBeenCalled();
  //   });

  it('set search called', async () => {
    const wrapper = await wrapperFactory();
    const mock = jest.spyOn(wrapper.vm, 'setSearch');
    const searchButton = wrapper.find('[data-testid="searchButton"]');

    await searchButton.trigger('click');

    await wrapper.vm.$nextTick();
    expect(mock).toHaveBeenCalled();
    jest.restoreAllMocks();
  });
});
