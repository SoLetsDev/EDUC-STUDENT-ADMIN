let baseRoot = '/api';
const authRoot = baseRoot + '/auth';
const penRequestBatchRoot = baseRoot + '/penRequestBatch';
const penRequestRoot = baseRoot + '/penRequest';
const sldRequestRoot = baseRoot + '/sld';
const studentRequestRoot = baseRoot + '/studentRequest';
const demographicRoot = baseRoot + '/studentDemographics';
const studentRoot = baseRoot + '/students';
const penServicesRoot = baseRoot + '/pen-services';
const schoolRequestRoot = baseRoot + '/schools';
const penTraxRoot = baseRoot + '/penTrax';
const penMatchRoot = baseRoot + '/penMatches';
const macroRoot = baseRoot + '/macros';
const nominalRollRoot= baseRoot+'/nominal-roll';

let object = {
  LOGIN: authRoot + '/login',
  LOGOUT: authRoot + '/logout',
  SESSION_EXPIRED: authRoot + '/logout?sessionExpired=true',
  REFRESH: authRoot + '/refresh',
  TOKEN: authRoot + '/token',
  USER: authRoot + '/user',
  SESSION_REMAINING_TIME: authRoot + '/user-session-remaining-time',

  penRequestBatch: {
    ROOT_ENDPOINT: penRequestBatchRoot,
    STATS_URL: penRequestBatchRoot + '/stats',
    FILES_URL: penRequestBatchRoot,
    SOURCE_URL: penRequestBatchRoot + '/source',
    SOURCE_METADATA_URL: penRequestBatchRoot + '/sourceMetadata',
    STUDENTS_SEARCH_URL: penRequestBatchRoot + '/students',
    STUDENT_STATUS_CODE_URL: penRequestBatchRoot + '/studentStatusCodes',
    MATCH_OUTCOME_URL: penRequestBatchRoot + '/matchOutcome',
    STUDENT_INFO_MACROS_URL: macroRoot + '/?businessUseTypeCode=PENREG&macroTypeCode=INFOREQ',
    PRB_VALIDATION_FIELD_CODE_URL: penRequestBatchRoot + '/prbValidationFieldCodes',
    PRB_VALIDATION_ISSUE_SEVERITY_CODE_URL: penRequestBatchRoot + '/prbValidationSeverityCodes',
    PRB_VALIDATION_ISSUE_TYPE_CODE_URL: penRequestBatchRoot + '/prbValidationTypeCodes',
  },

  penRequest: {
    ROOT_ENDPOINT: penRequestRoot,
    SEARCH_URL: penRequestRoot + '/',
    DUPLICATE_REQUESTS_URL: penRequestRoot + '/duplicatePenRequests',
    STATUSES_URL: penRequestRoot + '/codes/requeststatuses',
    DOCUMENT_TYPES_URL: penRequestRoot + '/codes/documentTypes',
    COMPLETE_URL: penRequestRoot + '/complete',
    REJECT_URL: penRequestRoot + '/reject',
    RETURN_URL: penRequestRoot + '/return',
    MACRO_URL: macroRoot + '/?businessUseTypeCode=GMP',
    UNLINK_URL: penRequestRoot + '/unlink',
    STATS_URL: penRequestRoot + '/stats'
  },

  sld: {
    ROOT_ENDPOINT: sldRequestRoot,
    STUDENT_HISTORY_URL: sldRequestRoot + '/studentHistory'
  },

  studentRequest: {
    ROOT_ENDPOINT: studentRequestRoot,
    SEARCH_URL: studentRequestRoot + '/',
    DUPLICATE_REQUESTS_URL: studentRequestRoot + '/duplicatePenRequests',
    STATUSES_URL: studentRequestRoot + '/codes/requeststatuses',
    DOCUMENT_TYPES_URL: studentRequestRoot + '/codes/documentTypes',
    COMPLETE_URL: studentRequestRoot + '/complete',
    REJECT_URL: studentRequestRoot + '/reject',
    RETURN_URL: studentRequestRoot + '/return',
    MACRO_URL: macroRoot + '/?businessUseTypeCode=UMP',
    STATS_URL: studentRequestRoot + '/stats'
  },

  student: {
    ROOT_ENDPOINT: studentRoot,
    SEARCH_URL: studentRoot + '/search',
    GENDER_CODE_URL: studentRoot + '/activeGenderCodes',
    DEMOG_CODE_URL: studentRoot + '/demogCodes',
    STATUS_CODE_URL: studentRoot + '/statusCodes',
    GRADE_CODE_URL: studentRoot + '/gradeCodes',
    HISTORY_ACTIVITY_CODE_URL: studentRoot + '/historyActivityCodes',
    GET_ALL_STUDENTS_BY_IDS: studentRoot + '/allStudents',
    DOC_TYPE_CODES_URL: studentRoot + '/document-type-codes'
  },
  SCHOOL_DATA_URL: schoolRequestRoot,
  penServices: {
    ROOT_ENDPOINT: penServicesRoot,
    VALIDATE_DEMOGRAPHICS: penServicesRoot + '/demog-validation',
    MACRO_URL: macroRoot + '/?businessUseTypeCode=PENREG&macroTypeCode=MERGE',
  },
  STUDENT_DATA_URL: studentRoot,
  SEARCH_BY_PEN: demographicRoot,
  PEN_TRAX_URL: penTraxRoot,
  penMatch: {
    ROOT_ENDPOINT: penMatchRoot,
    POSSIBLE_MATCHES: penMatchRoot + '/possible-match',
    POSSIBLE_MATCH_REASON_CODES: penMatchRoot + '/possible-match-reason-codes'
  },
  MACRO_URL: macroRoot,
  nominalRoll:{
    ROOT_ENDPOINT: nominalRollRoot
  },
};

