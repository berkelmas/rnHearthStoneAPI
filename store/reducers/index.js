import {combineReducers} from 'redux';

// REDUCERS
import CardReducer from './card-reducer';

const RootReducer = combineReducers({
  CardReducer,
});

export default RootReducer;
