import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import SiteCard from '@/components/SiteCard.vue'
import SiteFooter from '../SiteFooter.vue'

describe('SiteCard', () => {
  it('renders correctly with props', () => {
    const product = {
      model: 'Fold 2',
      name: 'Samsung'
    }

    const wrapper = shallowMount(SiteCard, {
      props: {
        product
      }
    })

    expect(wrapper.find('.pt-4').text()).toBe(product.model)
    expect(wrapper.find('v-card-text').text()).toBe(product.name)
    expect(wrapper.find('v-btn').text()).toBe('Explore')
  })
})

describe('SiteFooter', () => {
  it('renders the correct number of buttons', () => {
    const wrapper = shallowMount(SiteFooter)
    const buttons = wrapper.findAll('v-btn')

    expect(buttons).toHaveLength(3) // Expecting 3 buttons based on the icons prop length
  })

  it('renders the correct copyright and author text', () => {
    const wrapper = shallowMount(SiteFooter)
    const currentYear = new Date().getFullYear()
    const expectedText = `${currentYear} — Muhammad Arslan`

    expect(wrapper.find('.copyright').text()).toBe(expectedText)
    expect(wrapper.find('strong').text()).toBe('Muhammad Arslan')
  })
})
