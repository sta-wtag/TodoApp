import { describe, expect, it } from '@jest/globals';
import { mount } from '@vue/test-utils';
import Vuex from 'vuex';
import NuxtI18n from 'vue-i18n';
import localVue from '@/tests/utils/vueInstanceFactory.js';
import i18Mock from '@/tests/utils/i18Mock.js';
import { todos } from '@/tests/utils/storeHelper.js';

import TaskContainer from '@/components/TaskContainer.vue';

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
    data() {
      return {
        showAddCard: null,
        loading: null,
        titleInputError: null,
        taskDescription: null,
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
  it('', async () => {
    const wrapper = await wrapperFactory();

    await wrapper.setData({
      showAddCard: true,
      loading: false,
    });
    const createButton = wrapper.find('[data-testid="create-button"]');

    expect(createButton.text()).toBe(i18Mock.en.create);
  });
});

describe('@/components/TaskContainer.vue', () => {
  it('', async () => {
    const wrapper = await wrapperFactory();

    await wrapper.setData({
      showAddCard: true,
      loading: false,
      titleInputError: true,
    });

    const addButton = wrapper.find('[data-testid="add-button"]');
    const inputFieldToAddTask = wrapper.find('[data-testid="taskTitle"]');

    await inputFieldToAddTask.setValue('');
    await addButton.trigger('click');
    expect(wrapper.get('[data-testid="task-error-message"]').text()).toBe(
      i18Mock.en.validation.todo.title.required
    );
  });
});

describe('@/components/TaskContainer.vue', () => {
  it('', async () => {
    const wrapper = await wrapperFactory();

    await wrapper.setData({
      showAddCard: true,
      loading: false,
      titleInputError: false,
    });

    const addButton = wrapper.find('[data-testid="add-button"]');
    const inputFieldToAddTask = wrapper.find('[data-testid="taskTitle"]');
    const onSubmit = jest.fn();
    const spyClose = jest.spyOn(wrapper.vm, 'submitForm');

    console.log(jest.spyOn(wrapper.vm, 'submitForm'));
    await inputFieldToAddTask.setValue('Task1');
    // await addButton.trigger('click');
    await wrapper.find("[type='submit']").trigger('click');
    expect(onSubmit).toHaveBeenCalled();
  });
});
