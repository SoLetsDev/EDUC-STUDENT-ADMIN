  <template>
  <v-container fluid class="fill-height pa-0 mb-4">

    <div style="width: 100%;" :overlay=false>
      <div class="full-width">
        <v-row class="pt-0">
          <v-col cols="12 pt-0">
            <v-progress-linear
                absolute
                top
                indeterminate
                color="blue"
                :active="loading"
            ></v-progress-linear>
            <div v-if="!loading && prbStudent" style="width: 100%;" :overlay=false>

              <StudentDetailsInfoPanel
                  :student.sync="prbStudent"
                  key="info-panel"
                  :runPenMatch="runPenMatch"
                  :studentDetailsCopy="prbStudentCopy"
                  :validationWarningFields="validationWarningFields"
                  :validationErrorFields="validationErrorFields"
                  :hiddenSearchFields="hiddenSearchFields"
                  :isFixableOrErrorStatus="isFixableOrErrorStatus"
                  :runDemogValidation="runDemogValidation"
              >
                <template v-slot:headerPanel="{ openSearchDemographicsModal }">
                  <v-row no-gutters
                         class="list-actions pt-4 pb-4 px-2 px-sm-2 px-md-3 px-lg-3 px-xl-3 d-flex align-center"
                         style="background-color:white;">
                    <v-icon v-if="isUnarchived || isArchived" :dense="isUnarchived" color="#2E8540" class="mr-1">
                      {{ isUnarchived ? 'fa-unlock' : 'mdi-package-up' }}
                    </v-icon>
                    <span class="mr-4 batch-title">
                      <strong>{{ seqNumberInBatch }} of {{
                          totalNumberInBatch
                        }} filtered</strong> | {{ title }}
                    </span>
                    <PrbStudentStatusChip
                        :prbStudent="prbStudent"
                    ></PrbStudentStatusChip>
                    <v-spacer></v-spacer>
                    <PrimaryButton id="modify-search-action" :secondary="true" class="mx-2"
                                   :disabled="disableModifySearch" text="Modify search"
                                   @click.native="openSearchDemographicsModal"></PrimaryButton>
                    <PrimaryButton id="issue-pen-action" class="mr-2" :disabled="disableIssueNewPen"
                                   :loading="isIssuingNewPen" text="Issue new PEN"
                                   @click.native="issueNewPen"></PrimaryButton>
                    <InfoDialog
                        :disabled="disableInfoReqBtn"
                        @updateInfoRequested="updateInfoRequested"
                        :text="prbStudent.infoRequest"
                    ></InfoDialog>
                  </v-row>
                  <v-row no-gutters class="py-2 px-2 px-sm-2 px-md-3 px-lg-3 px-xl-3" style="background-color:white;">
                    <span>
                      <strong>{{ prbStudent.mincode }} {{ batchFile.schoolName }}</strong>
                    </span>
                    <v-spacer></v-spacer>
                    <span class="mr-6">
                      <span class="mr-3">Submitted PEN</span>
                      <span
                          :class="{'pen-placeholder': !prbStudent.submittedPen}"><strong>{{
                          formatPen(prbStudent.submittedPen)
                        }}</strong></span>
                    </span>
                    <span>
                      <span class="mr-3">Assigned PEN</span>
                      <span
                          :class="{'pen-placeholder': !prbStudent.assignedPEN}"><strong>{{
                          formatPen(prbStudent.assignedPEN)
                        }}</strong></span>
                    </span>
                  </v-row>
                </template>
                <template v-slot:footerPanel>
                  <v-row v-if="prbStudent.infoRequest" no-gutters class="py-2 px-2 px-sm-2 px-md-3 px-lg-3 px-xl-3"
                         style="background-color:white;">
                    <v-col cols="12">
                      <v-row no-gutters class="d-flex align-center">
                        <span class="mr-3"><strong>Info requested</strong></span>
                        <v-btn id="clear-info-requested" icon color="#003366" @click="updateInfoRequested()">
                          <v-icon>fa-times-circle</v-icon>
                        </v-btn>
                      </v-row>
                      <v-row no-gutters>
                        <pre class="pre-style">{{ prbStudent.infoRequest }}</pre>
                      </v-row>
                    </v-col>
                  </v-row>
                </template>
              </StudentDetailsInfoPanel>
              <v-row v-if="isLoadingMatches">
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
              <v-row class="full-width" v-if="showPossibleMatch && !hasValidationIssues">
                <PenMatchResultsTable :student="prbStudent" :is-comparison-required="true"
                                      :is-pen-link="true"
                                      :is-refresh-required="true"
                                      :is-match-un-match="true"
                                      :disableMatchUnmatch="disableMatchUnmatch"
                                      :disableRefresh="disableRefresh"
                                      :title="penMatchResultTitle"
                                      :showMatchButton="showMatchButton"
                                      :showUnmatchButton="showUnmatchButton"
                                      :grayoutPossibleMatches="grayoutPossibleMatches"
                                      @match-unmatch-student="matchUnmatchStudentToPRBStudent"
                                      @refresh-match-results="refreshMatchResults"
                                      :possible-match="possibleMatches"></PenMatchResultsTable>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </div>
      <ConfirmationDialog ref="confirmationDialog" contentClass="match-confirmation-dialog">
        <template v-slot:message>
          <v-col class="pt-0">
            <v-row class="mb-3">There is <strong>&nbsp;{{ demogValidationResult.length }}&nbsp;</strong> questionable
              {{ `error${demogValidationResult.length > 1 ? 's' : ''}` }} with this PEN request:
            </v-row>
            <v-row v-for="warning in demogValidationResult" :key="warning.description">
              <v-col class="pb-0">
                <v-row>
                  <strong>{{ warning.uiFieldName }}</strong>
                  <v-icon small color="#FCBA19" class="ml-2">
                    fa-exclamation-circle
                  </v-icon>
                </v-row>
                <v-row>{{ warning.description }}</v-row>
              </v-col>
            </v-row>
          </v-col>
        </template>
      </ConfirmationDialog>
    </div>
  </v-container>
