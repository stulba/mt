import { Categories } from '../../client/api';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';

export const getCategories = () => {
  return async dispatch => {
    const categories = await Categories.getAll();
    return dispatch({
      type: GET_CATEGORIES,
      payload: categories
    });
  };
};

export const setCurrentCategory = category => {
  return {
    type: SET_CURRENT_CATEGORY,
    category
  };
};
