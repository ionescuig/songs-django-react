import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  songs: [],
  error: null,
  loading: false
}

const updateStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  })
}

const updateSuccess = (state, action) => {
  return updateObject(state, {
    songs: action.songs,
    error: null,
    loading: false
  })
}

const updateFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}

const songsReducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_START: return updateStart(state, action);
    case actionTypes.UPDATE_SUCCESS: return updateSuccess(state, action);
    case actionTypes.UPDATE_FAIL: return updateFail(state, action);
    default: return state;
  }
}

export default songsReducer;
