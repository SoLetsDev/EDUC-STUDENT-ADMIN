<template>
  <div>
    <v-card flat :disabled="!isProvidePenEnabledForUser">
      <v-row class="mx-0">
        <v-col cols="12" xl="6" lg="6" class="py-0">
          <v-row class="mx-0" justify="space-between">
            <v-col class="my-0 pl-0 py-0">
              <v-text-field
                      id="pen-search-text-field"
                      v-model="penSearchId"
                      label="PEN:"
                      disabled
                      clearable
                      class="pt-0"
              ></v-text-field>
            </v-col>
            <v-col class="my-0 mr-0 pr-0 py-0">
              <v-row justify="end" class="ma-0 pt-3">
                <PrimaryButton id="refresh-student-info" text="Refresh Student Info" :disabled="isRefreshStudInfoDisabled || !isProvidePenEnabledForUser" @click.native="refreshStudentInfo"></PrimaryButton>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="pr-3">
            <v-card class="ml-3" width="100%">
            <v-row no-gutters class="pt-2 px-2">
              <v-col cols="12" xl="3" lg="3" md="3" sm="3">
                <p class="mb-2">First:</p>
              </v-col>
              <v-col cols="12" xl="9" lg="9" md="9" sm="9">
                <p class="mb-2"><strong>{{ this.demographics.legalFirst || ''}}</strong></p>
              </v-col>
            </v-row>
            <v-row no-gutters class="pt-2 px-2">
              <v-col cols="12" xl="3" lg="3" md="3" sm="3">
                <p class="mb-2">Middle:</p>
              </v-col>
              <v-col cols="12" xl="9" lg="9" md="9" sm="9">
                <p class="mb-2"><strong>{{ this.demographics.legalMiddle || ''}}</strong></p>
              </v-col>
            </v-row>
            <v-row no-gutters class="pt-2 px-2">
              <v-col cols="12" xl="3" lg="3" md="3" sm="3">
                <p class="mb-2">Last:</p>
              </v-col>
              <v-col cols="12" xl="9" lg="9" md="9" sm="9">
                <p class="mb-2"><strong>{{ this.demographics.legalLast || ''}}</strong></p>
              </v-col>
            </v-row>
            <v-row no-gutters class="pt-2 px-2">
              <v-col cols="12" xl="3" lg="3" md="3" sm="3">
                <p class="mb-2">DOB:</p>
              </v-col>
              <v-col cols="12" xl="9" lg="9" md="9" sm="9">
                <p class="mb-2"><strong>{{ formatDob(this.demographics.dob,'uuuu-MM-dd', 'uuuu/MM/dd') }}</strong></p>
              </v-col>
            </v-row>
            <v-row no-gutters class="pt-2 px-2">
              <v-col cols="12" xl="3" lg="3" md="3" sm="3">
                <p class="mb-2">Gender:</p>
              </v-col>
              <v-col cols="12" xl="9" lg="9" md="9" sm="9">
                <p class="mb-2"><strong>{{ this.demographics.gender }}</strong></p>
              </v-col>
            </v-row>
          </v-card>
          </v-row>
        </v-col>
        <v-col cols="12" xl="6" lg="6" class="py-0 pl-0">
          <v-row class="pr-3 pt-3 d-flex justify-space-between">
            <MacroMenu
              :macros="completeMacros"
              @select="insertMacroText"
            />
            <PrimaryButton id="send-changes-to-student" text="Send Changes to Student" :disabled="isCompleteDisabled || !isProvidePenEnabledForUser" @click.native="sendChanges"></PrimaryButton>
          </v-row>
          <v-form ref="completeForm">
            <v-textarea
                    id="complete-comment-textarea"
                    name="description"
                    label="Enter comment"
                    v-model="request.completeComment"
                    :rules="completedRules"
                    filled
                    clearable
                    @input="replaceCompleteMacro"
                    class="pt-5"
                    rows="6"
                    ref="completeCommentTextarea"
            ></v-textarea>
          </v-form>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog
      v-model="dialog"
      max-width="400"
    >
      <v-card>
        <div class="px-4 pt-4">
          <p>Changes to student demographics do not match request.</p>
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>
          <PrimaryButton id="confirm-request-changes" text="Confirm" @click.native="confirmChanges"></PrimaryButton>
          <PrimaryButton id="confirm-request-changes" text="Cancel" @click.native="dialog = false"></PrimaryButton>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {formatDob} from '@/utils/format';
import ApiService from '../../common/apiService';
import { Routes, Statuses } from '@/utils/constants';
import { replaceMacro, insertMacro } from '@/utils/macro';
import { mapGetters, mapMutations } from 'vuex';
import PrimaryButton from '../util/PrimaryButton';
import alertMixin from '@/mixins/alertMixin';
import demographicsMixin from '@/mixins/demographicsMixin';
import MacroMenu from '../common/MacroMenu';
import {isValidLength} from '@/utils/validation';

