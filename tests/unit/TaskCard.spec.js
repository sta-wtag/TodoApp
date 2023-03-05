import { describe, expect, it } from '@jest/globals';
import { shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import NuxtI18n from 'vue-i18n';
import localVue from '@/tests/utils/vueInstanceFactory';
import i18Mock from '@/tests/utils/i18Mock';
import { todos } from '@/tests/utils/storeHelper';
import { helper } from '@/helpers/helper';
import Taskcard from '@/components/TaskCard.vue';
import DeleteIcon from '@/assets/svg/Delete.svg';
import EditIcon from '@/assets/svg/Edit.svg';
import TickIcon from '@/assets/svg/Tick.svg';

import LoadingIcon from '@/components/buttons/LoadingIcon.vue';
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

function wrapperFactory(additionalData) {
  const mounted = shallowMount(Taskcard, {
    localVue,
    store,
    i18n,
    // propsData: {
    //   cardData: null,
    // },
    // data() {
    //   return {
    //     task: {
    //       ...newState,
    //     },
    //     showEditIcon: null,
    //     loading: null,
    //   };
    // },
    // mocks: {
    //   $store: {
    //     dispatch: (item) => item,
    //   },
    //   helper,
    // },
    ...additionalData,
  });

  return mounted;
}

describe('@/components/TaskCard.vue', () => {
  it('Converts button name to english locale', async () => {
    const wrapper = await wrapperFactory();

    await wrapper.setData({
      task: {
        status: false,
      },
      showEditIcon: false,
    });
    const saveButton = wrapper.find('[data-testid="save-button"]');

    expect(saveButton.text()).toBe(i18Mock.en.Save);
  });

  it(`render @/assets/svg/Delete.svg`, async () => {
    const wrapper = await wrapperFactory({
      task: {
        status: false,
      },
    });

    expect(wrapper.findComponent(DeleteIcon).exists()).toBe(true);
  });

  it(`render @/assets/svg/Tick.svg`, async () => {
    const wrapper = await wrapperFactory({
      task: {
        status: false,
      },
    });

    expect(wrapper.findComponent(TickIcon).exists()).toBe(true);
  });

  it(`render @/assets/svg/Edit.svg`, () => {
    const wrapper = wrapperFactory({
      task: {
        status: false,
      },
      showEditIcon: true,
    });

    expect(wrapper.findComponent(EditIcon).exists()).toBe(true);
  });
});
