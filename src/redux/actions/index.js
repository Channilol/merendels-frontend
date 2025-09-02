function setUserId(userId) {
  return { type: "SET_USER_ID", payload: userId };
}
function setUserEmail(email) {
  return { type: "SET_USER_EMAIL", payload: email };
}
function setHierarchyLevel(level) {
  return { type: "SET_HIERARCHY_LEVEL", payload: level };
}

export { setUserId, setUserEmail, setHierarchyLevel };
