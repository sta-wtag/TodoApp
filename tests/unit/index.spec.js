import { describe, expect, it } from '@jest/globals';
import { shallowMount } from '@vue/test-utils';
import { Store } from 'vuex';
import NuxtI18n from 'vue-i18n';
import localVue from '@/tests/utils/vueInstanceFactory';
import i18Mock from '@/tests/utils/i18Mock';
import { todos } from '@/tests/utils/storeHelper';
import IndexPage from '@/pages/index';
import TaskContainer from '@/components/TaskContainer.vue';
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
    },
  });
});
function wrapperFactory() {
  const mounted = shallowMount(IndexPage, {
    i18n,
    store,
    localVue,
  });

  return mounted;
}

describe('@/pages/index', () => {
  it('Shows splash screen on load', async () => {
    const wrapper = await wrapperFactory({
      isListLoading: true,
    });
    const SplashScreen = wrapper.find('[data-testid="splashscreen"]');

    console.log(wrapper.vm.isListLoading);
    expect(wrapper.findComponent(SplashScreen).exists()).toBe(true);
  });
});
