<template>
  <v-container fluid class="full-height px-0">
    <v-form ref="studentSearchForm" id="searchStudentForm"
            v-model="validForm"
    >
      <v-row>
        <v-col cols="9"><BarChartContainer v-if="labels && chartData" :displayYAxis="displayYAxis" :heightValue="heightValue" :labels="labels" :chart-data="chartData" data-type="New PENs by Month"></BarChartContainer><spinner v-else></spinner></v-col>
        <v-col cols="3">
          <v-row no-gutters class="d-flex justify-end">
              <v-col style="text-align: -webkit-right">
                <v-select
                    id="k12PSIselector"
                    :items="schoolGroups"
                    v-model="selectedSchoolGroup"
                    outlined
                    dense
                    class="mr-2"
                    placeholder="K-12/PSI Filter"
                    color="#38598a"
                    append-icon="mdi-chevron-down"
                    clearable
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                    id="newPENTimeframe"
                    :items="timeframes"
                    v-model="timeframe"
                    dense
                    outlined
                    color="#38598a"
                    append-icon="mdi-chevron-down"
                    :menu-props="{ offsetY: true }"
                ></v-select>
              </v-col>
          </v-row>
          <v-row class="justify-end mt-n3" no-gutters>
            <v-col cols="12" no-gutters>
              <v-expansion-panels focusable>
                <v-expansion-panel>
                  <v-expansion-panel-header style="border-bottom-left-radius: 4px;border-bottom-right-radius: 4px;color: #FFFFFF;background-color: rgb(0, 51, 102);border-color: rgb(0, 51, 102);">
                    <template v-slot:actions>
                      <v-icon color="white">
                        $expand
                      </v-icon>
                    </template>
                    Refine Results
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row no-gutters class="mt-4">
                      <v-col class="mt-2" cols="2">PEN:</v-col>
                      <v-col cols="4" class="mr-15">
                        <v-text-field
                            dense
                            filled
                            outlined
                            id='pen'
                            v-model="penSearch"
                            @keyup.enter="getNewPENs(true)"
                            maxlength="9"
                            minlength="9"
                            @keypress="isValidNumber($event)"
                            v-on:input="[refineHasValues()]"
                            autofocus>
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <v-row no-gutters class="mt-n4">
                      <v-col class="mt-2" cols="3">Mincode:</v-col>
                      <v-col cols="3" class="mr-15">
                        <v-text-field
                            dense
                            filled
                            outlined
                            id='mincode'
                            v-model="mincodeSearch"
                            maxlength="8"
                            minlength="8"
                            @keypress="isValidNumber($event)"
                            @keyup.enter="getNewPENs(true)"
                            v-on:input="[refineHasValues()]">
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <v-row no-gutters class="mt-n4">
                      <v-col class="mt-2" cols="4">Legal Surname:</v-col>
                      <v-col cols="6">
                        <v-text-field dense filled outlined
                                      id='legalLastName'
                                      v-model="legalSurnameSearch"
                                      maxlength="255"
                                      @keyup.enter="getNewPENs(true)"
                                      v-on:input="[refineHasValues()]"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <v-row no-gutters class="mt-n4">
                      <v-col class="mt-2" cols="4">Legal Given:</v-col>
                      <v-col cols="6">
                        <v-text-field dense filled outlined
                                      id='legalFirstName'
                                      v-model="legalGivenNameSearch"
                                      maxlength="255"
                                      @keyup.enter="getNewPENs(true)"
                                      v-on:input="[refineHasValues()]"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <v-row no-gutters class="mt-n4">
                      <v-col class="mt-2" cols="4">Legal Middle:</v-col>
                      <v-col cols="6">
                        <v-text-field dense filled outlined
                                      id='legalMiddleNames'
                                      v-model="legalMiddleNameSearch"
                                      maxlength="255"
                                      @keyup.enter="getNewPENs(true)"
                                      v-on:input="[refineHasValues()]"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <v-row no-gutters class="justify-end mt-n2">
                      <v-col cols="4" style="text-align: -webkit-right">
                        <PrimaryButton id="search-clear" :secondary="true" @click.native="clearSearch" text="Clear"></PrimaryButton>
                      </v-col>
                      <v-col cols="4" class="ml-2">
                        <PrimaryButton :disabled="!searchEnabled" :loading="searchLoading" @click.native="getNewPENs(true)" text="Refine"></PrimaryButton>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-container v-if="searchLoading" fluid class="fill-height px-0">
        <v-row>
          <v-container fluid class="full-height">
            <article id="match-results-container" class="top-banner full-height">
              <v-row align="center" justify="center">
                <v-progress-circular
                    :size="70"
                    :width="7"
                    color="primary"
                    indeterminate
                ></v-progress-circular>
              </v-row>
            </article>
          </v-container>
        </v-row>
      </v-container>
      <v-container v-else fluid class="fill-height px-0">
        <v-row no-gutters>
          <v-card elevation="0" height="100%" width="100%" style="background-color:#d7d7d7;">
            <v-row v-if="this.studentSearchResponse" no-gutters class="pt-3 mb-n1" style="background-color:white;">
              <v-divider class="mx-3"/>
            </v-row>
            <v-row v-if="this.studentSearchResponse" id="resultsRow" no-gutters class="py-2"
                   style="background-color:white;">
              <StudentSearchResults
                  :searchCriteria="this.currentStudentSearchParams"
                  :prepPut="prepRefineFilter"
                  :showCompare="false"
                  :searchLoading="searchLoading"
              ></StudentSearchResults>
            </v-row>
          </v-card>
        </v-row>
      </v-container>
    </v-form>
  </v-container>
