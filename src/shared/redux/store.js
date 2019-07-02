import { createStore, applyMiddleware } from 'redux';
import axiosMiddleware from './axios.config.ts';
import rootReducer from './rootReducer';

const middlewares = [axiosMiddleware];

export default createStore(rootReducer, applyMiddleware(...middlewares));
