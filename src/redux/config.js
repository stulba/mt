import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadState, saveState } from '../client/localStorageApi';
import thunk from 'redux-thunk';
import products from './reducers/products';
import user from './reducers/user';
import categories from './reducers/categories';
import cart from './reducers/cart';
import throttle from 'lodash/throttle';

const middleware = [thunk];
const persistedState = loadState();

const rootReducer = combineReducers({
  products,
  user,
  cart,
  categories
});

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(...middleware))
);

store.subscribe(
  throttle(() => {
    saveState({
      categories: store.getState().categories,
      user: store.getState().user,
      cart: store.getState().cart
    });
  }, 1000)
);

export default store;
