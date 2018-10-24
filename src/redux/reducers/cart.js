import {
  ADD_ITEM,
  DELETE_ITEM,
  INCREASE_AMOUNT,
  DECREASE_AMOUNT,
  GET_TOTAL,
  GET_AMOUNT
} from '../actions/cart';

const initialState = {
  items: [],
  amount: 0,
  total: 0
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const matched = state.items.find(
        item => item.id === action.payload.item.id
      );

      if (matched) {
        return {
          ...state,
          items: state.items.map(item => {
            if (item.id === action.payload.item.id) {
              Object.assign({}, item, (item.amount += 1));
            }
            return item;
          }),
          amount: state.amount + action.payload.quantity
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload.item, amount: 1 }],
          amount: state.amount + action.payload.quantity
        };
      }
    case DELETE_ITEM:
      let amount;
      state.items.forEach(item => {
        if (item.id === action.id) {
          amount = state.amount - item.amount;
        }
      });

      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id),
        amount
      };
    case INCREASE_AMOUNT:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.itemId) {
            Object.assign({}, item, (item.amount += 1));
          }
          return item;
        }),
        amount: state.amount + 1
      };
    case DECREASE_AMOUNT:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.itemId) {
            Object.assign({}, item, (item.amount -= 1));
          }
          return item;
        }),
        amount: state.amount - 1
      };

    case GET_TOTAL:
      return {
        ...state,
        total: state.items.reduce((total, item) => {
          if (item.amount > 1) {
            return (total += item.price * item.amount);
          }

          return (total += item.price);
        }, 0)
      };
    case GET_AMOUNT:
      return {
        ...state,
        amount: state.items.reduce((amount, item) => {
          return (amount += item.amount);
        }, 0)
      };
    default:
      return state;
  }
};

export default cart;
