import { describe, expect, it } from '@jest/globals';
import { mount } from '@vue/test-utils';
import Vuex from 'vuex';
import NuxtI18n from 'vue-i18n';
import localVue from '@/tests/utils/vueInstanceFactory';
import i18Mock from '@/tests/utils/i18Mock';
import { todos } from '@/tests/utils/storeHelper';
import { helper } from '@/helpers/helper';
import Taskcard from '@/components/TaskCard.vue';

let store;

const i18n = new NuxtI18n({
  locale: 'en',
  messages: i18Mock,
});

beforeEach(() => {
  store = new Vuex.Store({
    modules: {
      todos,
    },
  });
});

function wrapperFactory(newState = {}) {
  const mounted = mount(Taskcard, {
    localVue,
    store,
    i18n,
    propsData: {
      cardData: null,
    },
    data() {
      return {
        task: {
          ...newState,
        },
        showEditIcon: null,
      };
    },
    mocks: {
      $store: {
        dispatch: (item) => item,
      },
      helper,
    },
  });

  return mounted;
}

describe('@/components/TaskCard.vue', () => {
  it('Convertes button name to english locale', async () => {
    const wrapper = await wrapperFactory();

    await wrapper.setData({
      task: {
        done: false,
      },
      showEditIcon: false,
    });
    expect(wrapper.get('[data-testid="save-button"]').text()).toBe(
      i18Mock.en.Save
    );
  });
});
