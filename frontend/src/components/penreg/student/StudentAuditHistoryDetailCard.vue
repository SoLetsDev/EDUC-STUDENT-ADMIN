<template>
  <v-card class="pl-4 auditHistoryDetail" height="auto" width="100%" elevation=0>
    <StudentDetailsTextFieldReadOnly :disabled="false"
                                     :model="formatPen(studentHistoryDetail.pen)"
                                     :displayValue="showPEN"
                                     :name="prefixFieldName(STUDENT_DETAILS_FIELDS.PEN)" colspan="4" label="PEN"
                                     labelSpan="4"></StudentDetailsTextFieldReadOnly>

    <StudentDetailsTextFieldReadOnly :model="getDemogCode()" :name="prefixFieldName(STUDENT_DETAILS_FIELDS.DEMOG_CODE)"
                                     :disabled="false"
                                     :highlight="highlightDiff && !!studentHistoryDetail.demogCode_diff" colspan="4"
                                     label="Demog Code"
                                     labelSpan="4"></StudentDetailsTextFieldReadOnly>
    <StudentDetailsTextFieldReadOnly v-if="studentHistoryDetail.documentTypeCode" :model="getDocumentTypeLabel()" :name="prefixFieldName(STUDENT_DETAILS_FIELDS.DOC_TYPE_CODE)"
                                     :disabled="false"
                                     :highlight="highlightDiff && !!studentHistoryDetail.documentTypeCode_diff" colspan="4"
                                     label="Document Type Code"
                                     labelSpan="4"></StudentDetailsTextFieldReadOnly>
    <StudentDetailsTextFieldReadOnly v-if="studentHistoryDetail.dateOfConfirmation" :model="getDateOfConfirmation()" :name="prefixFieldName(STUDENT_DETAILS_FIELDS.DATE_OF_CONFIRMATION)"
                                     :disabled="false"
                                     :highlight="highlightDiff && !!studentHistoryDetail.dateOfConfirmation_diff" colspan="4"
                                     label="Date Of Confirmation"
                                     labelSpan="4"></StudentDetailsTextFieldReadOnly>

    <StudentDetailsTextFieldReadOnly :disabled="false"
                                     :highlight="highlightDiff && !!studentHistoryDetail.legalLastName_diff"
                                     :model="studentHistoryDetail.legalLastName"
                                     :name="prefixFieldName(STUDENT_DETAILS_FIELDS.LEGAL_LAST_NAME)" colspan="8"
                                     label="Legal Surname"
                                     labelSpan="4"></StudentDetailsTextFieldReadOnly>

    <StudentDetailsTextFieldReadOnly :disabled="false"
                                     :highlight="highlightDiff && !!studentHistoryDetail.legalFirstName_diff"
                                     :model="studentHistoryDetail.legalFirstName"
                                     :name="prefixFieldName(STUDENT_DETAILS_FIELDS.LEGAL_FIRST_NAME)" colspan="8"
                                     label="Legal Given"
                                     labelSpan="4"></StudentDetailsTextFieldReadOnly>

    <StudentDetailsTextFieldReadOnly :disabled="false"
                                     :highlight="highlightDiff && !!studentHistoryDetail.legalMiddleNames_diff"
                                     :model="studentHistoryDetail.legalMiddleNames || ''"
                                     :name="prefixFieldName(STUDENT_DETAILS_FIELDS.LEGAL_MIDDLE_NAMES)" colspan="8"
                                     label="Legal Middle"
                                     labelSpan="4"></StudentDetailsTextFieldReadOnly>

    <StudentDetailsTextFieldReadOnly :disabled="false"
                                     :highlight="highlightDiff && !!studentHistoryDetail.usualLastName_diff"
                                     :model="studentHistoryDetail.usualLastName || ''"
                                     :name="prefixFieldName(STUDENT_DETAILS_FIELDS.USUAL_LAST_NAME)" colspan="8"
                                     label="Usual Surname"
                                     labelSpan="4"></StudentDetailsTextFieldReadOnly>

    <StudentDetailsTextFieldReadOnly :disabled="false"
                                     :highlight="highlightDiff && !!studentHistoryDetail.usualFirstName_diff"
                                     :model="studentHistoryDetail.usualFirstName || ''"
                                     :name="prefixFieldName(STUDENT_DETAILS_FIELDS.USUAL_FIRST_NAME)" colspan="8"
                                     label="Usual Given"
                                     labelSpan="4"></StudentDetailsTextFieldReadOnly>

    <StudentDetailsTextFieldReadOnly :disabled="false"
                                     :highlight="highlightDiff && !!studentHistoryDetail.usualMiddleNames_diff"
                                     :model="studentHistoryDetail.usualMiddleNames || ''"
                                     :name="prefixFieldName(STUDENT_DETAILS_FIELDS.USUAL_MIDDLE_NAMES)" colspan="8"
                                     label="Usual Middle"
                                     labelSpan="4"></StudentDetailsTextFieldReadOnly>

    <StudentDetailsTextFieldReadOnly :model="studentHistoryDetail.genderCode || ''"
                                     :disabled="false"
                                     :highlight="highlightDiff && !!studentHistoryDetail.genderCode_diff"
                                     :name="prefixFieldName(STUDENT_DETAILS_FIELDS.GENDER_CODE)" colspan="1"
                                     label="Gender"
                                     labelSpan="4"></StudentDetailsTextFieldReadOnly>

    <StudentDetailsTextFieldReadOnly :model="formatDob(studentHistoryDetail.dob || '', 'uuuu-MM-dd')"
                                     :disabled="false"
                                     :highlight="highlightDiff && !!studentHistoryDetail.dob_diff"
                                     :name="prefixFieldName(STUDENT_DETAILS_FIELDS.DOB)" colspan="4"
                                     label="Date of Birth"
                                     labelSpan="4"></StudentDetailsTextFieldReadOnly>

    <StudentDetailsTextFieldReadOnly :model="studentHistoryDetail.gradeCode || ''"
                                     :disabled="false"
                                     :grade-level="getGradeLabel()"
                                     :highlight="highlightDiff && !!studentHistoryDetail.gradeCode_diff"
                                     :name="prefixFieldName(STUDENT_DETAILS_FIELDS.GRADE_CODE)" colspan="1"
                                     label="Grade"
                                     labelSpan="4">
      <v-col cols="3" class="textFieldColumn gradeLabelColumn">
        <v-text-field
            class="onhoverEdit customNoBorder onhoverPad"
            :value="getGradeLabel()"
            id='gradeLabel'
            color="#000000"
            dense
            readonly
            tabindex="-1"
            :disabled="true"
        ></v-text-field>
      </v-col>
    </StudentDetailsTextFieldReadOnly>

    <StudentDetailsTextFieldReadOnly :model="studentHistoryDetail.gradeYear || ''"
                                     :disabled="false"
                                     :highlight="highlightDiff && studentHistoryDetail.gradeYear_diff"
                                     :name="prefixFieldName(STUDENT_DETAILS_FIELDS.GRADE_YEAR)" colspan="4"
                                     label="Grade School Year"
                                     labelSpan="4"></StudentDetailsTextFieldReadOnly>

    <StudentDetailsTextFieldReadOnly :disabled="false"
                                     :highlight="highlightDiff && studentHistoryDetail.postalCode_diff"
                                     :model="formatPostalCode(studentHistoryDetail.postalCode)"
                                     :name="prefixFieldName(STUDENT_DETAILS_FIELDS.POSTAL_CODE)" colspan="4"
                                     label="Postal Code"
                                     labelSpan="4"></StudentDetailsTextFieldReadOnly>

    <StudentDetailsTextFieldReadOnly max-length="9" min-length="8"
                                     :name="prefixFieldName(STUDENT_DETAILS_FIELDS.MINCODE)"
                                     :highlight="highlightDiff && studentHistoryDetail.mincode_diff"
                                     :model="studentHistoryDetail.mincode" :has-edits="false"
                                     colspan="2" label="Mincode" labelSpan="4"
                                     :disabled="false">
      <v-col class="textFieldColumn" cols="4">
        <v-text-field
            :value="getSchoolName(studentHistoryDetail.mincode)"
            class="onhoverEdit customNoBorder onhoverPad"
            dense
            readonly
            :disabled="false"
        ></v-text-field>
      </v-col>
    </StudentDetailsTextFieldReadOnly>

    <StudentDetailsTextFieldReadOnly :disabled="false"
                                     :highlight="highlightDiff && studentHistoryDetail.localID_diff"
                                     :model="studentHistoryDetail.localID || ''"
                                     :name="prefixFieldName(STUDENT_DETAILS_FIELDS.LOCAL_ID)" colspan="6"
                                     label="Local ID"
                                     labelSpan="4"></StudentDetailsTextFieldReadOnly>

    <StudentDetailsTextFieldReadOnly :disabled="false"
                                     :highlight="highlightDiff && studentHistoryDetail.trueStudentID_diff"
                                     :model="formatPen(studentHistoryDetail.truePen || '')"
                                     :name="prefixFieldName(STUDENT_DETAILS_FIELDS.TRUE_STUDENT_ID)" colspan="6"
                                     label="Merged To"
                                     labelSpan="4"></StudentDetailsTextFieldReadOnly>

    <v-row no-gutters class="py-1">
      <v-col cols="4">
        <p :class="['labelField', highlightDiff && !!studentHistoryDetail.memo_diff && !studentHistoryDetail.memo? 'diff-value' : 'plain-value' ]">
          Memo</p>
      </v-col>
      <v-col class="textAreaColumn mr-2">
        <v-textarea
            :id="prefixFieldName(STUDENT_DETAILS_FIELDS.MEMO)"
            v-model="studentHistoryDetail.memo"
            :class="['onhoverEdit', 'bolder', 'customNoBorder', highlightDiff && !!studentHistoryDetail.memo_diff? 'diff-value' : 'plain-value' ]"
            :disabled="false"
            :no-resize="true"
            :outlined="false"
            :readonly="true"
            color="#000000"
            dense
            maxlength="4000"
            rows="2"
        ></v-textarea>
      </v-col>
    </v-row>

    <StudentDetailsTextFieldReadOnly :disabled="false"
                                     :highlight="highlightDiff && !!studentHistoryDetail.statusCode_diff"
                                     :model="getStatusCode()"
                                     :name="prefixFieldName(STUDENT_DETAILS_FIELDS.STATUS_CODE)"
                                     colspan="4" label="Status" labelSpan="4"
                                     no-gutters></StudentDetailsTextFieldReadOnly>
    <slot></slot>
  </v-card>