export default {
  name: 'studentRequestComplete',
  components: {
    PrimaryButton,
    MacroMenu
  },
  mixins: [alertMixin, demographicsMixin],
  props: {
    request: {
      type: Object,
      required: true
    },
    enableActions: {
      type: Boolean,
      required: true
    },
    prepPut: {
      type: Function,
      required: true
    },
    beforeSubmit: {
      type: Function,
      required: true
    },
    submitted: {
      type: Function,
      required: true
    },
  },
  data () {
    return {
      validForm: false,
      requiredRules: [v => !!v || 'Required'],
      completedUpdateSuccess:null,
      notAPenErrorMessage: 'The provided PEN is not valid.',
      autoPenResults: null,
      numberOfDuplicatePenRequests:0,
      completeSagaInProgress: false,
      dialog: false,
    };
  },
  computed: {
    ...mapGetters('auth', ['userInfo', 'ACTION_UMP_REQUESTS_ROLE']),
    ...mapGetters('app', ['selectedRequest', 'requestType', 'requestTypeLabel']),
    ...mapGetters('notifications', ['notification']),
    actionName() {
      return 'SEND_UPDATE';
    },
    requestId() {
      return this.selectedRequest;
    },
    completeMacros() {
      return this.$store.getters[`${this.requestType}/completeMacros`] || [];
    },
    statusCodes() {
      return Statuses[this.requestType];
    },
    myself() {
      return {
        name: this.userInfo.userName,
        id: this.userInfo.userGuid
      };
    },
    isCompleteDisabled() {
      return !this.enableCompleteButton || !this.enableActions || this.request.studentRequestStatusCode === 'DRAFT' || this.request.studentRequestStatusCode === 'ABANDONED';
    },
    isCompleteDark(){
      return this.enableCompleteButton && this.enableActions && this.request.penRequestStatusCode!=='DRAFT' && this.request.penRequestStatusCode!=='ABANDONED';
    },
    isRefreshStudInfoDisabled(){
      return !this.enableActions || this.request.studentRequestStatusCode === 'DRAFT' || this.request.studentRequestStatusCode === 'ABANDONED';
    },
    isRefreshStudInfoDark(){
      return this.enableActions && this.request.penRequestStatusCode!=='DRAFT' && this.request.penRequestStatusCode!=='ABANDONED';
    },
    completedRules() {
      return isValidLength(4000, false);
    },
    isProvidePenEnabledForUser() {
      return this.ACTION_UMP_REQUESTS_ROLE;
    }
  },
  watch: {
    'request.completeComment': 'validateCompleteAction',
    'request.recordedPen': function(val) {
      this.penSearchId = val;
    },
    notification(val) {
      if (val) {
        const notificationData = val;
        if (notificationData && notificationData.studentRequestID && notificationData.studentRequestID === this.requestId && notificationData.sagaStatus === 'COMPLETED') {
          if (notificationData.sagaName === 'STUDENT_PROFILE_COMPLETE_SAGA') {
            this.setSuccessAlert(`${this.requestTypeLabel} completed and email sent to student.`);
            this.completeSagaInProgress = false;
          }
        }else if(this.penSearchId && notificationData.eventType === 'UPDATE_STUDENT' && notificationData.eventOutcome === 'STUDENT_UPDATED' && notificationData.eventPayload){
          const student = JSON.parse(notificationData.eventPayload);
          if(student?.pen === this.penSearchId && !this.completeSagaInProgress){
            this.setWarningAlert(`Student details for ${student.pen} is updated by ${student.updateUser}, Please do a search for the pen again.`);
            this.enableCompleteButton = false;
          }
        }
      }
    },
  },
  methods: {
    ...mapMutations('app', ['setRequest']),
    ...mapMutations('app', ['pushMessage']),
    formatDob,
    validateCompleteAction() {
      this.$refs.completeForm.validate();
    },
    replaceCompleteMacro() {
      this.request.completeComment = replaceMacro(this.request.completeComment, this.completeMacros);
    },
    sendChanges() {
      if(this.$refs.completeForm.validate()) {
        this.request.pen = this.penSearchId;

        if(this.differentDemographicsData(this.request, this.demographics)) {
          this.dialog = true;
        } else {
          this.completeRequest();
        }
      }
    },
    confirmChanges() {
      this.dialog = false;
      this.completeRequest();
    },
    completeRequest() {
      this.beforeSubmit();
      this.request.reviewer = this.myself.name;
      const params = {
        penNumbersInOps: this.request.pen
      };
      ApiService.apiAxios
        .post(Routes[this.requestType].COMPLETE_URL, this.prepPut(this.requestId, this.request),{params})
        .then(() => {
          this.setSuccessAlert('Your request to complete is accepted.');
          this.completeSagaInProgress = true;
        })
        .catch(error => {
          console.error(error);
          if (error?.response?.data?.code === 409) {
            this.setFailureAlert(error?.response?.data?.message);
          } else {
            this.setFailureAlert(`${this.requestTypeLabel} failed to update. Please navigate to the list and select this ${this.requestTypeLabel} again.`);
          }
          this.submitted();
        });
    },
    refreshStudentInfo() {
      if(this.penSearchId && this.penSearchId.length === 9) {
        this.searchByPen();
      } else {
        this.setFailureAlert(this.notAPenErrorMessage);
      }
    },
    differentDemographicsData(request, demographics) {
      return request.legalFirstName !== demographics.legalFirst ||
        (request.legalMiddleNames && demographics.legalMiddle && request.legalMiddleNames !== demographics.legalMiddle) ||
        request.legalLastName !== demographics.legalLast ||
        request.dob !== demographics.dob ||
        request.genderCode !== demographics.gender;
    },
    insertMacroText(macroText) {
      this.request.completeComment = insertMacro(macroText, this.request.completeComment, this.$refs.completeCommentTextarea.$refs.input);
    },
  }
};
</script>
