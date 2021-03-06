import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Data } from '../models';

// https://github.com/ngrx/platform/issues/31
declare module '@ngrx/store' {
  interface Action {
    type: string;
    payload?: any;
  }
}

@Injectable()
export class initializeActions {

    static INITIALIZATION = '[Data] Initialization';
    initialize(): Action {
        return {
            type: initializeActions.INITIALIZATION
        };
    }

    static LOAD_DATA = '[Data] Load data';
    loadData(): Action {
        return {
            type: initializeActions.LOAD_DATA
        };
    }

    static LOAD_DATA_RANGE = '[Data] Load data with range';
    loadDataRange(): Action {
        return {
            type: initializeActions.LOAD_DATA_RANGE
        };
    }

    static LOAD_DATA_SUCCESS = '[Data] Load Data Success';
    loadDataSuccess(data): Action {
        // 
        return {
            type: initializeActions.LOAD_DATA_SUCCESS,
            payload: data
        };
    }

    static CALL_UNPLUG_API = '[Data] Call unplug API';
    callUnplugApi(data): Action {
        // 
        return {
            type: initializeActions.CALL_UNPLUG_API,
            payload: data
        };
    }

    static UNPLUG_API_SUCCESS = '[Data] Unplug API Success';
    unplugApiSuccess(data): Action {
        // 
        return {
            type: initializeActions.UNPLUG_API_SUCCESS,
            payload: data
        };
    }

    static START_AND_END_DATE = '[Data] Start and End date';
    setStartAndEndDate(start, end): Action {
        // 
        return {
            type: initializeActions.START_AND_END_DATE,
            payload: {
                start,
                end
            }
        };
    }

    static GET_DRAWS_OF_CURRENT_DATE = '[Data] Get Draws Of Current Date';
    getDrawsOfCurrentDate(): Action {
        // 
        return {
            type: initializeActions.GET_DRAWS_OF_CURRENT_DATE,
            payload: {}
        };
    }

    static LOAD_DATA_LAST_DRAW = '[Data] Load Data Last Draw';
    loadDataLastDraw(data): Action {
        return {
            type: initializeActions.LOAD_DATA_LAST_DRAW,
            payload: data
        };
    }

    static LOAD_CUSTOM_LAST_DRAWS = '[Data] Load Custom Last Draws';
    loadCustomLastDraws(data): Action {
        return {
            type: initializeActions.LOAD_CUSTOM_LAST_DRAWS,
            payload: data
        };
    }
 }