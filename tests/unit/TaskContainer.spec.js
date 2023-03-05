import { describe, expect, it, jest } from '@jest/globals';
import { shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import NuxtI18n from 'vue-i18n';

import localVue from '@/tests/utils/vueInstanceFactory.js';
import i18Mock from '@/tests/utils/i18Mock.js';
import { todos } from '@/tests/utils/storeHelper.js';
import TaskContainer from '@/components/TaskContainer.vue';

const helpers = require('../../helpers/helper.js');

const mock = jest.fn();
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
    mixins: [
      {
        methods: {
          $thirdPartyMethod: mock,
        },
      },
    ],
    mocks: {
      $store: {
        dispatch: (item) => item,
      },
    },
  });

  return mounted;
}

describe('@/components/TaskContainer.vue', () => {
  it('translation added to create button name', async () => {
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
  it('returns error message in current locale', async () => {
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

    const addButton = wrapper.find('[data-testid="add-button"]');
    const inputFieldToAddTask = wrapper.find('[data-testid="taskTitle"]');

    await inputFieldToAddTask.setValue('test');
    const add = jest.spyOn(wrapper.vm, 'submitForm');

    await addButton.trigger('submit');

    expect(add).toHaveBeenCalled();
  });
});

describe('@/components/TaskContainer.vue', () => {
  it('helper function checkForm returns true on valid input', async () => {
    const addMock = jest.spyOn(helpers, 'checkForm');

    const result = await addMock('task1');

    expect(result).toBe(true);
  });
});

describe('@/components/TaskContainer.vue', () => {
  it('helper function getDuration returns valid string', async () => {
    const addMock = jest.spyOn(helpers, 'getDuration');

    const result = await addMock(
      '2023-03-04T02:36:40.398+00:00',
      '2023-03-04T02:36:40.398+00:00'
    );

    expect(result).toBe('1 day');
  });
});
