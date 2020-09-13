<template>
  <b-row class="site-performance-monitor">
    <b-col>
      <b-row align-v="center">
        <b-col cols="4">
          <template v-if="isBusy">
            <b-spinner label="Spinning"></b-spinner>
          </template>
        </b-col>
        <b-col>
          <b-row align-v="center">
            <b-col style="text-align:right">Start:</b-col>
            <b-col>
              <input
                type="datetime-local"
                id="startTime"
                name="startTime"
                :value="startTimeValue"
                @change="onStartTimeChanged"
              />
            </b-col>
            <b-col style="text-align:right">End:</b-col>
            <b-col>
              <input
                type="datetime-local"
                id="endTime"
                name="endTime"
                :value="endTimeValue"
                @change="onEndTimeChanged"
              />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <br />
      <ChartMonitor />
      <ReportsTable @reportSelected="onReportSelected" />
      <ResourceStatsTable :selectedReportId="selectedReportId" />
    </b-col>
  </b-row>
</template>

<script>
import { mapActions } from 'vuex';

import ChartMonitor from './ChartMonitor.vue';
import ReportsTable from './ReportsTable.vue';
import ResourceStatsTable from './ResourceStatsTable.vue';

export default {
  name: 'StatsMonitor',
  props: ['siteId'],
  data() {
    return {
      isBusy: false,
      startTime: null,
      endTime: null,
      selectedReportId: null,
    };
  },
  mounted() {
    this.startTime = new Date(Date.now() - 300 * 30 * 60 * 1000);
    this.endTime = new Date(Date.now());
    console.log('this.endTime', this.endTime);
    console.log('this.startTime', this.startTime);
  },
  computed: {
    startTimeValue() {
      if (!this.startTime) {
        return '';
      }
      const tzoffset = new Date().getTimezoneOffset() * 60000; // offset in milliseconds
      return new Date(this.startTime.getTime() - tzoffset)
        .toISOString()
        .slice(0, -5);
    },
    endTimeValue() {
      if (!this.endTime) {
        return '';
      }
      const tzoffset = new Date().getTimezoneOffset() * 60000; // offset in milliseconds
      return new Date(this.endTime.getTime() - tzoffset)
        .toISOString()
        .slice(0, -5);
    },
  },
  methods: {
    ...mapActions(['fetchAnalyticsData']),
    onReportSelected(reportId) {
      this.selectedReportId = reportId;
    },
    onStartTimeChanged(e) {
      this.startTime = new Date(e.target.value);
    },
    onEndTimeChanged(e) {
      this.endTime = new Date(e.target.value);
    },
    updateAnalyticsData() {
      this.isBusy = true;
      this.fetchAnalyticsData({
        siteId: this.siteId,
        startTime: this.startTime.toISOString(),
        endTime: this.endTime.toISOString(),
      }).finally(() => {
        this.isBusy = false;
      });
    },
  },
  watch: {
    startTime() {
      this.updateAnalyticsData();
    },
    endTime() {
      this.updateAnalyticsData();
    },
    siteId() {
      this.selectedReportId = null;
      this.updateAnalyticsData();
    },
  },
  components: {
    ChartMonitor,
    ReportsTable,
    ResourceStatsTable,
  },
};
</script>

<style scoped lang="scss">
.site-performance-monitor {
  margin-top: 10px;
  padding-top: 10px;
  border: 1px solid gray;
}
</style>
