// reducers/searchReducer.js

// Define initial state
const initialState = {
  filters: {
    role: [],
    numberOfEmployees: [],
    experience: [],
    jobType: [],
    salary: []
  }
};

// Define reducer function
const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SEARCH_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.name]: action.payload.value
        }
      };
    default:
      return state;
  }
};

export default searchReducer;
