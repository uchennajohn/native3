import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk";
import userReducer from "./reducers";

const rootReducer= combineReducers({userReducer}) ///inside the curly braces, you can add as many function u like as created in the reducers.js

export const Store = createStore(rootReducer, applyMiddleware(thunk))