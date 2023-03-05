import { describe, expect, it } from '@jest/globals';
import { mount } from '@vue/test-utils';
import Vuex from 'vuex';
import NuxtI18n from 'vue-i18n';
import TaskContainer from '@/components/TaskContainer.vue';
import localVue from '@/tests/utils/vueInstanceFactory';
import i18Mock from '@/tests/utils/i18Mock';
import { todos } from '@/tests/utils/storeHelper';

let store;

const i18n = new NuxtI18n({
  locale: 'bn',
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
    data() {
      return {
        showAddCard: null,
      };
    },
    mocks: {
      $store: {
        dispatch: (item) => item,
      },
    },
  });

  return mounted;
}

describe('@/components/TaskContainer.vue', () => {
  it('localization added to create button', async () => {
    const wrapper = await wrapperFactory();

    await wrapper.setData({
      showAddCard: true,
    });
    const createButton = wrapper.find('[data-testid="create-button"]');
    const addButton = wrapper.find('[data-testid="add-button"]');
    const inputFieldToAddTask = wrapper.find('[data-testid="taskTitle"]');

    await inputFieldToAddTask.setValue('task1');
    await addButton.trigger('click');
    expect(createButton.text()).toBe(i18Mock.bn.create);
  });
});
