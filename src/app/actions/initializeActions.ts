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

    static LOAD_DATA_SUCCESS = '[Data] Load Data Success';
    loadDataSuccess(data): Action {
        // debugger;
        return {
            type: initializeActions.LOAD_DATA_SUCCESS,
            payload: data
        };
    }

    static CALL_UNPLUG_API = '[Data] Call unplug API';
    callUnplugApi(data): Action {
        // debugger;
        return {
            type: initializeActions.CALL_UNPLUG_API,
            payload: data
        };
    }

    static UNPLUG_API_SUCCESS = '[Data] Unplug API Success';
    unplugApiSuccess(data): Action {
        // debugger;
        return {
            type: initializeActions.UNPLUG_API_SUCCESS,
            payload: data
        };
    }

 }