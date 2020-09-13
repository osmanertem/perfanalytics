import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import ResourceStatsTable from '@/components/ResourceStatsTable.vue';
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

describe('ResourceStatsTable.vue', () => {
  it('Renders resource stats table', () => {
    const wrapper = shallowMount(ResourceStatsTable, { store, localVue });
    store.commit('SET_ANALYTICS_DATA', exampleAnalyticsData);
    // eslint-disable-next-line
    wrapper.setProps({ selectedReportId: exampleAnalyticsData[0]._id });
    expect(wrapper.vm.items.length).equal(1);
  });
  it('Table should be empyt when selectedReportId is not valid', () => {
    const wrapper = shallowMount(ResourceStatsTable, { store, localVue });
    store.commit('SET_ANALYTICS_DATA', exampleAnalyticsData);
    // eslint-disable-next-line
    wrapper.setProps({ selectedReportId: "not valid report Id" });
    expect(wrapper.vm.items.length).equal(0);
  });
  // it('onRowSelected methods works correctly', () => {
  //   const wrapper = shallowMount(ResourceStatsTable, { store, localVue });
  //   store.commit('SET_ANALYTICS_DATA', exampleAnalyticsData);
  //   expect(wrapper.vm.items.length).equal(1);
  //   wrapper.vm.onRowSelected(exampleAnalyticsData[0]);
  //   store.commit('SET_ANALYTICS_DATA', null);
  //   wrapper.vm.onRowSelected(null);
  //   expect(wrapper.vm.items).equal(undefined);
  // });
});
