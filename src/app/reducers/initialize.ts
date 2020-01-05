import { Action } from "@ngrx/store";

import { Data } from "../models";

import { initializeActions } from "../actions";

export type AppState = Data;

const initialState: AppState = {
  // login: '',
  // id: -1,
  draws: {}
};

export function reducer(state = initialState, action: Action): AppState {
  if (action) {
    if (action.type === initializeActions.INITIALIZATION) {
      return state;
    } else if (action.type === initializeActions.LOAD_DATA_SUCCESS) {
      const data = action.payload;
      const st = Object.assign({}, state, data);
      // construct new state object
      const newState = {};
      Object.keys(st).map(key => {
        // console.log('key:',key);
        if (key === "draws" || key === "start" || key === "end") {
          newState[key] = st[key];
        }
      });

      data.map((item, index) => {
        // console.log('item:',item);
        newState[index] = item;
      });

      return newState;
    } else if (action.type === initializeActions.LOAD_DATA_LAST_DRAW) {
      const data = action.payload[0];
      // extract latest draw

      const lastDraw = {
        lastDraw: data[0]
      };
      return Object.assign({}, state, lastDraw);
    } else if (action.type === initializeActions.CALL_UNPLUG_API) {
      const data = action.payload;
      return Object.assign({}, state, data);
    } else if (action.type === initializeActions.UNPLUG_API_SUCCESS) {
      const data = action.payload;
      return Object.assign({}, state, data);
    } else if (action.type === initializeActions.START_AND_END_DATE) {
      //
      const data = action.payload;
      return Object.assign({}, state, data);
    } else if (action.type === initializeActions.GET_DRAWS_OF_CURRENT_DATE) {
      //
      const data = action.payload;
      return Object.assign({}, state, data);
    } else if (action.type === initializeActions.LOAD_CUSTOM_LAST_DRAWS) {
      const lastDraws = action.payload;
      console.log("lastDraws:", lastDraws);

      var previousState = state;

      // construct new state object
      const newState = {};

      Object.keys(previousState).map(key => {
        newState[key] = previousState[key];
      });

      newState["lastDraws"] = lastDraws;
      console.log("newState:", newState);

      return newState;
    } else {
      return state;
    }
  }
}
