import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Home from '@/components/Home.vue';

describe('Home.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.find('#siteManager').exists()).equals(true);
  });
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.find('#sitePerformanceMonitor').exists()).equals(true);
  });
});
