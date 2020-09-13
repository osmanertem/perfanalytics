import Vue from 'vue';
import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import store from '../../src/store/index';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const localVue = createLocalVue();
localVue.use(Vuex);

export {
  localVue,
  store,
};
