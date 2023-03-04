import { describe, expect, it, jest } from '@jest/globals';
import { shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import NuxtI18n from 'vue-i18n';

import localVue from '@/tests/utils/vueInstanceFactory.js';
import i18Mock from '@/tests/utils/i18Mock.js';
import { todos } from '@/tests/utils/storeHelper.js';
import TaskContainer from '@/components/TaskContainer.vue';

const helpers = require('../../helpers/helper');

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
  const mounted = shallowMount(TaskContainer, {
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
  it('calls SubmitForm on Add Task button', async () => {
    const wrapper = await wrapperFactory();

    await wrapper.setData({
      showAddCard: true,
      loading: false,
      titleInputError: false,
    });

    // const addButton = wrapper.find('[data-testid="add-button"]');
    const inputFieldToAddTask = wrapper.find('[data-testid="taskTitle"]');

    const spyAddTask = jest.spyOn(TaskContainer.methods, 'addTask');

    await inputFieldToAddTask.setValue('Task1');

    await wrapper.findComponent('form').trigger('submit');

    expect(spyAddTask).toBeCalled();
  });
});

describe('@/components/TaskContainer.vue', () => {
  it('helper function checkForm returns true on valid input', async () => {
    const addMock = jest.spyOn(helpers.helper, 'checkForm');

    const result = await addMock('task1');

    expect(result).toBe(true);
  });
});

describe('@/components/TaskContainer.vue', () => {
  it('helper function getDuration returns valid string', async () => {
    const addMock = jest.spyOn(helpers.helper, 'getDuration');

    const result = await addMock(
      '2023-03-04T02:36:40.398+00:00',
      '2023-03-04T02:36:40.398+00:00'
    );

    expect(result).toBe('1 day');
  });
});
