const initialState = {
  userId: "",
  userName: "",
  email: "",
  hierarchyLevel: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_ID":
      return { ...state, userId: action.payload };
    case "SET_USER_NAME":
      return { ...state, name: action.payload };
    case "SET_USER_EMAIL":
      return { ...state, email: action.payload };
    case "SET_HIERARCHY_LEVEL":
      return { ...state, hierarchyLevel: action.payload };

    default:
      return state;
  }
};

export default userReducer;
