import {mount} from '@vue/test-utils'
import  TaskCard from '@/components/TaskCard.vue'
import Nuxti18n from '@nuxtjs/i18n'


// const i18n = new Nuxti18n({
//   locale: 'en',
// })


async function wrapperFactory(newState = {}) {
  const mounted = await mount(TaskCard, {
    Nuxti18n,
  })

  return mounted
}
describe('@/components/TaskCard.vue', () => {
    it('renders props.msg when passed', () => {
      const wrapper =  wrapperFactory()
      
      expect(wrapper.find('button').text()).toMatch('Welcome')
    })
})