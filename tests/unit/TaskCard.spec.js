import { describe, expect, it } from '@jest/globals';
import { shallowMount } from '@vue/test-utils';
import { Store } from 'vuex';
import NuxtI18n from 'vue-i18n';
import Swal from '~/tests/mocks/sweetalert';
import localVue from '@/tests/utils/vueInstanceFactory';
import i18Mock from '@/tests/utils/i18Mock';
import { todos } from '@/tests/utils/storeHelper';
import Taskcard from '@/components/TaskCard.vue';
import DeleteIcon from '@/assets/svg/Delete.svg';
import EditIcon from '@/assets/svg/Edit.svg';
import TickIcon from '@/assets/svg/Tick.svg';
import LoadingIcon from '@/components/buttons/LoadingIcon.vue';
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

function wrapperFactory(componentData) {
  const mounted = shallowMount(Taskcard, {
    localVue,
    store,
    i18n,
    ...componentData,
  });

  return mounted;
}

describe('@/components/TaskCard.vue', () => {
  it('shows save button on edit and Converts save button name to english locale', async () => {
    const wrapper = await wrapperFactory();

    await wrapper.setData({
      task: {
        status: false,
      },
      showEditIcon: false,
    });
    const saveButton = wrapper.find('[data-testid="save-button"]');

    expect(saveButton.text()).toBe(i18Mock[currentLocale].Save);
  });

  it('renders TickIcon', async () => {
    const wrapper = await wrapperFactory();

    await wrapper.setData({
      task: {
        status: false,
      },
      showEditIcon: false,
    });

    expect(wrapper.findComponent(TickIcon).exists()).toBe(true);
  });
  it('renders EditIcon', async () => {
    const wrapper = await wrapperFactory();

    await wrapper.setData({
      task: {
        status: false,
      },
      showEditIcon: true,
    });

    expect(wrapper.findComponent(EditIcon).exists()).toBe(true);
  });
  it('renders DeleteIcon', async () => {
    const wrapper = await wrapperFactory();

    await wrapper.setData({
      task: {
        status: false,
      },
      showEditIcon: true,
    });

    expect(wrapper.findComponent(DeleteIcon).exists()).toBe(true);
  });
  it('renders LoadingIcon', async () => {
    const wrapper = await wrapperFactory();

    await wrapper.setData({
      loading: true,
    });

    expect(wrapper.findComponent(LoadingIcon).exists()).toBe(true);
  });
  it('shows duration on task completion', async () => {
    const wrapper = await wrapperFactory({
      computed: {
        duration: () => 'test',
      },
    });

    await wrapper.setData({
      task: {
        status: true,
        completed_at: '2023-03-04T02:36:40.398+00:00',
      },
    });

    expect(wrapper.find('[data-testid="duration"]').text()).toBe('test');
  });
  it('openModal function called on see more', async () => {
    const wrapper = await wrapperFactory({
      computed: {
        seeMore: () => true,
      },
    });

    await wrapper.setData({
      task: {
        status: true,
        description: 'test',
      },
      showEditIcon: true,
    });
    const seeMoreButton = wrapper.find('[data-testid="seeMore"]');
    const spyOnOpenModal = jest.spyOn(wrapper.vm, 'openModal');

    Swal.fire.mockResolvedValue({ value: 'jhdehjwb' });
    seeMoreButton.trigger('click');
    expect(spyOnOpenModal).toHaveBeenCalledWith('test');
  });
});
