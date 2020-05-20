const roleActionMap = {
  'CLAIM_PEN_REQUEST': ['STUDENT_ADMIN'],
  'PROVIDE_PEN': ['STUDENT_ADMIN'],
  'REQUEST_MORE_INFO': ['STUDENT_ADMIN'],
  'REJECT_PEN_REQUEST': ['STUDENT_ADMIN'],
  'CHANGE_DOCUMENT_TYPE': ['STUDENT_ADMIN'],
  'RELEASE_PEN_REQUEST': ['STUDENT_ADMIN']

};

function isAccessEnabledForUser(actionName, userInfo) {
  const rolesAllowed = roleActionMap[actionName];
  if (rolesAllowed !== undefined) {
    const userRoles = userInfo.userRoles;
    if (rolesAllowed.indexOf('*') !== -1) {
      return true;
    } else return userHasRole(rolesAllowed, userRoles);
  }
  return true;
}

function userHasRole(rolesAllowed, userRoles) {
  let userHasValidRole = false;
  for (const index in userRoles) {
    if (rolesAllowed.indexOf(userRoles[index]) !== -1) {
      userHasValidRole = true;
      break;
    }
  }
  return userHasValidRole;
}

function isReadonlyUser(userRoles) {
  let isReadOnly = true;
  for (const index in userRoles) {
    if ('STUDENT_ADMIN' === userRoles[index]) {
      isReadOnly = false;
      break;
    }
  }
  return isReadOnly;
}

module.exports = {
  AccessEnabledForUser: isAccessEnabledForUser,
  ReadOnlyUser: isReadonlyUser
};
