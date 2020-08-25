let baseRoot = '/api';
const authRoot = baseRoot + '/auth';
const penRequestBatchRoot = baseRoot + '/penRequestBatch';
const penRequestRoot = baseRoot + '/penRequest';
const studentRequestRoot = baseRoot + '/studentRequest';
const demographicRoot = baseRoot + '/studentDemographics';
const studentRoot = baseRoot + '/students';
let object = {
  LOGIN: authRoot + '/login',
  LOGOUT: authRoot + '/logout',
  SESSION_EXPIRED: authRoot + '/logout?sessionExpired=true',
  REFRESH: authRoot + '/refresh',
  TOKEN: authRoot + '/token',
  USER: authRoot + '/user',

  penRequestBatch: {
    ROOT_ENDPOINT: penRequestBatchRoot,
    STATS_URL: penRequestBatchRoot + '/stats',
    FILES_URL: penRequestBatchRoot + '/',
  },

  penRequest: {
    ROOT_ENDPOINT: penRequestRoot,
    SEARCH_URL: penRequestRoot + '/',
    DUPLICATE_REQUESTS_URL:penRequestRoot + '/duplicatePenRequests',
    STATUSES_URL: penRequestRoot + '/codes/requeststatuses',
    DOCUMENT_TYPES_URL: penRequestRoot + '/codes/documentTypes',
    COMPLETE_URL: penRequestRoot + '/complete',
    REJECT_URL: penRequestRoot + '/reject',
    RETURN_URL: penRequestRoot + '/return',
    MACRO_URL: penRequestRoot + '/macros',
    UNLINK_URL: penRequestRoot + '/unlink',
    STATS_URL: penRequestRoot + '/stats'
  },

  studentRequest: {
    ROOT_ENDPOINT: studentRequestRoot,
    SEARCH_URL: studentRequestRoot + '/',
    DUPLICATE_REQUESTS_URL:studentRequestRoot + '/duplicatePenRequests',
    STATUSES_URL: studentRequestRoot + '/codes/requeststatuses',
    DOCUMENT_TYPES_URL: studentRequestRoot + '/codes/documentTypes',
    COMPLETE_URL: studentRequestRoot + '/complete',
    REJECT_URL: studentRequestRoot + '/reject',
    RETURN_URL: studentRequestRoot + '/return',
    MACRO_URL: studentRequestRoot + '/macros',
    STATS_URL: studentRequestRoot + '/stats'
  },

  student: {
    ROOT_ENDPOINT: studentRoot,
    SEARCH_URL: studentRoot + '/search',
    GENDER_CODE_URL: studentRoot + '/genderCodes',
    DEMOG_CODE_URL: studentRoot + '/demogCodes',
    STATUS_CODE_URL: studentRoot + '/statusCodes',
    GRADE_CODE_URL: studentRoot + '/gradeCodes'
  },

  STUDENT_DATA_URL: studentRoot,
  SEARCH_BY_PEN: demographicRoot
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
    penRequestBatch: {
      name: 'penRequestBatch',
      label: 'PEN Request Files',
      path: '/penRequestBatch',
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
    LEGAL_LAST_NAME:'legalLastName',
    LEGAL_FIRST_NAME:'legalFirstName',
    LEGAL_MIDDLE_NAMES:'legalMiddleNames',
    USUAL_LAST_NAME:'usualLastName',
    USUAL_FIRST_NAME:'usualFirstName',
    USUAL_MIDDLE_NAMES:'usualMiddleNames',
    GRADE_CODE:'gradeCode',
    GRADE_YEAR:'gradeYear',
    POSTAL_CODE:'postalCode',
    TWINS:'twins',
    MERGED_TO:'mergedTo',
    MERGED_FROM:'mergedFrom',
    DOB:'dob',
    GENDER_CODE:'genderCode',
    DEMOG_CODE:'demogCode',
    TRAX_STATUS:'traxStatus',
    GRAD_DATE:'gradDate',
    CREATED_DATE:'createdDate',
    UPDATED_DATE:'updatedDate',
    LOCAL_ID:'localID',
    MINCODE: 'mincode',
    MEMO:'memo',
    PEN:'pen',
    STATUS_CODE:'statusCode'
  }

);