//endpoints
export const Routes = Object.freeze(object);

export const Statuses = Object.freeze(
  {
    AUTO_MATCH_RESULT_CODES: {
      ONE_MATCH: 'ONEMATCH',
      MANY_MATCHES: 'MANYMATCHES',
      ZERO_MATCHES: 'ZEROMATCHES',
      RIGHT_PEN: 'RIGHTPEN',
      WRONG_PEN: 'WRONGPEN'
    },
    penRequest: {
      DRAFT: 'DRAFT',
      FIRST_REVIEW: 'INITREV',
      RETURNED: 'RETURNED',
      SECOND_REVIEW: 'SUBSREV',
      AUTO_MATCH: 'AUTO',
      MANUAL_MATCH: 'MANUAL',
      REJECTED: 'REJECTED',
      UNMATCHED: 'UNMATCHED',
      ABANDONED: 'ABANDONED'
    },
    studentRequest: {
      DRAFT: 'DRAFT',
      FIRST_REVIEW: 'INITREV',
      RETURNED: 'RETURNED',
      SECOND_REVIEW: 'SUBSREV',
      COMPLETED: 'COMPLETED',
      REJECTED: 'REJECTED',
      ABANDONED: 'ABANDONED'
    }
  }
);

export const REQUEST_TYPES = Object.freeze(
  {
    penRequest: {
      name: 'penRequest',
      label: 'PEN Request',
      searchLabel: 'Select PEN request statuses to view',
      path: '/gmp',
      detailName: 'GMP detail'
    },
    studentRequest: {
      name: 'studentRequest',
      label: 'UMP Request',
      searchLabel: 'Select UMP request statuses to view',
      path: '/ump',
      detailName: 'UMP detail',
      penName: 'recordedPen'
    },
    studentSearch: {
      name: 'studentSearch',
      label: 'Student Search',
      type: {
        basic: 'basic',
        advanced: 'advanced'
      },
      path: {
        basic: '/studentSearch/basic',
        advanced: '/studentSearch/advanced'
      }
    },
    student: {
      name: 'student',
      label: 'student detail',
      path: '/student/'
    },
    mergeStudents: {
      name: 'mergeStudents',
      label: 'Merge PENs',
      path: '/mergeStudents/'
    },
    penRequestBatch: {
      name: 'penRequestBatch',
      label: 'PEN Request Files',
      path: '/penRequestBatch',
    },
    archivedPENRequestBatch: {
      name: 'archivedRequestBatch',
      label: 'Archived PEN Request Files',
      path: '/archivedRequestBatch',
    },
    failedRequestBatch: {
      name: 'failedRequestBatch',
      label: 'Failed PEN Request Files',
      path: '/failedRequestBatch',
    }
  }
);
/**
 * Source of truth for field Names in  StudentDetails.vue and its child components.
 * @type {Readonly<{GRADE_CODE: string, TWINS: string, MINCODE: string, GRADE_YEAR: string, CREATED_DATE: string, LEGAL_FIRST_NAME: string, USUAL_LAST_NAME: string,
 * STATUS_CODE: string, GRAD_DATE: string, GENDER_CODE: string, MERGED_TO: string, LEGAL_LAST_NAME: string, POSTAL_CODE: string, DEMOG_CODE: string, TRAX_STATUS: string,
 * DOB: string, LEGAL_MIDDLE_NAMES: string, UPDATED_DATE: string, PEN: string, USUAL_MIDDLE_NAMES: string, MERGED_FROM: string, USUAL_FIRST_NAME: string, LOCAL_ID: string, MEMO: string}>}
 */
