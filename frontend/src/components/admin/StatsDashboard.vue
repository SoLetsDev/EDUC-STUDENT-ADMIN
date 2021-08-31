<template>
  <div id="app">
    <v-app id="inspire">
      <v-row>
        <v-col cols="4">
          <v-card
            class="mt-4 mx-auto"
          >
            <v-sheet
              class="v-sheet--offset mx-auto px-5 pt-5 pb-3"
              color="#e91e63"
              elevation="4"
              rounded
              max-width="calc(100% - 32px)"
            >
              <bar-chart ref='chart' :chartData="chartdata" :options="barOptions" :styles="styles"></bar-chart>
            </v-sheet>
      
            <v-card-text class="v-card-text--offset pt-0">
              <div class="text-h6 font-weight-light mb-2">
               SOAM Logins
              </div>
              <v-divider class="my-2"></v-divider>
              <v-icon
                class="mr-2"
                small
              >
                mdi-clock-outline
              </v-icon>
              <span class="text-caption grey--text font-weight-light">last login 26 minutes ago</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card
            class="mt-4 mx-auto"
          >
            <v-sheet
              class="v-sheet--offset mx-auto px-5 pt-5 pb-3"
              color="#4caf50"
              elevation="4"
              rounded
              max-width="calc(100% - 32px)"
            >
              <line-chart ref='chart' :chartData="gmpChartdata" :options="options" :styles="styles"></line-chart>
            </v-sheet>
      
            <v-card-text class="v-card-text--offset pt-0">
              <div class="text-h6 font-weight-light mb-2">
                GMP Completions
              </div>
              <v-divider class="my-2"></v-divider>
              <v-icon
                class="mr-2"
                small
              >
                mdi-clock-outline
              </v-icon>
              <span class="text-caption grey--text font-weight-light">last completion 6 minutes ago</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card
            class="mt-4 mx-auto"
          >
            <v-sheet
              class="v-sheet--offset mx-auto px-5 pt-5 pb-3"
              color="cyan"
              elevation="4"
              rounded
              max-width="calc(100% - 32px)"
            >
              <line-chart ref='chart' :chartData="chartdata" :options="options" :styles="styles"></line-chart>
            </v-sheet>
            
            <v-card-text class="v-card-text--offset pt-0">
              <div class="text-h6 font-weight-light mb-2">
                UMP Completions
              </div>
              <v-divider class="my-2"></v-divider>
              <v-icon
                class="mr-2"
                small
              >
                mdi-clock-outline
              </v-icon>
              <span class="text-caption grey--text font-weight-light">last completion 6 days ago</span>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3">
          <v-card
            class="mx-auto"
          >
            <v-list-item class="ml-auto text-right" two-line>
              <v-list-item-avatar
                rounded
                size="80"
                color="cyan"
                class="v-sheet--offset my-0"
              >
                <v-icon color="white" large>mdi-checkbox-multiple-marked-circle</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-subtitle>GMP Completions</v-list-item-subtitle>
                <v-list-item-title class="text-h5 mb-1">
                  652
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-card-text class="pt-0">
            <v-divider class="mb-2"></v-divider>
            <v-icon
              class="mr-2"
              small
              color="green"
            >
              mdi-arrow-up
            </v-icon>
              <span class="text-caption grey--text font-weight-light"><span class="green--text">12%</span> increase in this month's completions</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card
            class="mx-auto"
          >
            <v-list-item class="ml-auto text-right" two-line>
              <v-list-item-avatar
                rounded
                size="80"
                color="#9c27b0"
                class="v-sheet--offset my-0"
              >
                <v-icon color="white" large>mdi-alert-circle</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-subtitle>GMP Rejections</v-list-item-subtitle>
                <v-list-item-title class="text-h5 mb-1">
                  52
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-card-text class="pt-0">
              <v-divider class="mb-2"></v-divider>
              <v-icon
                class="mr-2"
                small
                color="red"
              >
                mdi-arrow-down
              </v-icon>
              <span class="text-caption grey--text font-weight-light"><span class="red--text">6%</span> decrease in this month's rejections</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card
            class="mx-auto"
          >
            <v-list-item class="ml-auto text-right" two-line>
              <v-list-item-avatar
                rounded
                size="80"
                color="#4caf50"
                class="v-sheet--offset my-0"
              >
                <v-icon color="white" large>mdi-email</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-subtitle>GMP Comments</v-list-item-subtitle>
                <v-list-item-title class="text-h5 mb-1">
                  6
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-card-text class="pt-0">
              <v-divider class="mb-2"></v-divider>
              <v-icon
                class="mr-2"
                small
              >
                mdi-calendar
              </v-icon>
              <span class="text-caption grey--text font-weight-light">in the last 24 hours</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card
            class="mx-auto"
          >
            <v-list-item class="ml-auto text-right" two-line>
              <v-list-item-avatar
                rounded
                size="80"
                color="#ff9800"
                class="v-sheet--offset my-0"
              >
                <v-icon color="white" large>mdi-file-upload</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-subtitle>GMP Documents</v-list-item-subtitle>
                <v-list-item-title class="text-h5 mb-1">
                  6
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-card-text class="pt-0">
              <v-divider class="mb-2"></v-divider>
              <v-icon
                class="mr-2"
                small
                color="red"
              >
                mdi-alert
              </v-icon>
              <span class="text-caption grey--text font-weight-light">no documents uploaded in the last 12 days</span>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3">
          <v-card
            class="mx-auto"
          >
            <v-list-item class="ml-auto text-right" two-line>
              <v-list-item-avatar
                rounded
                size="80"
                color="#e91e63"
                class="v-sheet--offset my-0"
              >
                <v-icon color="white" large>mdi-checkbox-multiple-marked-circle</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-subtitle>UMP Completions</v-list-item-subtitle>
                <v-list-item-title class="text-h5 mb-1">
                  652
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-card-text class="pt-0">
              <v-divider class="mb-2"></v-divider>
              <v-icon
                class="mr-2"
                small
                color="green"
              >
                mdi-arrow-up
              </v-icon>
              <span class="text-caption grey--text font-weight-light"><span class="green--text">12%</span> increase in this month's completions</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card
            class="mx-auto"
          >
            <v-list-item class="ml-auto text-right" two-line>
              <v-list-item-avatar
                rounded
                size="80"
                color="#cyan"
                class="v-sheet--offset my-0"
              >
                <v-icon color="white" large>mdi-alert-circle</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-subtitle>UMP Rejections</v-list-item-subtitle>
                <v-list-item-title class="text-h5 mb-1">
                  52
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-card-text class="pt-0">
              <v-divider class="mb-2"></v-divider>
              <v-icon
                class="mr-2"
                small
                color="red"
              >
                mdi-arrow-down
              </v-icon>
              <span class="text-caption grey--text font-weight-light"><span class="red--text">6%</span> decrease in this month's rejections</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card
            class="mx-auto"
          >
            <v-list-item class="ml-auto text-right" two-line>
              <v-list-item-avatar
                rounded
                size="80"
                color="#4caf50"
                class="v-sheet--offset my-0"
              >
                <v-icon color="white" large>mdi-email</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-subtitle>UMP Comments</v-list-item-subtitle>
                <v-list-item-title class="text-h5 mb-1">
                  6
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-card-text class="pt-0">
              <v-divider class="mb-2"></v-divider>
              <v-icon
                class="mr-2"
                small
              >
                mdi-calendar
              </v-icon>
              <span class="text-caption grey--text font-weight-light">in the last 24 hours</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card
            class="mx-auto"
          >
            <v-list-item class="ml-auto text-right" two-line>
              <v-list-item-avatar
                rounded
                size="80"
                color="#9c27b0"
                class="v-sheet--offset my-0"
              >
                <v-icon color="white" large>mdi-file-upload</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-subtitle>UMP Documents</v-list-item-subtitle>
                <v-list-item-title class="text-h5 mb-1">
                  6
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-card-text class="pt-0">
              <v-divider class="mb-2"></v-divider>
              <v-icon
                class="mr-2"
                small
                color="red"
              >
                mdi-alert
              </v-icon>
              <span class="text-caption grey--text font-weight-light">no documents uploaded in the last 12 days</span>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
        <v-card class="mx-auto mb-4">
          <doughnut-chart ref='chart' :chartData="pieChartdata"></doughnut-chart>
          <v-card-text class="v-card-text--offset pt-0">
            <div class="text-h6 font-weight-light mb-2">
              GMP Statistics
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon
              class="mr-2"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="text-caption grey--text font-weight-light">last login 26 minutes ago</span>
          </v-card-text>
        </v-card>
        </v-col>
        <v-col cols="8">
          <v-card
            class="mt-4 mx-auto"
          >
            <v-sheet
              class="v-sheet--offset mx-auto px-5 pt-5 pb-3"
              color="#ff9800"
              elevation="4"
              rounded
              max-width="calc(100% - 32px)"
            >
              <v-tabs
                v-model="tab"
                background-color="#ff9800"
                centered
                dark
              >
                <v-tab href="#tab-1">
                  <v-icon medium class="pr-2">mdi-merge</v-icon>
                  Merge Report</v-tab>
                <v-tab href="#tab-2">
                  <v-icon medium class="pr-2">mdi-graph</v-icon>
                  Report Two</v-tab>
                <v-tab href="#tab-3">
                  <v-icon medium class="pr-2">mdi-turtle</v-icon>
                  Report Three</v-tab>
              </v-tabs>
            </v-sheet>
            <v-row justify="end" class="ma-0 pa-0">
            <TertiaryButton
              class="ma-0"
              color="black"
              text="Download PDF"
              small
              icon="mdi-pdf-box">
            ></TertiaryButton>
            </v-row>
            <v-tabs-items v-model="tab">
              <v-tab-item
                v-for="i in 3"
                :key="i"
                :value="'tab-' + i"
              >
                <v-card-text class="v-card-text--offset pt-0">
                  <v-data-table v-if="key=1"
                    :headers="headers"
                    :items="students"
                    :items-per-page="5"
                  ></v-data-table>
                </v-card-text>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>
    </v-app>
  </div>
