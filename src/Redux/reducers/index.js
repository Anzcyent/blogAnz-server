import { combineReducers } from 'redux';
import appReducer from './app';
import articlesReducer from './articles';
import authReducer from "./auth";
import userReducer from "./user";

const rootReducer = combineReducers({
    appReducer,
    articlesReducer,
    authReducer,
    userReducer
})

export default rootReducer;