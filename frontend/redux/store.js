import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { AuthReducer } from "./reducer/AuthReducer"
// import ProductsReducer from "./reducer/ProductsReducer";
import { CartReducer } from "./reducer/CartReducer";
const root = combineReducers({
  //   ProductsReducer,
  CartReducer,
  auth: AuthReducer,
});

const middleware = [thunk];

const Store = createStore(
  root,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default Store;