</template>

<script>
import LineChart from '../util/LineChart';
import BarChart from '../util/BarChart';
import DoughnutChart from '../util/DoughnutChart';
import TertiaryButton from "../util/TertiaryButton";
export default {
  name: 'StatsDashboard',
  components: {
    TertiaryButton,
    LineChart,
    BarChart,
    DoughnutChart
  },
  data: () => ({
    chartdata: null,
    gmpChartdata: null,
    headers: [
      { text: 'First', value: 'first' },
      { text: 'Last', value: 'last' },
      { text: 'DOB', value: 'dob' },
      { text: 'Mincode', value: 'mincode' }
    ],
    pieChartdata: null,
    barOptions: {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        yAxes: [{
          gridLines: {
            borderDash: [2,2],
            color: 'white',
            drawTicks: false,
          },
          ticks: {
            fontColor: 'white',
            padding: 5
          }
        }],
        xAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            fontColor: 'white',
            padding: 5
          }
        }]
      }
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        yAxes: [{
          gridLines: {
            borderDash: [2,2],
            color: 'white',
            drawTicks: false,
          },
          ticks: {
            fontColor: 'white',
            padding: 5
          }
        }],
        xAxes: [{
          beginAtZero: false,
          gridLines: {
            borderDash: [2,2],
            color: 'white',
            drawTicks: false
          },
          ticks: {
            fontColor: 'white',
            padding: 5
          }
        }]
      }
    },
    students: [
      {
        first: 'John',
        last: 'Cox',
        dob: '1990/07/04',
        mincode: '1025556666'
      },
      {
        first: 'John',
        last: 'Cox',
        dob: '1990/07/04',
        mincode: '1025556666'
      },
      {
        first: 'John',
        last: 'Cox',
        dob: '1990/07/04',
        mincode: '1025556666'
      },
      {
        first: 'John',
        last: 'Cox',
        dob: '1990/07/04',
        mincode: '1025556666'
      },
      {
        first: 'John',
        last: 'Cox',
        dob: '1990/07/04',
        mincode: '1025556666'
      },
      {
        first: 'John',
        last: 'Cox',
        dob: '1990/07/04',
        mincode: '1025556666'
      },
      {
        first: 'John',
        last: 'Cox',
        dob: '1990/07/04',
        mincode: '1025556666'
      }
    ],
    styles: {
      height: '9rem',
      position: 'relative'
    },
    tab: null
  }),
  mounted() {
    this.fillData();
    this.fillGMPData();
    this.fillPieChartData();
  },
  methods: {
    fillData() {
      this.chartdata = {
        labels: ['Ja', 'Fe', 'Ma', 'Ap', 'May', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
        datasets: [
          {
            barPercentage: .45,
            backgroundColor: '#eee',
            fill: false,
            borderColor: 'white',
            lineJoin: 'rounded',
            tension: 0,
            pointBackgroundColor: 'white',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()],
          }
        ]
      };
    },
    fillGMPData() {
      this.gmpChartdata = {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [
          {
            backgroundColor: '#99cc99',
            fill: true,
            borderColor: 'white',
            lineJoin: 'rounded',
            tension: 0,
            pointBackgroundColor: 'white',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()],
          }
        ]
      };
    },
    fillPieChartData() {
      this.pieChartdata = {
        labels: ['Completions', 'Rejections', 'Comments', 'Uploads'],
        datasets: [
          {
            backgroundColor: [
              'red',
              'orange',
              'purple',
              'cyan'
            ],
            fill: true,
            borderColor: 'white',
            lineJoin: 'rounded',
            tension: 0,
            pointBackgroundColor: 'white',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()],
          }
        ]
      };
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  }
};
</script>

<style scoped>
  #app {
    background: #eee;
  }
  .v-application {
    background: #eee;
  }
  .v-sheet--offset {
    top: -18px;
    position: relative;
  }
  .v-card-text--offset {
    top: -7px;
  }
</style>