</template>

<script>
import {mapGetters} from 'vuex';
import {STUDENT_DETAILS_FIELDS} from '@/utils/constants';
import StudentDetailsTextFieldReadOnly from '@/components/penreg/student/StudentDetailsTextFieldReadOnly';
import {formatDob, formatPen, formatPostalCode} from '@/utils/format';
import moment from 'moment';

export default {
  name: 'StudentAuditHistoryDetailCard',
  props: {
    studentHistoryDetail: {
      type: Object,
      required: true
    },
    highlightDiff: {
      type: Boolean,
      default: true
    },
    idPrefix: {
      type: String,
      default: ''
    },
    showPEN: {
      type: Boolean,
      default: true
    }
  },
  async beforeMount() {
    await this.$store.dispatch('app/getCodes');
  },
  components: {
    StudentDetailsTextFieldReadOnly,
  },
  data() {
    return {
      STUDENT_DETAILS_FIELDS: STUDENT_DETAILS_FIELDS,
    };
  },
  computed: {
    ...mapGetters('student', ['demogCodeObjects', 'statusCodeObjects', 'gradeCodeObjects','documentTypeCodes']),
  },
  methods: {
    formatPen,
    formatPostalCode,
    formatDob,
    getGradeLabel() {
      return this.studentHistoryDetail.gradeCode ? this.gradeCodeObjects.filter(it => (it.gradeCode === this.studentHistoryDetail.gradeCode))[0].label : '';
    },
    getStatusCode() {
      return this.studentHistoryDetail.statusCode ? this.statusCodeObjects.filter(it => (it.statusCode === this.studentHistoryDetail.statusCode))[0].label : '';
    },
    getDemogCode() {
      return this.studentHistoryDetail.demogCode ? this.demogCodeObjects.filter(it => (it.demogCode === this.studentHistoryDetail.demogCode))[0].label : '';
    },
    getSchoolName(mincode) {
      return this.$store.state['app'].mincodeSchoolNames.get(mincode?.replace(' ', ''));
    },
    prefixFieldName(fieldName) {
      return this.idPrefix + fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
    },
    getDateOfConfirmation(){
      return this.studentHistoryDetail.dateOfConfirmation ? this.frontEndDateTimeFormat(this.studentHistoryDetail.dateOfConfirmation) : '';
    },
    getDocumentTypeLabel(){
      return this.studentHistoryDetail.documentTypeCode ? this.documentTypeCodes.filter(it => (it.documentTypeCode === this.studentHistoryDetail.documentTypeCode))[0]?.label : '';
    },
    frontEndDateTimeFormat(date) {
      return moment(JSON.stringify(date), 'YYYY-MM-DDTHH:mm:ss').format('YYYY/MM/DD h:mm:ss A');
    }
  }
};
</script>

<style scoped>

div.auditHistoryDetail {
  background-color: rgba(0, 0, 0, 0.06);
}

.diff-value >>> .v-text-field__slot textarea {
  font-weight: bold;
  color: #008000 !important;
}

p.diff-value {
  font-weight: bold;
  color: #008000 !important;
}

.auditHistoryDetail {
  font-size: 0.95rem;
}

.auditHistoryDetail >>> input {
  font-size: 0.95rem;
}

.plain-value >>> .v-text-field__slot input {
  font-weight: bold;
  color: #000000 !important;
}

.diff-value >>> .v-text-field__slot input {
  font-weight: bold;
  color: #008000 !important;
}
</style>
