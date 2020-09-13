<template>
  <b-row class="resource-stats-table-container">
    <b-col>
      <b-row>
        <b-col>
          <b>Resource Stats (for reportId {{ selectedReportId }} )</b>
        </b-col>
      </b-row>
      <b-row>
        <b-col v-if="selectedReportId">
          <b-table sticky-header outlined hover :items="items"></b-table>
        </b-col>
        <b-col v-else>Select a report to see resource load times</b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ResourceStatsTable',
  props: ['selectedReportId'],
  data() {
    return {};
  },
  computed: {
    ...mapState(['analyticsData']),
    items() {
      const selectedReport = this.analyticsData?.find(
        (element) => element._id === this.selectedReportId // eslint-disable-line
      );

      if (!selectedReport) {
        return [];
      }
      return selectedReport.resourceLoadTimes.map((currentRLT) => ({
        initiatorType: currentRLT.initiatorType,
        duration: `${currentRLT.duration}`.slice(0, 8),
        transferSize: currentRLT.transferSize,
        name: currentRLT.name,
      }));
    },
  },
};
</script>

<style scoped lang="scss">
.resource-stats-table-container {
  margin: 10px;
  padding-top: 10px;
  border: 1px solid black;
}
</style>
