function setUserId(userId) {
  return { type: "SET_USER_ID", payload: userId };
}
function setUserEmail(email) {
  return { type: "SET_USER_EMAIL", payload: email };
}
function setHierarchyLevel(level) {
  return { type: "SET_HIERARCHY_LEVEL", payload: level };
}

function setActiveCategory(category) {
  return { type: "SET_ACTIVE_CATEGORY", payload: category };
}
function setCategories(categories) {
  return { type: "SET_CATEGORIES", payload: categories };
}

export {
  setUserId,
  setUserEmail,
  setHierarchyLevel,
  setActiveCategory,
  setCategories,
};