export const STUDENT_DETAILS_FIELDS = Object.freeze(
  {
    LEGAL_LAST_NAME: 'legalLastName',
    LEGAL_FIRST_NAME: 'legalFirstName',
    LEGAL_MIDDLE_NAMES: 'legalMiddleNames',
    USUAL_LAST_NAME: 'usualLastName',
    USUAL_FIRST_NAME: 'usualFirstName',
    USUAL_MIDDLE_NAMES: 'usualMiddleNames',
    GRADE_CODE: 'gradeCode',
    GRADE_YEAR: 'gradeYear',
    POSTAL_CODE: 'postalCode',
    TWINS: 'twins',
    MERGED_TO: 'mergedTo',
    MERGED_FROM: 'mergedFrom',
    DOB: 'dob',
    GENDER_CODE: 'genderCode',
    DEMOG_CODE: 'demogCode',
    TRAX_STATUS: 'traxStatus',
    GRAD_DATE: 'gradDate',
    CREATED_DATE: 'createdDate',
    UPDATED_DATE: 'updatedDate',
    LOCAL_ID: 'localID',
    MINCODE: 'mincode',
    MEMO: 'memo',
    PEN: 'pen',
    STATUS_CODE: 'statusCode',
    TRUE_STUDENT_ID: 'trueStudentID',
    DOC_TYPE_CODE: 'documentTypeCode',
    DATE_OF_CONFIRMATION: 'dateOfConfirmation'
  }
);


/*  can be made into an object, if more options are needed in the future for example
 *  export const STUDENT_MERGE_FIELDS = {
       FROM_PREFIX: 'mergeFrom_'
    };
 **/
export const STUDENT_MERGE_FIELD_PREFIX = 'mergeFrom_';
export const STUDENT_MERGE_DETAILS_FIELDS = Object.freeze(
  {
    LEGAL_LAST_NAME: `${STUDENT_MERGE_FIELD_PREFIX}${STUDENT_DETAILS_FIELDS.LEGAL_LAST_NAME}`,
    LEGAL_FIRST_NAME: `${STUDENT_MERGE_FIELD_PREFIX}${STUDENT_DETAILS_FIELDS.LEGAL_FIRST_NAME}`,
    LEGAL_MIDDLE_NAMES: `${STUDENT_MERGE_FIELD_PREFIX}${STUDENT_DETAILS_FIELDS.LEGAL_MIDDLE_NAMES}`,
    USUAL_LAST_NAME: `${STUDENT_MERGE_FIELD_PREFIX}${STUDENT_DETAILS_FIELDS.USUAL_LAST_NAME}`,
    USUAL_FIRST_NAME: `${STUDENT_MERGE_FIELD_PREFIX}${STUDENT_DETAILS_FIELDS.USUAL_FIRST_NAME}`,
    USUAL_MIDDLE_NAMES: `${STUDENT_MERGE_FIELD_PREFIX}${STUDENT_DETAILS_FIELDS.USUAL_MIDDLE_NAMES}`,
    GENDER_CODE: `${STUDENT_MERGE_FIELD_PREFIX}${STUDENT_DETAILS_FIELDS.GENDER_CODE}`,
    DOB: `${STUDENT_MERGE_FIELD_PREFIX}${STUDENT_DETAILS_FIELDS.DOB}`,
    MINCODE: `${STUDENT_MERGE_FIELD_PREFIX}${STUDENT_DETAILS_FIELDS.MINCODE}`,
    LOCAL_ID: `${STUDENT_MERGE_FIELD_PREFIX}${STUDENT_DETAILS_FIELDS.LOCAL_ID}`,
    POSTAL_CODE: `${STUDENT_MERGE_FIELD_PREFIX}${STUDENT_DETAILS_FIELDS.POSTAL_CODE}`,
  }
);

