import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import ReportsTable from '@/components/ReportsTable.vue';
import { localVue, store } from './setup';

const exampleAnalyticsData = [{
  _id: '5f5ced24c8dd6b2d0dce4c30',
  FCP: 443.4499999988475,
  TTFB: 201,
  domLoad: 714,
  windowLoad: 779,
  resourceLoadTimes: [
    {
      _id: '5f5ced24c8dd6b2d0dce4c31',
      name: 'https://cdn.dsmcdn.com/frontend/web/production/home-97a743cd0e.async.bundle.css',
      duration: 58.20499999754247,
      transferSize: 0,
      initiatorType: 'link',
    },
  ],
  reporterIp: '::1',
  url: 'https://www.trendyol.com/butik/liste/kadin',
  createdAt: '2020-09-12T15:45:40.863Z',
  updatedAt: '2020-09-12T15:45:40.863Z',
}];

describe('ReportsTable.vue', () => {
  it('Renders reports table', () => {
    const wrapper = shallowMount(ReportsTable, { store, localVue });
    store.commit('SET_ANALYTICS_DATA', exampleAnalyticsData);
    expect(wrapper.vm.items.length).equal(1);
  });
  it('onRowSelected methods works correctly', () => {
    const wrapper = shallowMount(ReportsTable, { store, localVue });
    store.commit('SET_ANALYTICS_DATA', exampleAnalyticsData);
    expect(wrapper.vm.items.length).equal(1);
    wrapper.vm.onRowSelected(exampleAnalyticsData[0]);
    store.commit('SET_ANALYTICS_DATA', null);
    wrapper.vm.onRowSelected(null);
    expect(wrapper.vm.items).equal(undefined);
  });
});
