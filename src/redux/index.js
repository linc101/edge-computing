import { createStore, applyMiddleware, combineReducers } from 'redux';
import user from './user';
import thunk from 'redux-thunk';

const store = createStore(combineReducers({ user }), applyMiddleware(thunk));

export default store;
