import {mount}  from '@vue/test-utils'
import TaskCard from '../components/TaskCard.vue'
describe('TaskCard', () => {
    test('is a Vue instance', () => {
      const wrapper = mount(TaskCard)
      expect(wrapper.vm).toBeTruthy()
    })
  })