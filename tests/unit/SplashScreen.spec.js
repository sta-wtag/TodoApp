import { describe, expect, it } from '@jest/globals';
import { shallowMount } from '@vue/test-utils';
import localVue from '@/tests/utils/vueInstanceFactory';
import SplashScreen from '@/components/SplashScreen';
import SplashIcon from '@/assets/svg/SplashIcon.svg';

function wrapperFactory() {
  const mounted = shallowMount(SplashScreen, {
    localVue,
  });

  return mounted;
}

describe('@/components/SplashScreen', () => {
  it('Contains SplashIcon', async () => {
    const wrapper = await wrapperFactory();
    // const SplashScreen = wrapper.find('[data-testid="splashscreen"]');

    expect(wrapper.findComponent(SplashIcon).exists()).toBeTruthy();
  });
});
