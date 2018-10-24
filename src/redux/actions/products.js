import { Products } from '../../client/api';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const RESET_PRODUCTS = 'RESET_PRODUCTS';
export const GET_PRODUCT = 'GET_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const RESET_PRODUCT = 'RESET_PRODUCT';
export const SET_SORT = 'SET_SORT';
export const SET_FILTER = 'SET_FILTER';

export const filterProducts = ({ type, value }) => ({
  type: SET_FILTER,
  filter: {
    type,
    value
  }
});

export const getProducts = params => {
  return async dispatch => {
    const { products, productsCount } = await Products.getAll(params);

    return dispatch({
      type: GET_PRODUCTS,
      payload: { products, productsCount }
    });
  };
};

export const resetProducts = () => ({
  type: RESET_PRODUCTS
});

export const getProduct = id => {
  return async dispatch => {
    const product = await Products.getOne(id);

    return dispatch({
      type: GET_PRODUCT,
      payload: product
    });
  };
};

export const addProduct = body => {
  return async dispatch => {
    const product = await Products.add(body);

    return dispatch({
      type: ADD_PRODUCT,
      payload: product
    });
  };
};

export const resetProduct = () => ({
  type: RESET_PRODUCT
});