export const PEN_REQUEST_STUDENT_VALIDATION_FIELD_CODES_TO_STUDENT_DETAILS_FIELDS_MAPPER = Object.freeze(
  {
    LOCALID: STUDENT_DETAILS_FIELDS.LOCAL_ID,
    LEGALFIRST: STUDENT_DETAILS_FIELDS.LEGAL_FIRST_NAME,
    LEGALMID: STUDENT_DETAILS_FIELDS.LEGAL_MIDDLE_NAMES,
    LEGALLAST: STUDENT_DETAILS_FIELDS.LEGAL_LAST_NAME,
    USUALFIRST: STUDENT_DETAILS_FIELDS.USUAL_FIRST_NAME,
    USUALMID: STUDENT_DETAILS_FIELDS.USUAL_MIDDLE_NAMES,
    USUALLAST: STUDENT_DETAILS_FIELDS.USUAL_LAST_NAME,
    POSTALCODE: STUDENT_DETAILS_FIELDS.POSTAL_CODE,
    GRADECODE: STUDENT_DETAILS_FIELDS.GRADE_CODE,
    BIRTHDATE: STUDENT_DETAILS_FIELDS.DOB,
    GENDER: STUDENT_DETAILS_FIELDS.GENDER_CODE
  }
);

export const NOMINAL_ROLL_STUDENT_FIELDS_TO_STUDENT_DETAILS_FIELDS_MAPPER = Object.freeze(
  {
    givenNames: { name: STUDENT_DETAILS_FIELDS.LEGAL_FIRST_NAME, label: 'Legal Given'},
    surname: { name: STUDENT_DETAILS_FIELDS.LEGAL_LAST_NAME, label: 'Legal Surname'},
    grade: { name: STUDENT_DETAILS_FIELDS.GRADE_CODE, label: 'Grade'},
    birthDate: { name: STUDENT_DETAILS_FIELDS.DOB, label: 'Birth Date'},
    gender: { name: STUDENT_DETAILS_FIELDS.GENDER_CODE, label: 'Gen'},
    schoolNumber: { name: STUDENT_DETAILS_FIELDS.MINCODE, label: 'Mincode'},
  }
);

export const STUDENT_DETAILS_FIELDS_TO_NOMINAL_ROLL_STUDENT_FIELDS_MAPPER = Object.freeze(
  Object.fromEntries(Object.entries(NOMINAL_ROLL_STUDENT_FIELDS_TO_STUDENT_DETAILS_FIELDS_MAPPER).map(([key, value]) => [value.name, key]))
);

export const STUDENT_CODES = Object.freeze(
  {
    ACTIVE: 'A',
    DECEASED: 'D',
    DELETED: 'X',
    MERGED: 'M'
  }
);
export const STUDENT_DEMOG_CODES = Object.freeze(
  {
    ACTIVE: 'A',
    CONFIRMED: 'C'
  }
);
export const PEN_REQ_BATCH_STUDENT_REQUEST_CODES = Object.freeze(
  {
    FIXABLE: 'FIXABLE',
    INFOREQ: 'INFOREQ',
    MATCHEDSYS: 'MATCHEDSYS',
    MATCHEDUSR: 'MATCHEDUSR',
    NEWPENSYS: 'NEWPENSYS',
    NEWPENUSR: 'NEWPENUSR',
    ERROR: 'ERROR',
    REPEAT: 'REPEAT',
    LOADED: 'LOADED',
    DUPLICATE: 'DUPLICATE',
  }
);
export const PEN_REQ_BATCH_STATUS_CODES = Object.freeze(
  {
    HOLD_SIZE: 'HOLD_SIZE',
    DUPLICATE: 'DUPLICATE',
    ACTIVE: 'ACTIVE',
    ARCHIVED: 'ARCHIVED',
    REARCHIVED: 'REARCHIVED',
    UNARCHIVED: 'UNARCHIVED',
    UNARCH_CHG: 'UNARCH_CHG',
    LOAD_FAIL: 'LOADFAIL',
  }
);
export const PAGE_TITLES = Object.freeze(
  {
    COMPARE_STUDENTS: 'Compare/View',
    DASHBOARD: 'Dashboard',
    GMP: 'Get My Pen',
    GMP_DETAILS: 'GetMyPen Request Details',
    UMP: 'Update My Pen',
    UMP_DETAILS: 'UMP Details',
    STUDENT_SEARCH: 'Student Search',
    STUDENT_DETAILS: 'Student Details',
    MERGE_STUDENTS: 'Merge PENs',
    PEN_REQ_FILES: 'PEN Request Files',
    PEN_MATCH: 'PEN Match',
    PEN_REQ_BATCH_STUDENT_LIST: 'PEN Request List',
    PEN_REQ_BATCH_STUDENT_DETAILS: 'PEN Request Details',
    CREATE_NEW_PEN: 'Create New PEN',
    ARCHIVED_REQ_FILES: 'Archived PEN Request Files',
    PEN_COORDINATORS: 'PEN Contacts',
    NEW_PENS: 'New PENs',
    MACRO_MANAGEMENT: 'Macro Management',
    NOMINAL_ROLL: 'Nominal Roll',
    NOMINAL_ROLL_STUDENT_LIST: 'Nominal Roll PEN Request List',
    NOMINAL_ROLL_STUDENT_DETAILS: 'Nominal Roll PEN Request Details',
    COMPARE_PENS: 'Compare Students',
    ADMINISTRATION: 'Administration',
    STUDENT_REQUESTS: 'Student Requests',
    ARCHIVED_REQ_BATCH_STUDENT_LIST: 'Archived PEN Request List',
    FAILED_REQ_FILES: 'Failed PEN Request Files',
    HELD_REQ_FILES: 'Held PEN Request Files',
    VIEW_DOC: 'View Document',
    GMP_STATS: 'GMP Stats',
    UMP_STATS: 'UMP Stats',
    STATS_DASHBOARD: 'Student and System Analytics',
    VIEW_MERGES: 'View Merges',
    ANALYTICS: 'Analytics'
  }
);

