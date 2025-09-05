const initialState = {
  activeCategory: "Home",
  categories: [],
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ACTIVE_CATEGORY":
      return { ...state, activeCategory: action.payload };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};

export default categoryReducer;