</template>
<script>
import {LocalDate, LocalDateTime} from '@js-joda/core';
import ApiService from '../../../common/apiService';
import {Routes} from '@/utils/constants';
import {mapMutations, mapState} from 'vuex';
import StudentSearchResults from '@/components/penreg/student-search/StudentSearchResults';
import alertMixin from '@/mixins/alertMixin';
import PrimaryButton from '@/components/util/PrimaryButton';
import {isValidNumber} from '@/utils/validation';
import BarChartContainer from '@/components/admin/stats/BarChartContainer';
import {CHART_STAT_URLS} from '@/utils/constants/ChartConstants';
import Spinner from '@/components/common/Spinner';

export default {
  name: 'newpens',
  components: {
    Spinner,
    PrimaryButton,
    BarChartContainer,
    StudentSearchResults
  },
  mixins: [alertMixin],
  props: {
    searchParams: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      validForm: false,
      menu: false,
      localDate: LocalDate,
      schoolGroups: [{value: 'K12', text: 'K-12'}, {value: 'PSI', text: 'PSI'}],
      timeframes: [{value: 'TODAY', text: 'Today'}, {value: '2DAYS', text: 'In the last 2 days'}, {value: '1WEEK', text: 'In the last week'}],
      timeframe: 'TODAY',
      searchLoading: true,
      searchEnabled: false,
      selectedSchoolGroup: '',
      currentStudentSearchParams: {},
      penSearch: null,
      mincodeSearch: null,
      legalSurnameSearch: null,
      legalGivenNameSearch: null,
      legalMiddleNameSearch: null,
      labels: null,
      chartData: null,
      heightValue: '7rem',
      displayYAxis: false
    };
  },
  computed: {
    ...mapState('studentSearch', ['pageNumber', 'headerSortParams', 'studentSearchResponse']),
    ...mapState('penRequestBatch', ['prbValidationFieldCodes', 'prbValidationIssueTypeCodes']),
    genderCodes() {
      return this.genders ? this.genders.map(a => a.genderCode) : [];
    },
    gradeCodes() {
      return this.gradeCodeObjects ? this.gradeCodeObjects.map(a => a.gradeCode) : [];
    },
    charRules() {
      return [
        v => !(/[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F\u1100-\u11FF\u3040-\u309F\u30A0-\u30FF\u3130-\u318F\u3400-\u4DBF\u4E00-\u9FFF\uAC00-\uD7AF]/.test(v)) || 'Enter English characters only'
      ];
    }
  },
  mounted() {
    this.studentSearchParams = {...this.studentSearchParams};
    this.studentSearchParams.createDate = {};
    this.headerSortParams.currentSort = 'pen';
    this.getNewPENs(true, true);
    this.fillNewPenData();
  },
  watch: {
    studentSearchResponse: {
      async handler() {
        await this.$nextTick();
        document.getElementById('resultsRow')?.scrollIntoView({behavior: 'smooth'});
      }
    },
    timeframe: {
      async handler() {
        await this.$nextTick();
        this.getNewPENs();
      }
    },
    selectedSchoolGroup: {
      async handler() {
        await this.$nextTick();
        this.getNewPENs();
      }
    }
  },
  methods: {
    ...mapMutations('studentSearch', ['setPageNumber', 'setSelectedRecords', 'setStudentSearchResponse']),
    isValidNumber,
    clearSearch() {
      this.penSearch = null;
      this.mincodeSearch = null;
      this.legalSurnameSearch = null;
      this.legalGivenNameSearch = null;
      this.legalMiddleNameSearch = null;
      this.getNewPENs(true);
    },
    async refineHasValues() {
      if (this.penSearch || this.mincodeSearch || this.legalSurnameSearch || this.legalGivenNameSearch || this.legalMiddleNameSearch) {
        this.searchEnabled = true;
        return true;
      } else {
        this.searchEnabled = false;
      }
    },
    setTimeframeCriteria(){
      let today = LocalDateTime.now();
      let backMidnight = today.withHour(0).withMinute(0).withSecond(0).withNano(0);
      let yesterday;
      if(this.timeframe === '1WEEK'){
        yesterday = backMidnight.minusWeeks(1);
      }else if(this.timeframe === '2DAYS'){
        yesterday = backMidnight.minusDays(1);
      }else{
        yesterday = backMidnight;
      }
      this.studentSearchParams.createDate.startDate = yesterday;
      this.studentSearchParams.createDate.endDate = today;
    },
    setK12PSICriteria(){
      this.studentSearchParams.mincode = null;
      if(this.selectedSchoolGroup === 'PSI'){
        this.studentSearchParams.mincode = '102';
      }else if(this.selectedSchoolGroup === 'K12'){
        this.studentSearchParams.mincode = {};
        this.studentSearchParams.mincode.notstartswith = '102';
      }
    },
    setSearchCriteria(){
      if(this.studentSearchParams.mincode === null){
        delete this.studentSearchParams['mincode'];
      }
      delete this.studentSearchParams['pen'];
      delete this.studentSearchParams['legalLastName'];
      delete this.studentSearchParams['legalFirstName'];
      delete this.studentSearchParams['legalMiddleNames'];

      if(this.penSearch){
        this.studentSearchParams.pen = this.penSearch;
      }
      if(this.mincodeSearch){
        this.studentSearchParams.mincode = this.mincodeSearch;
      }
      if(this.legalSurnameSearch){
        this.studentSearchParams.legalLastName = this.legalSurnameSearch;
      }
      if(this.legalGivenNameSearch){
        this.studentSearchParams.legalFirstName = this.legalGivenNameSearch;
      }
      if(this.legalMiddleNameSearch){
        this.studentSearchParams.legalMiddleNames = this.legalMiddleNameSearch;
      }
    },
    fillNewPenData() {
      ApiService.apiAxios.get(CHART_STAT_URLS.NEW_PEN)
        .then(response => {
          this.labels = response.data.labels;
          this.chartData = response.data.data;
        })
        .catch(e => {
          this.setFailureAlert('Failed to load new pen statistics. Please try again later.');
          console.log(e);
        })
        .finally(() => {this.searchLoading = false;});

    },
    getNewPENs(validationRequired = true) {
      this.searchLoading = true;
      this.setSelectedRecords();
      this.setPageNumber(1);
      this.headerSortParams['currentSortAsc'] = true;
      this.setTimeframeCriteria();
      this.setK12PSICriteria();
      this.setSearchCriteria();
      if (validationRequired === false || (this.$refs.studentSearchForm.validate())) {
        const studentSearchKeys = Object.keys(this.studentSearchParams).filter(k => (this.studentSearchParams[k] && this.studentSearchParams[k].length !== 0));
        let refineFilters;
        if (studentSearchKeys?.length > 0) {
          refineFilters = {};
          studentSearchKeys.forEach(element => {
            refineFilters[element] = this.studentSearchParams[element];
          });
        }

        ApiService.apiAxios
          .get(Routes['student'].SEARCH_URL, this.prepRefineFilter(refineFilters))
          .then(response => {
            this.setStudentSearchResponse(response.data);
            this.currentStudentSearchParams = JSON.parse(JSON.stringify(refineFilters));
          })
          .catch(error => {
            if (error?.response?.status === 400) {
              this.setFailureAlert(error?.response?.data?.message);
            } else {
              this.setFailureAlert('An error occurred while loading the new pens. Please try again later.');
            }
            console.error(error.response);
          })
          .finally(() => {
            this.searchLoading = false;
          });
      } else {
        this.searchLoading = false;
      }
    },
    prepRefineFilter(refineFilters) {
      let sort = {};
      sort[this.headerSortParams.currentSort] = this.headerSortParams.currentSortAsc ? 'ASC' : 'DESC';
      return {
        params: {
          pageNumber: this.pageNumber - 1,
          sort: sort,
          searchQueries: refineFilters
        }
      };
    },
  }
};
</script>

