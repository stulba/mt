export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const INCREASE_AMOUNT = 'INCREASE_AMOUNT';
export const DECREASE_AMOUNT = 'DECREASE_AMOUNT';
export const GET_TOTAL = 'GET_TOTAL';
export const GET_AMOUNT = 'GET_AMOUNT';

export const addItemToCart = item => ({
  type: ADD_ITEM,
  payload: {
    item,
    quantity: 1
  }
});

export const deleteItemFromCart = id => ({
  type: DELETE_ITEM,
  id
});

export const increaseAmount = itemId => ({
  type: INCREASE_AMOUNT,
  itemId
});

export const decreaseAmount = itemId => ({
  type: DECREASE_AMOUNT,
  itemId
});

export const getTotal = () => ({
  type: GET_TOTAL
});

export const getAmount = () => ({
  type: GET_AMOUNT
});
