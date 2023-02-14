import { describe, expect, it } from '@jest/globals';
import { mount } from '@vue/test-utils';
import Vuex from 'vuex';
import NuxtI18n from 'vue-i18n';
import localVue from '../utils/vueInstanceFactory';
import i18Mock from '../utils/i18Mock';
import { todos } from '../utils/storeHelper';
// import lang from '../../store/lang';
import { helper } from '../../helpers/helper';
import TaskCard from '../../components/TaskCard.vue';

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
  const mounted = mount(TaskCard, {
    localVue,
    store,
    i18n,
    propsData: {
      cardData: null,
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
  it('Conertes button name to english locale', () => {
    const wrapper = wrapperFactory();

    expect(wrapper.find('[data-testid="save-button"]'));
  });
});
