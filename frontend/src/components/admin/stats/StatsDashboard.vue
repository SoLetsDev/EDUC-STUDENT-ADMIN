<template>
  <div id="statsContainer">
    <v-row>
      <v-col cols="6" v-if="NEW_PEN_AND_MERGES_STATS_ROLE">
        <router-link v-if="mergeChartdata && mergeLabels" :to="{ name: 'merges'}">
          <bar-chart-container v-if="mergeChartdata && mergeLabels" class="pt-4" :displayYAxis="false" :labels="mergeLabels" :chart-data="mergeChartdata" :data-type="CHART_TYPES.MERGES"></bar-chart-container>
        </router-link>
        <v-card v-else-if="loadingMerge" class="mx-auto pa-4">
          <v-row align="center" justify="center">
            <v-progress-circular
              :size="70"
              :width="7"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="6" v-if="GMP_UMP_STATS_ROLE">
        <router-link :to="{ name: 'analytics-gmp-stats'}">
          <doughnut-chart-container class="pt-4" :completion-states="COMPLETION_STATES.GMP" :data-type="CHART_TYPES.GMP"></doughnut-chart-container>
        </router-link>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" v-if="GMP_UMP_STATS_ROLE">
        <router-link :to="{ name: 'analytics-ump-stats'}">
          <doughnut-chart-container class="pb-4" :completion-states="COMPLETION_STATES.UMP" :data-type="CHART_TYPES.UMP"></doughnut-chart-container>
        </router-link>
      </v-col>
      <v-col cols="6" v-if="NEW_PEN_AND_MERGES_STATS_ROLE">
        <router-link v-if="newPenChartdata && newPenLabels" :to="{ name: 'new-pens'}">
          <bar-chart-container class="pb-4" :displayYAxis="false" :labels="newPenLabels" :chart-data="newPenChartdata" :data-type="CHART_TYPES.NEW_PENS"></bar-chart-container>
        </router-link>
        <v-card v-else-if="loadingNewPen" class="mx-auto pa-4">
          <v-row align="center" justify="center">
            <v-progress-circular
              :size="70"
              :width="7"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BarChartContainer from './BarChartContainer';
import DoughnutChartContainer from './DoughnutChartContainer';
import {CHART_TYPES, CHART_STAT_URLS, COMPLETION_STATES} from '../../../utils/constants/ChartConstants';
import ApiService from '../../../common/apiService';
import alertMixin from '@/mixins/alertMixin';
import {mapGetters} from 'vuex';

export default {
  name: 'StatsDashboard',
  components: {
    BarChartContainer,
    DoughnutChartContainer
  },
  mixins: [alertMixin],
  data: () => ({
    barOptions: {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
    },
    CHART_TYPES,
    COMPLETION_STATES: COMPLETION_STATES,
    gmpChartdata: null,
    loadingMerge: true,
    loadingNewPen: true,
    mergeChartdata: null,
    mergeLabels: null,
    newPenChartdata: null,
    newPenLabels: null,
    pieChartdata: null,
    pieChartOptions: {
      maintainAspectRatio: false,
    },
    result: [],
    styles: {
      height: '15rem',
      position: 'relative'
    }
  }),
  mounted() {
    this.fillNewPenData();
    this.fillMergeData();
  },
  computed: {
    ...mapGetters('auth', ['GMP_UMP_STATS_ROLE', 'NEW_PEN_AND_MERGES_STATS_ROLE']),
  },
  methods: {
    fillNewPenData() {
      ApiService.apiAxios.get(CHART_STAT_URLS.NEW_PEN)
        .then(response => {
          this.newPenLabels = response.data.labels;
          this.newPenChartdata = response.data.data;
        })
        .catch(e => {
          this.setFailureAlert('Failed to load new pen statistics. Please try again later.');
          console.log(e);
        })
        .finally(() => {this.loadingNewPen = false;});

    },
    fillMergeData() {
      ApiService.apiAxios.get(CHART_STAT_URLS.MERGE+'?statsType=MERGES_IN_LAST_12_MONTH')
        .then(response => {
          this.mergeLabels = response.data.labels;
          this.mergeChartdata = response.data.data;
        })
        .catch(e => {
          this.setFailureAlert('Failed to load merge statistics. Please try again later.');
          console.log(e);
        })
        .finally(() => {this.loadingMerge = false;});

    }
  }
};
</script>
