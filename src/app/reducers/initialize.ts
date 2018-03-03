import { Action } from '@ngrx/store';

import { Data } from '../models';

import { initializeActions } from '../actions';

export type AppState = Data;

const initialState: AppState = {
    login: '',
    id: -1,
};

export function reducer (state = initialState, action: Action): AppState {

    if(action) {
        if(action.type === initializeActions.INITIALIZATION) {
            return state;
        } else if(action.type === initializeActions.LOAD_DATA_SUCCESS) {
            // debugger;
            const data = action.payload;
            return Object.assign({}, state, data );
        } else {
            return state;
        }
    }

}