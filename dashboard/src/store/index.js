import Vue from 'vue';
import Vuex from 'vuex';
import sdk from '../sdk';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    webSites: [],
    analyticsData: [],
  },
  actions: {
    init({ dispatch }) {
      dispatch('fetchWebSites');
    },
    fetchWebSites({ commit }) {
      return sdk.getSites().then((siteResults) => {
        commit('SET_WEB_SITES', siteResults);
      });
    },
    createWebSite({ dispatch }, siteUrl) {
      return sdk.createSite({ siteUrl }).then((createdSiteData) => {
        dispatch('fetchWebSites');
        return createdSiteData;
      });
    },
    fetchAnalyticsData({ commit }, { siteId, startTime, endTime }) {
      return sdk.getAnalyticsData({ siteId, startTime, endTime }).then((analyticsDataResults) => {
        console.log('analyticsDataResults', analyticsDataResults);
        commit('SET_ANALYTICS_DATA', analyticsDataResults);
      });
    },
  },
  mutations: {
    SET_WEB_SITES(state, jsonData) {
      state.webSites = jsonData;
    },
    SET_ANALYTICS_DATA(state, jsonData) {
      state.analyticsData = jsonData;
    },
  },
});
