import { combineReducers } from 'redux';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
  filters: searchReducer,
});

export default rootReducer;