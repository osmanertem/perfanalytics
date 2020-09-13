<template>
  <b-container>
    <SiteManager id="siteManager" @siteIdChanged="onSiteIdChanged" :siteId="siteId" />
    <SitePerformanceMonitor id="sitePerformanceMonitor" :siteId="siteId" />
  </b-container>
</template>

<script>
import SiteManager from './SiteManager.vue';
import SitePerformanceMonitor from './SitePerformanceMonitor.vue';

export default {
  name: 'HomeC',
  data() {
    return {
      siteId: '2a6f0fa8-a05d-4751-b622-64a38983b473',
    };
  },
  methods: {
    onSiteIdChanged(newSiteId) {
      this.siteId = newSiteId;
    },
  },
  components: {
    SiteManager,
    SitePerformanceMonitor,
  },
};
</script>

<style scoped lang="scss">
</style>
