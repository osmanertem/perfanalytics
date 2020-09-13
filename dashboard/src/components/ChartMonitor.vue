<template>
  <b-row>
    <b-col sm="3" class="chart-container">
      <PerformanceLineChart
        id="ttfbChart"
        :height="200"
        :chartdata="ttfbChartData"
        :options="chartOptions"
      />
    </b-col>
    <b-col sm="3">
      <PerformanceLineChart
        id="fcpChart"
        :height="200"
        :chartdata="fcpChartData"
        :options="chartOptions"
      />
    </b-col>
    <b-col sm="3">
      <PerformanceLineChart
        id="domLoadChart"
        :height="200"
        :chartdata="domLoadChartData"
        :options="chartOptions"
      />
    </b-col>
    <b-col sm="3">
      <PerformanceLineChart
        id="winLoadChart"
        :height="200"
        :chartdata="winLoadChartData"
        :options="chartOptions"
      />
    </b-col>
  </b-row>
</template>

<script>
import { mapState } from 'vuex';
import PerformanceLineChart from './PerformanceLineChart.vue';

export default {
  name: 'ChartMonitor',
  data() {
    return {};
  },
  mounted() {},
  computed: {
    ...mapState(['analyticsData']),
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          xAxes: [
            {
              display: false,
            },
          ],
        },
      };
    },
    ttfbChartData() {
      const newChartData = this.createEmptyChartData('TTFB');
      // eslint-disable-next-line
      this.analyticsData?.forEach((currentAnalyticsData) => {
        newChartData.labels.push(currentAnalyticsData.createdAt);
        newChartData.datasets[0].data.push(currentAnalyticsData.TTFB);
      });
      return newChartData;
    },
    fcpChartData() {
      const newChartData = this.createEmptyChartData('FCP');
      // eslint-disable-next-line
      this.analyticsData?.forEach((currentAnalyticsData) => {
        newChartData.labels.push(currentAnalyticsData.createdAt);
        newChartData.datasets[0].data.push(currentAnalyticsData.FCP);
      });
      return newChartData;
    },
    domLoadChartData() {
      const newChartData = this.createEmptyChartData('DOM Load');
      // eslint-disable-next-line
      this.analyticsData?.forEach((currentAnalyticsData) => {
        newChartData.labels.push(currentAnalyticsData.createdAt);
        newChartData.datasets[0].data.push(currentAnalyticsData.domLoad);
      });
      return newChartData;
    },
    winLoadChartData() {
      const newChartData = this.createEmptyChartData('Window Load');
      // eslint-disable-next-line
      this.analyticsData?.forEach((currentAnalyticsData) => {
        newChartData.labels.push(currentAnalyticsData.createdAt);
        newChartData.datasets[0].data.push(currentAnalyticsData.windowLoad);
      });
      return newChartData;
    },
  },
  methods: {
    createEmptyChartData(label) {
      return {
        labels: [],
        datasets: [
          {
            label,
            backgroundColor: '#f87979',
            data: [],
          },
        ],
      };
    },
  },
  components: {
    PerformanceLineChart,
  },
};
</script>

<style scoped lang="scss">
.chart-container {
}
</style>
