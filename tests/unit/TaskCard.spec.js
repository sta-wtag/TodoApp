import { mount } from '@vue/test-utils';
// import Nuxti18n from '@nuxtjs/i18n';
import TaskCard from '@/components/TaskCard.vue';

async function wrapperFactory(newState = {}) {
  const mounted = await mount(TaskCard, {
    // Nuxti18n,
    mocks: {
      $t: (msg) => msg,
    },
  });

  return mounted;
}

describe('@/components/TaskCard.vue', () => {
  it('renders correctly', () => {
    const wrapper = wrapperFactory();

    expect(wrapper.find('button').text()).toMatch('Save');
  });
});