export const SEARCH_FILTER_OPERATION = Object.freeze(
  {
    /**
     * Equal filter operation.
     */
    EQUAL: 'eq',
    /**
     * Not equal filter operation.
     */
    NOT_EQUAL: 'neq',
    /**
     * Greater than filter operation.
     */
    GREATER_THAN: 'gt',
    /**
     * Greater than or equal to filter operation.
     */
    GREATER_THAN_OR_EQUAL_TO: 'gte',
    /**
     * Less than filter operation.
     */
    LESS_THAN: 'lt',
    /**
     * Less than or equal to filter operation.
     */
    LESS_THAN_OR_EQUAL_TO: 'lte',
    /**
     * In filter operation.
     */
    IN: 'in',
    /**
     * Not in filter operation.
     */
    NOT_IN: 'nin',
    /**
     * Between filter operation.
     */
    BETWEEN: 'btn',
    /**
     * Contains filter operation.
     */
    CONTAINS: 'like',
    /**
     * Contains ignore case filter operation.
     */
    CONTAINS_IGNORE_CASE: 'like_ignore_case',
    /**
     * Starts with filter operation.
     */
    STARTS_WITH: 'starts_with',
    /**
     * Starts with ignore case filter operation.
     */
    STARTS_WITH_IGNORE_CASE: 'starts_with_ignore_case'
  }
);

export const SEARCH_CONDITION = Object.freeze(
  {
    /**
     * And condition.
     */
    AND: 'AND',
    /**
     * Or condition.
     */
    OR: 'OR'
  }
);

export const SEARCH_VALUE_TYPE = Object.freeze(
  {
    /**
     * String value type.
     */
    STRING: 'STRING',
    /**
     * Integer value type.
     */
    INTEGER: 'INTEGER',
    /**
     * Long value type.
     */
    LONG: 'LONG',
    /**
     * Date value type.
     */
    DATE: 'DATE',
    /**
     * Date time value type.
     */
    DATE_TIME: 'DATE_TIME',
    /**
     * Uuid value type.
     */
    UUID: 'UUID'
  }
);

export const PRB_SAGA_NAMES = Object.freeze(
  {
    PEN_REQUEST_BATCH_USER_MATCH_PROCESSING_SAGA: 'PEN_REQUEST_BATCH_USER_MATCH_PROCESSING_SAGA',
    PEN_REQUEST_BATCH_USER_UNMATCH_PROCESSING_SAGA: 'PEN_REQUEST_BATCH_USER_UNMATCH_PROCESSING_SAGA',
    PEN_REQUEST_BATCH_NEW_PEN_PROCESSING_SAGA: 'PEN_REQUEST_BATCH_NEW_PEN_PROCESSING_SAGA',
  }
);

export const NOMINAL_ROLL_STUDENT_STATUSES = Object.freeze(
  [
    {
      value: 'MATCHEDSYS',
      text: 'Matched by system'
    },
    {
      value: 'MATCHEDUSR',
      text: 'Matched by user'
    },
    {
      value: 'FIXABLE',
      text: 'Fixable Request'
    },
    {
      value: 'ERROR',
      text: 'Error'
    },
    {
      value: 'LOADED',
      text: 'Loaded'
    }
  ]
);

export const NOMINAL_ROLL_STUDENT_STATUS_CODES = Object.freeze(
  Object.fromEntries(NOMINAL_ROLL_STUDENT_STATUSES.map(status => [status.value, status.value]))
);
