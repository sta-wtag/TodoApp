import { describe, expect, it } from '@jest/globals';
import { mount } from '@vue/test-utils';
import Vuex from 'vuex';
import NuxtI18n from 'vue-i18n';
import localVue from '../utils/vueInstanceFactory';
import i18Mock from '../utils/i18Mock';
import { todos } from '../utils/storeHelper';

import TaskContainer from '../../components/TaskContainer.vue';

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

function wrapperFactory() {
  const mounted = mount(TaskContainer, {
    localVue,
    store,
    i18n,
    mocks: {
      $store: {
        dispatch: (item) => item,
      },
    },
  });

  return mounted;
}

describe('@/components/TaskContainer.vue', () => {
  it('Convertes button name to english locale', async () => {
    const wrapper = await wrapperFactory();
    const saveButton = wrapper.find('[data-testid="create-button"]');

    expect(saveButton.text()).toBe(i18Mock.en.create);
  });
});
