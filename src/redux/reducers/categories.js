import { GET_CATEGORIES, SET_CURRENT_CATEGORY } from '../actions/categories';

const initialState = {
  categories: {},
  categoriesLoaded: false,
  currentCategory: ''
};

const categories = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categoriesLoaded: true,
        categories: action.payload
      };
    case SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.category
      };
    default:
      return state;
  }
};

export default categories;
