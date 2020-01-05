// import '@ngrx/core/add/operator/select';
import { compose } from '@ngrx/core/compose';
//import {storeLogger} from 'ngrx-store-logger';
import { combineReducers } from '@ngrx/store';

import { ActionReducer } from '@ngrx/store';

import { storeFreeze } from 'ngrx-store-freeze';

import * as fromInit from './initialize';

import { environment } from '../../environments/environment';
// 
export interface AppState {
    data?: fromInit.AppState;
};

const reducers = {
  data: fromInit.reducer,
};

//uncomment the storeLogger import and this line
//and comment out the other export default line to turn on
//the store logger to see the actions as they flow through the store
//turned this off by default as i found the logger kinda noisy
//export default compose(storeLogger(), combineReducers)({
// export default compose(combineReducers)({
//     init: initReducer
// });
const combineReducersWithoutStateMutation = compose(storeFreeze, combineReducers);
// 
const developmentReducer: ActionReducer<AppState> = combineReducersWithoutStateMutation(reducers);
const productionReducer: ActionReducer<AppState> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}
