import { describe, expect, it } from '@jest/globals';
import { mount } from '@vue/test-utils';
import Vuex from 'vuex';
import NuxtI18n from 'vue-i18n';
import localVue from '@/tests/utils/vueInstanceFactory.js';
import i18Mock from '@/tests/utils/i18Mock.js';
import { todos } from '@/tests/utils/storeHelper.js';
import { helper } from '@/helpers/helper.js';
import TaskCard from '@/components/TaskCard.vue';

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
  const mounted = mount(TaskCard, {
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
  it('localization added to save button', async () => {
    const wrapper = await wrapperFactory();

    await wrapper.setData({
      task: {
        done: false,
      },
      showEditIcon: false,
    });
    const saveButton = wrapper.find('[data-testid="save-button"]');

    expect(saveButton.text()).toBe(i18Mock.en.Save);
  });
});
