import {
  GET_PRODUCTS,
  RESET_PRODUCTS,
  GET_PRODUCT,
  ADD_PRODUCT,
  RESET_PRODUCT
} from '../actions/products';

const initialState = {
  productsLoading: true,
  products: [],
  productsLimit: 4,
  productLoading: true,
  product: {}
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        productsLoading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount
      };

    case RESET_PRODUCTS:
      return {
        ...state,
        productsLoading: true,
        products: []
      };
    case GET_PRODUCT:
      return {
        ...state,
        productLoading: false,
        product: action.payload
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.product]
      };
    case RESET_PRODUCT:
      return {
        ...state,
        productLoading: true,
        product: {}
      };

    default:
      return state;
  }
};

export default products;
