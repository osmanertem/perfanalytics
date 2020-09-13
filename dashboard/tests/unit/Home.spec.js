import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Home from '@/components/Home.vue';
import './setup';

describe('Home.vue', () => {
  it('Renders site manager component', () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.find('#siteManager').exists()).equals(true);
  });
  it('Renders site performance monitor component', () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.find('#sitePerformanceMonitor').exists()).equals(true);
  });
  it('onSiteIdChanged method works', () => {
    const wrapper = shallowMount(Home);
    const testSiteId = 'test-id';
    wrapper.vm.onSiteIdChanged(testSiteId);

    expect(wrapper.vm.siteId).equals(testSiteId);
  });
});
