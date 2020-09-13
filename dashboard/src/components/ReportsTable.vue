<template>
  <b-row class="reports-table-container">
    <b-col>
      <b-row>
        <b-col>
          <b>Reports</b>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table
            sticky-header
            selectable
            outlined
            hover
            select-mode="single"
            :items="items"
            @row-selected="onRowSelected"
          ></b-table>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ReportsTable',
  data() {
    return {};
  },
  computed: {
    ...mapState(['analyticsData']),
    items() {
      return this.analyticsData?.map((currentAnalyticsData, index) => ({
        index,
        createdAt: currentAnalyticsData.createdAt.slice(0, -5),
        url: currentAnalyticsData.url,
        FCP: parseInt(currentAnalyticsData.FCP, 10),
        TTFB: currentAnalyticsData.TTFB,
        domLoad: currentAnalyticsData.domLoad,
        reporterIp: currentAnalyticsData.reporterIp,
        windowLoad: currentAnalyticsData.windowLoad,
      }));
    },
  },
  methods: {
    onRowSelected(selectedRow) {
      if (!this.analyticsData) {
        return;
      }
      const reportId = this.analyticsData[selectedRow[0]?.index]?._id; // eslint-disable-line
      this.$emit('reportSelected', reportId);
    },
  },
};
</script>

<style scoped lang="scss">
.reports-table-container {
  margin: 10px;
  padding-top: 10px;
  border: 1px solid black;
}
</style>