</template>

<script>
import {mapGetters, mapMutations, mapState} from 'vuex';
import PrimaryButton from '../../util/PrimaryButton';
import PrbStudentStatusChip from './PrbStudentStatusChip';
import InfoDialog from './prb-student-details/InfoDialog';
import ApiService from '../../../common/apiService';
import StudentDetailsInfoPanel from '../../common/StudentDetailsInfoPanel';
import {
  PEN_REQ_BATCH_STUDENT_REQUEST_CODES,
  PRB_SAGA_NAMES,
  Routes,
  SEARCH_CONDITION,
  SEARCH_FILTER_OPERATION,
  SEARCH_VALUE_TYPE,
  STUDENT_DETAILS_FIELDS,
  PEN_REQUEST_STUDENT_VALIDATION_FIELD_CODES_TO_STUDENT_DETAILS_FIELDS_MAPPER
} from '@/utils/constants';
import alertMixin from '../../../mixins/alertMixin';
import PenMatchResultsTable from '@/components/common/PenMatchResultsTable';
import {
  constructPenMatchObjectFromStudent,
  deepCloneObject,
  getMatchedRecordssWithDemographicsByStudent,
  getPossibleMatches,
  getDemogValidationResults
} from '@/utils/common';
import {formatPen} from '@/utils/format';
import ConfirmationDialog from '../../util/ConfirmationDialog';
import router from '../../../router';
import Mousetrap from 'mousetrap';
import {activateMultipleDraggableDialog} from '@/utils/draggable';

