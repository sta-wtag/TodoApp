import {shallowMount} from '@vue/test-utils'

import TaskCard from '@/components/TaskCard.vue'

// const wrappeer = mount(TaskCard)

describe('TaskCard.vue', () => {
    it('renders props.msg when passed', () => {
      const msg = 'new message'
      const wrapper = shallowMount(TaskCard, {
        propsData: { msg }
      })
      expect(wrapper.text()).toMatch(msg)
    })
  })