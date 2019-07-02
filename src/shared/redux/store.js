import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import rootReducer from './rootReducer';

const client = axios.create({
  baseURL: 'http://10.0.0.16:3000/api/v1',
  responseType: 'json',
});

const middlewares = [axiosMiddleware(client)];

export default createStore(rootReducer, applyMiddleware(...middlewares));