export default {
  name: 'PrbStudentDetailsDisplay',
  components: {
    PrimaryButton,
    PrbStudentStatusChip,
    InfoDialog,
    PenMatchResultsTable,
    StudentDetailsInfoPanel,
    ConfirmationDialog
  },
  mixins: [alertMixin],
  props: {
    prbStudentID: {
      type: String,
      required: true
    },
    archived: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      batchFile: null,
      prbStudent: null,
      modalStudent: null,
      loading: true,
      repeatRequestOriginalStatus: null,
      possibleMatches: [],
      isLoadingMatches: false,
      showPossibleMatch: false,
      prbStudentCopy: {},
      isIssuingNewPen: false,
      prbSagaNames: Object.values(PRB_SAGA_NAMES),
      isMatchingToStudentRecord: false,
      hasValidationIssues: false,
      disabledButtonActionsForStudentStatuses: [
        PEN_REQ_BATCH_STUDENT_REQUEST_CODES.MATCHEDUSR,
        PEN_REQ_BATCH_STUDENT_REQUEST_CODES.MATCHEDSYS,
        PEN_REQ_BATCH_STUDENT_REQUEST_CODES.NEWPENSYS,
        PEN_REQ_BATCH_STUDENT_REQUEST_CODES.NEWPENUSR,
      ],
      demogValidationResult: [],
      isStudentDataUpdated: false, // make it true, if any of the student gets updated from possible match list
      sagaId: undefined,
      deactivateMultipleDraggableDialog: null,
      hiddenSearchFields: [STUDENT_DETAILS_FIELDS.MINCODE],
      validationWarningFields: [],
      validationErrorFields: []
    };
  },
  watch: {
    repeatRequestOriginal: {
      handler() {
        if (this.prbStudent?.penRequestBatchStudentStatusCode === PEN_REQ_BATCH_STUDENT_REQUEST_CODES.REPEAT && this.prbStudent?.repeatRequestOriginalID)
          return ApiService.apiAxios.get(`${Routes['penRequestBatch'].FILES_URL}/${this.prbStudent.penRequestBatchID}/students/${this.prbStudent.repeatRequestOriginalID}`)
            .then(response => {
              this.repeatRequestOriginalStatus = response.data?.repeatRequestOriginalStatus;
            });
      }
    },
    notification(val) {
      let notificationData = val;
      const isPRBSaga = this.prbSagaNames.some(el => el === notificationData?.sagaName);
      if (notificationData && isPRBSaga) {
        this.handlePRBSagaNotification(notificationData);
      } else if (!this.sagaId && !this.prbStudent?.sagaInProgress && notificationData.eventType === 'UPDATE_STUDENT' && notificationData.eventOutcome === 'STUDENT_UPDATED' && notificationData.eventPayload) {
        this.handleStudentUpdateEvent(notificationData);
      }
    },
    //prbStudentID changes when route changes, so reload details
    prbStudentID: {
      handler() {
        this.initializeDetails();
      }
    }
  },
  computed: {
    ...mapState('setNavigation', ['selectedIDs', 'currentRequest']),
    ...mapGetters('setNavigation', ['title']),
    ...mapState('notifications', ['notification']),
    ...mapState('penRequestBatch', ['prbValidationFieldCodes', 'prbValidationIssueTypeCodes']),
    disableRefresh() {
      return this.prbStudent?.sagaInProgress || this.isArchived
          || PEN_REQ_BATCH_STUDENT_REQUEST_CODES.FIXABLE !== this.prbStudent?.penRequestBatchStudentStatusCode;
    },
    disableMatchUnmatch() {
      return this.isStudentDataUpdated || this.prbStudent?.sagaInProgress || this.isMatchingToStudentRecord || this.isArchived;
    },
    disableInfoReqBtn() {
      return this.loading || this.prbStudent?.sagaInProgress || this.isArchived
          || this.disabledButtonActionsForStudentStatuses.some(status => status === this.prbStudent?.penRequestBatchStudentStatusCode)
          || ![PEN_REQ_BATCH_STUDENT_REQUEST_CODES.INFOREQ, PEN_REQ_BATCH_STUDENT_REQUEST_CODES.ERROR, PEN_REQ_BATCH_STUDENT_REQUEST_CODES.FIXABLE, PEN_REQ_BATCH_STUDENT_REQUEST_CODES.DUPLICATE]
            .some(element => element === this.prbStudent?.penRequestBatchStudentStatusCode || element === this.repeatRequestOriginalStatus);
    },
    repeatRequestOriginal() {
      return this.prbStudent?.repeatRequestOriginalID;
    },
    disableIssueNewPen() {
      return this.loading || this.prbStudent?.sagaInProgress || this.isArchived || this.hasValidationIssues || this.isNewPenDisabledForSchool()
          || this.disabledButtonActionsForStudentStatuses.some(status => status === this.prbStudent?.penRequestBatchStudentStatusCode)
          || (![PEN_REQ_BATCH_STUDENT_REQUEST_CODES.FIXABLE, PEN_REQ_BATCH_STUDENT_REQUEST_CODES.INFOREQ]
            .some(element => element === this.prbStudent.penRequestBatchStudentStatusCode || element === this.repeatRequestOriginalStatus)
              && (this.demogValidationResult.some(x => x.penRequestBatchValidationIssueSeverityCode === 'ERROR') && (PEN_REQ_BATCH_STUDENT_REQUEST_CODES.ERROR === this.prbStudent.penRequestBatchStudentStatusCode)));
    },
    disableModifySearch() {
      return this.loading || this.prbStudent?.sagaInProgress || this.isArchived
          || this.disabledButtonActionsForStudentStatuses.some(status => status === this.prbStudent?.penRequestBatchStudentStatusCode);
    },
    isUnarchived() {
      return this.batchFile?.penRequestBatchStatusCode === 'UNARCHIVED';
    },
    isArchived() {
      return this.batchFile?.penRequestBatchStatusCode === 'ARCHIVED';
    },
    penRequestBatchStore() {
      return this.archived ? 'archivedRequestBatch' : 'penRequestBatch';
    },
    recordsInBatch() {
      return this.selectedIDs.filter(obj => obj.penRequestBatchID === this.selectedIDs[this.currentRequest].penRequestBatchID);
    },
    seqNumberInBatch() {
      return this.recordsInBatch.findIndex(obj => obj.penRequestBatchStudentID === this.prbStudentID) + 1;
    },
    totalNumberInBatch() {
      return this.recordsInBatch.length;
    },
    batchIDs() {
      return [...new Set(this.selectedIDs.map(item => item.penRequestBatchID))].join(',');
    },
    isFixableOrErrorStatus() {
      return PEN_REQ_BATCH_STUDENT_REQUEST_CODES.FIXABLE === this.prbStudent.penRequestBatchStudentStatusCode
      || PEN_REQ_BATCH_STUDENT_REQUEST_CODES.ERROR === this.prbStudent.penRequestBatchStudentStatusCode;
    },
    penMatchResultTitle() {
      if (this.prbStudent.penRequestBatchStudentStatusCode) {
        switch (this.prbStudent.penRequestBatchStudentStatusCode) {
        case PEN_REQ_BATCH_STUDENT_REQUEST_CODES.NEWPENSYS:
        case PEN_REQ_BATCH_STUDENT_REQUEST_CODES.NEWPENUSR:
          return 'New PEN Created';
        case PEN_REQ_BATCH_STUDENT_REQUEST_CODES.MATCHEDSYS:
        case PEN_REQ_BATCH_STUDENT_REQUEST_CODES.MATCHEDUSR:
          return 'Matched To';
        default:
          return `${this.possibleMatches.length || 0} Matches`;
        }
      } else {
        return `${this.possibleMatches.length || 0} Matches`;
      }
    },
  },
  created() {
    //Go back to Files page if refresh button is pressed
    if(Object.keys(this.selectedIDs).length > 0) {
      this.$store.dispatch('penRequestBatch/getCodes');
      this.initializeDetails();
    } else if(this.archived) {
      router.push({name: 'archivedRequestBatch'});
    } else {
      router.push({name: 'penRequestBatch'});
    }

  },
  beforeDestroy() {
    this.deactivateMultipleDraggableDialog && this.deactivateMultipleDraggableDialog();
    this.clearNavigation();
  },
  mounted() {
    Mousetrap.bind('ctrl+b', () => {
      if(this.archived){
        router.push({name: 'archivedRequestBatch'});
      }else{
        router.push({name: 'penRequestBatch'});
      }
      return false;
    });
    this.deactivateMultipleDraggableDialog = activateMultipleDraggableDialog('match-confirmation-dialog');
  },
  methods: {
    ...mapMutations('setNavigation', ['clearNavigation']),
    ...mapMutations('prbStudentSearch', ['setSelectedRecords']),
    formatPen,
    async initializeDetails() {
      this.demogValidationResult = []; // reset the validation results, on clicking next or previous
      this.loading = true;
      try {
        await this.retrievePenRequestByID();
        await this.retrieveBatchFile();
        this.possibleMatches = [];
        if ([PEN_REQ_BATCH_STUDENT_REQUEST_CODES.FIXABLE, PEN_REQ_BATCH_STUDENT_REQUEST_CODES.INFOREQ, PEN_REQ_BATCH_STUDENT_REQUEST_CODES.ERROR, PEN_REQ_BATCH_STUDENT_REQUEST_CODES.DUPLICATE]
          .some(status => status === this.prbStudent?.penRequestBatchStudentStatusCode)) {
          this.demogValidationResult = await this.getValidationIssuesByBatchStudentID(this.prbStudent.penRequestBatchStudentID);
          const hasValidationFailure = this.handleDemogValidationResult(this.demogValidationResult);
          if (!hasValidationFailure) {
            await this.runPenMatch();
          }
        } else {
          await this.getMatchedRecordsForStudent();
        }

        if (this.prbStudent?.sagaInProgress) {
          switch (this.prbStudent?.sagaName) {
          case PRB_SAGA_NAMES.PEN_REQUEST_BATCH_NEW_PEN_PROCESSING_SAGA:
            this.setSuccessAlert('The request to issue new PEN is currently being processed.');
            break;
          case PRB_SAGA_NAMES.PEN_REQUEST_BATCH_USER_MATCH_PROCESSING_SAGA:
            this.setSuccessAlert('The request to match student to Pen Request is currently being processed.');
            break;
          case PRB_SAGA_NAMES.PEN_REQUEST_BATCH_USER_UNMATCH_PROCESSING_SAGA:
            this.setSuccessAlert('The request to unmatch student to Pen Request is currently being processed.');
            break;
          }
        }
      } catch (error) {
        this.setFailureAlert('An error occurred while loading the PEN request. Please try again later.');
        console.log(error);
      }
      this.loading = false;
    },
    async retrievePenRequestByID() {
      const response = await ApiService.apiAxios.get(`${Routes['penRequestBatch'].FILES_URL}/${this.selectedIDs[this.currentRequest].penRequestBatchID}/students/${this.prbStudentID}`);
      if (response.data) {
        this.prbStudent = response.data;
        this.setModalStudentFromPrbStudent(this.prbStudent);
        this.prbStudentCopy = deepCloneObject(this.prbStudent);
      } else {
        throw new Error('No PrbStudent data for penRequestBatchStudentID:' + this.prbStudentID);
      }
    },
    async retrieveBatchFile() {
      const selectedFiles = this.$store.state[this.penRequestBatchStore].selectedFiles;
      if (!selectedFiles || selectedFiles.length === 0) {
        await this.retrieveSelectedFiles();
      }
      this.batchFile = this.$store.state[this.penRequestBatchStore].selectedFiles.find(file => file.penRequestBatchID === this.prbStudent.penRequestBatchID);
    },
    retrieveSelectedFiles() {
      const searchQueries = [
        {
          searchCriteriaList: [{
            key: 'penRequestBatchID',
            operation: SEARCH_FILTER_OPERATION.IN,
            value: this.batchIDs,
            valueType: SEARCH_VALUE_TYPE.UUID
          }],
        },
      ];

      const params = {
        params: {
          pageNumber: 0,
          pageSize: 15,
          searchQueries
        }
      };
      return ApiService.apiAxios.get(Routes['penRequestBatch'].FILES_URL, params)
        .then(response => {
          response.data && this.$store.commit(`${this.penRequestBatchStore}/setSelectedFiles`, response.data.content);
        });
    },
    updateInfoRequested(infoRequest) {
      this.loading = true;
      let req;
      if (infoRequest) {
        req = {
          infoRequest: infoRequest,
          penRequestBatchStudentStatusCode: PEN_REQ_BATCH_STUDENT_REQUEST_CODES.INFOREQ
        };
      } else {
        req = {
          infoRequest: '',
          penRequestBatchStudentStatusCode: PEN_REQ_BATCH_STUDENT_REQUEST_CODES.FIXABLE
        };
      }
      ApiService.apiAxios.put(`${Routes['penRequestBatch'].FILES_URL}/${this.prbStudent.penRequestBatchID}/students/${this.prbStudent.penRequestBatchStudentID}`, req)
        .then(response => {
          response.data && (this.prbStudent = response.data);
        })
        .catch(error => {
          this.setFailureAlert('An error occurred while updating the PEN request. Please try again later.');
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    async runPenMatch() {
      this.isLoadingMatches = true;
      this.showPossibleMatch = false;
      this.possibleMatches = [];
      try {
        const result = await getPossibleMatches(constructPenMatchObjectFromStudent(this.prbStudent));
        this.isIssuePenDisabled = false;
        this.showPossibleMatch = true;
        this.possibleMatches = result.data ?? [];
        if(this.prbStudent?.bestMatchPEN){ // rearrange the array and if there is a best match pen then put that record on top.
          const bestMatchPen = this.prbStudent?.bestMatchPEN;
          this.possibleMatches.sort(function (a, b) {
            return (a.pen !== bestMatchPen) - (b.pen !== bestMatchPen);
          });
        }
        this.isStudentDataUpdated = false; // pen match result is refreshed now enable the table.
      } catch (error) {
        console.log(error);
        this.setFailureAlert('PEN Match API call failed, please try again.');
      } finally {
        this.isLoadingMatches = false;
      }
    },
    setModalStudentFromPrbStudent(prbStudent) {
      this.modalStudent = deepCloneObject(prbStudent);
    },
    //TODO need to find out when we implement validation in next story, which other status maps to what and may be update it to get from a MAP.
    getPrbStatusCodeFromPenMatchStatus(penStatus) {
      if (penStatus === 'D1') {
        return 'MATCHEDSYS';
      }
      return 'FIXABLE';
    },
    async confirmToProceed() {
      let result = true;
      if (this.demogValidationResult.length > 0) {
        result = await this.$refs.confirmationDialog.open('Are you sure you want to proceed?', null,
          {
            width: '680px',
            messagePadding: 'px-4 pt-1',
            color: '',
            dark: false,
            titleBold: true,
            closeIcon: true,
            divider: true,
            resolveText: 'Confirm'
          });
      }
      return result;
    },
    async issueNewPen() {
      let result = await this.confirmToProceed();
      if (!result) {
        return;
      }
      this.isIssuingNewPen = true;
      const req = {
        twinStudentIDs: this.possibleMatches.map(match => match.studentID),
        prbStudent: this.prbStudent
      };
      ApiService.apiAxios.post(`${Routes['penRequestBatch'].FILES_URL}/${this.prbStudent.penRequestBatchID}/students/${this.prbStudent.penRequestBatchStudentID}/issueNewPen`, req)
        .then(response => {
          if (response.data) {
            this.prbStudent.sagaInProgress = true;
            this.setSuccessAlert('Your request to issue new PEN is accepted.');
          }
        })
        .catch(error => {
          if(error?.response?.data?.code === 409) {
            this.setFailureAlert('Another saga is in progress for this file, please try again later.');
          } else {
            this.setFailureAlert('An error occurred while issuing new PEN. Please try again later.');
          }
          console.log(error);
        })
        .finally(() => {
          this.isIssuingNewPen = false;
        });
    },
    retrievePenRequestsWithSameAssignedPen(pen) {
      const params = {
        params: {
          pageNumber: 0,
          searchQueries: [{
            searchCriteriaList: [
              {key: 'penRequestBatchEntity.penRequestBatchID', operation: SEARCH_FILTER_OPERATION.EQUAL, value: this.prbStudent.penRequestBatchID, valueType: SEARCH_VALUE_TYPE.UUID, condition: SEARCH_CONDITION.AND},
              {key: 'assignedPEN', operation: SEARCH_FILTER_OPERATION.EQUAL, value: pen, valueType: SEARCH_VALUE_TYPE.STRING, condition: SEARCH_CONDITION.AND}
            ],
          }],
        }
      };

      return ApiService.apiAxios
        .get(Routes['penRequestBatch'].STUDENTS_SEARCH_URL, params)
        .then(response => {
          return response.data?.content;
        })
        .catch(error => {
          this.setFailureAlert('An error occurred while loading the PEN requests. Please try again later.');
          console.log(error);
          throw error;
        });
    },
    /**
     * This method is responsible to do match/unmatch of student to Pen Request.
     * filter the matched row from possible matches to mark them twin.
     *
     * @param student the matched/unmatched student
     * @param buttonText whether match or unmatch was clicked.
     * @returns {Promise<void>}
     */
    async matchUnmatchStudentToPRBStudent(student, buttonText) {
      let operation;
      if ('Match' === buttonText) {
        const result = await this.confirmToProceed();
        if (!result) {
          return;
        }

        this.isMatchingToStudentRecord = true;
        try {
          const penRequests = await this.retrievePenRequestsWithSameAssignedPen(student.pen);
          if(penRequests?.length > 0) {
            this.setFailureAlert('This PEN already used.');
            this.isMatchingToStudentRecord = false;
            return;
          }
        } catch (error) {
          this.isMatchingToStudentRecord = false;
          return;
        }

        this.prbStudent.assignedPEN = student.pen;
        this.prbStudent.studentID = student.studentID;
        operation = 'match';
      } else {
        operation = 'unmatch';
      }
      this.isMatchingToStudentRecord = true;
      const payload = {
        prbStudent: this.prbStudent,
        studentID: student.studentID,
        matchedPEN: student.pen,
        matchedStudentIDList: this.possibleMatches.filter(el => el.studentID !== student.studentID).map(el => el.studentID)
      };
      const params = {
        penNumbersInOps: student.pen
      };
      ApiService.apiAxios.post(`${Routes['penRequestBatch'].FILES_URL}/${this.prbStudent.penRequestBatchID}/students/${this.prbStudent.penRequestBatchStudentID}/user-${operation}`, payload, {params})
        .then(response => {
          if (response.data) {
            this.sagaId = response.data;
            this.prbStudent.sagaInProgress = true;
            this.setSuccessAlert(`Your request to ${operation} student to Pen Request is accepted.`);
          }
        })
        .catch(error => {
          if (error?.response?.data?.code === 409) {
            this.setFailureAlert(error?.response?.data?.message);
          }
          this.setFailureAlert(`Your request to ${operation} student to Pen Request could not be accepted,  Please try again later.`);
          console.log(error);
        })
        .finally(() => {
          this.isMatchingToStudentRecord = false;
        });
    },
    /**
     * this function returns stored possible matches from DB for a particular student, backed by PEN_MATCH_API,
     * and not from fresh run of  pen match algorithm.
     * @returns {Promise<void>}
     */
    async getMatchedRecordsForStudent() {
      this.isLoadingMatches = true;
      this.showPossibleMatch = false;
      this.possibleMatches = [];
      try {
        this.possibleMatches = await getMatchedRecordssWithDemographicsByStudent(this.prbStudent?.studentID, true);
        this.showPossibleMatch = true;
      } catch (error) {
        console.log(error);
        this.setFailureAlert('PEN Match API call failed, please try again.');
      } finally {
        this.isLoadingMatches = false;
      }

    },
    async refreshMatchResults() {
      await this.runPenMatch();
    },
    handlePRBSagaNotification(notificationData) {
      const updatedPrbStudent = JSON.parse(notificationData.eventPayload);
      if (updatedPrbStudent?.penRequestBatchStudentID === this.prbStudent.penRequestBatchStudentID) {
        if (notificationData.sagaStatus === 'COMPLETED') {
          switch (notificationData?.sagaName) {
          case PRB_SAGA_NAMES.PEN_REQUEST_BATCH_NEW_PEN_PROCESSING_SAGA:
            if (this.sagaId) {
              this.setSuccessAlert('Your request to issue new PEN is now completed.');
            } else {
              this.setSuccessAlert(`${updatedPrbStudent.updateUser} issued a new PEN to this pen request.`);
            }
            break;
          case PRB_SAGA_NAMES.PEN_REQUEST_BATCH_USER_MATCH_PROCESSING_SAGA:
            if (this.sagaId) {
              this.setSuccessAlert('Your request to match student to this Pen Request is now completed.');
            } else {
              this.setSuccessAlert(`${updatedPrbStudent.updateUser} matched a student to this Pen Request.`);
            }
            break;
          case PRB_SAGA_NAMES.PEN_REQUEST_BATCH_USER_UNMATCH_PROCESSING_SAGA:
            if (this.sagaId) {
              this.setSuccessAlert('Your request to unmatch student to this Pen Request is now completed.');
            } else {
              this.setSuccessAlert(`${updatedPrbStudent.updateUser} unmatched student from this Pen Request.`);
            }
            break;
          }
          this.setSelectedRecords();
          this.initializeDetails();
          this.prbStudent.sagaInProgress = false;
          this.sagaId = undefined; // change it after the saga is completed.
        } else if (notificationData.sagaStatus === 'INITIATED') {
          this.prbStudent.sagaInProgress = true;
        }
      }
    },
    handleStudentUpdateEvent(notificationData) {
      try {
        const student = JSON.parse(notificationData.eventPayload);
        if (student?.pen && (this.possibleMatches?.some(el => el?.pen === student.pen))) {
          this.setWarningAlert(`Student details for ${student.pen}, present in possible matches is updated by ${student.updateUser}. Please select this record from pen request files again.`);
          this.isStudentDataUpdated = true;
        }
      } catch (e) {
        console.error(e);
      }
    },
    async getValidationIssuesByBatchStudentID(prbStudentID) {
      const result = await ApiService.apiAxios.get(Routes.penRequestBatch.ROOT_ENDPOINT + `/students/${prbStudentID}/validation-issues`);
      return result.data;
    },
    isNewPenDisabledForSchool(){
      const mincode = this.batchFile?.mincode;
      if (mincode?.length > 5) {
        if (mincode.substring(3, 5) === '90' || mincode === '10200030') { // summer school or sfas
          return true;
        }
      }
      return false;
    },
    async runDemogValidation(modalStudent) {
      try {
        const payload = {
          student: {
            ...modalStudent
          }
        };
        const result = await getDemogValidationResults(payload);
        return this.handleDemogValidationResult(result);
      } catch (error) {
        console.log(error);
        this.setFailureAlert('Demographics validation call failed, please try again.');
      }
    },
    handleDemogValidationResult(result) {
      this.demogValidationResult = result.map(y => {
        y.dataFieldName = PEN_REQUEST_STUDENT_VALIDATION_FIELD_CODES_TO_STUDENT_DETAILS_FIELDS_MAPPER[y.penRequestBatchValidationFieldCode];
        y.uiFieldName = this.prbValidationFieldCodes.find(obj => obj.code === y.penRequestBatchValidationFieldCode)?.label;
        y.description = this.prbValidationIssueTypeCodes.find(obj => obj.code === y.penRequestBatchValidationIssueTypeCode)?.description || y.penRequestBatchValidationIssueTypeCode;
        return y;
      });
      this.validationErrorFields = this.demogValidationResult.filter(x => x.penRequestBatchValidationIssueSeverityCode === 'ERROR');
      this.validationWarningFields = this.demogValidationResult.filter(x => x.penRequestBatchValidationIssueSeverityCode === 'WARNING');

      if (!(this.prbStudent.penRequestBatchStudentStatusCode === PEN_REQ_BATCH_STUDENT_REQUEST_CODES.MATCHEDSYS
        || this.prbStudent.penRequestBatchStudentStatusCode === PEN_REQ_BATCH_STUDENT_REQUEST_CODES.MATCHEDUSR)) {
        this.hasValidationIssues = this.validationErrorFields?.length > 0;
        return this.hasValidationIssues;
      }else{
        this.demogValidationResult = [];
        this.hasValidationIssues = false;
        this.validationErrorFields = [];
        this.validationWarningFields = [];
        return false;
      }
    },
    showMatchButton() {
      return (PEN_REQ_BATCH_STUDENT_REQUEST_CODES.FIXABLE === this.prbStudent.penRequestBatchStudentStatusCode
        || PEN_REQ_BATCH_STUDENT_REQUEST_CODES.DUPLICATE === this.prbStudent.penRequestBatchStudentStatusCode
        || PEN_REQ_BATCH_STUDENT_REQUEST_CODES.INFOREQ === this.prbStudent.penRequestBatchStudentStatusCode
        || (!this.demogValidationResult.some(x => x.penRequestBatchValidationIssueSeverityCode === 'ERROR')
          && PEN_REQ_BATCH_STUDENT_REQUEST_CODES.ERROR === this.prbStudent.penRequestBatchStudentStatusCode));
    },
    showUnmatchButton(matchedStudent) {
      return ([PEN_REQ_BATCH_STUDENT_REQUEST_CODES.MATCHEDSYS, PEN_REQ_BATCH_STUDENT_REQUEST_CODES.MATCHEDUSR]
        .some(element => element === this.prbStudent.penRequestBatchStudentStatusCode) && matchedStudent.studentID === this.prbStudent.studentID);
    },
    grayoutPossibleMatches(matchedStudent) {
      return (this.prbStudent.penRequestBatchStudentStatusCode === PEN_REQ_BATCH_STUDENT_REQUEST_CODES.NEWPENUSR && this.prbStudent.assignedPEN != matchedStudent.pen) 
        || !!matchedStudent.possibleMatchedToStudent;
    },
  }
};
</script>

<style scoped>
.batch-title {
  font-size: 1.065rem;
}

.pre-style {
  white-space: pre-wrap; /* Since CSS 2.1 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word;
  max-height: 10em;
  overflow-y: auto;
}

.pen-placeholder {
  margin-right: 5.7em;
}

#bottom-table /deep/ table th,
#top-table /deep/ table th {
  border-bottom: none !important;
  font-size: 0.875rem;
  font-weight: normal;
  color: rgba(0, 0, 0, 0.87) !important;
  height: 1.5rem;
}


.details-table /deep/ table > tbody > tr > td {
  height: 1.5rem;
}

.details-table /deep/ table > tbody > tr:hover {
  background: transparent !important;
}

.details-table /deep/ table > tbody > tr:not(:last-child) > td {
  border-bottom: none !important;
}

.full-width {
  margin-left: -32px;
  margin-right: -32px;
}

pre {
  font-family: inherit;
  font-size: inherit;
}
</style>
