import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import {thunk} from "redux-thunk";

import authReducer from "./auth/reducer";

const composeEnhancers = (typeof window !== "undefined") ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

const rootReducer = combineReducers({
  auth: authReducer
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
