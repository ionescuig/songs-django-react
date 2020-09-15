import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  songs: [],
  song: null,
  error: null,
  action: null
}

// fetch songs from api
const fetchSongsStart = (state, action) => {
  return updateObject(state, {
    song: null,
    error: null,
    action: null
  })
}

const fetchSongsSuccess = (state, action) => {
  return updateObject(state, {
    songs: action.songs,
    error: null,
  })
}

const fetchSongsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
  })
}


// update song
const updateSongStart = (state, action) => {
  return updateObject(state, {
    error: null,
    song: action.song, 
    action: action.type
  })
}

const updateSongSuccess = (state, action) => {
  let updatedSongs = state.songs.filter((item) => item.id !== action.song.id);
  updatedSongs = updatedSongs.concat(action.song);
  return updateObject(state, {
    songs: updatedSongs,
    song: null,
    error: null,
    action: null
  })
}

const updateSongFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    action: null
  })
}


// create song
const createSongStart = (state, action) => {
  return updateObject(state, {
    error: null,
    song: action.song,
    action: action.type
  })
}

const createSongSuccess = (state, action) => {
  let updatedSongs = state.songs.filter((item) => item.id !== action.song.id);
  updatedSongs = updatedSongs.concat(action.song);
  updatedSongs.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
  return updateObject(state, {
    songs: updatedSongs,
    song: null,
    error: null,
    action: null
  })
}

const createSongFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    action: null
  })
}


// delete song
const deleteSongStart = (state, action) => {
  return updateObject(state, {
    error: null,
    song: action.song
  })
}

const deleteSongSuccess = (state, action) => {
  let updatedSongs = state.songs.filter((item) => item.id !== action.song.id);
  return updateObject(state, {
    songs: updatedSongs,
    song: null,
    error: null,
  })
}

const deleteSongFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
  })
}


const songsReducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SONGS_START: return fetchSongsStart(state, action);
    case actionTypes.FETCH_SONGS_SUCCESS: return fetchSongsSuccess(state, action);
    case actionTypes.FETCH_SONGS_FAIL: return fetchSongsFail(state, action);

    case actionTypes.UPDATE_SONG_START: return updateSongStart(state, action);
    case actionTypes.UPDATE_SONG_SUCCESS: return updateSongSuccess(state, action);
    case actionTypes.UPDATE_SONG_FAIL: return updateSongFail(state, action);

    case actionTypes.CREATE_SONG_START: return createSongStart(state, action);
    case actionTypes.CREATE_SONG_SUCCESS: return createSongSuccess(state, action);
    case actionTypes.CREATE_SONG_FAIL: return createSongFail(state, action);

    case actionTypes.DELETE_SONG_START: return deleteSongStart(state, action);
    case actionTypes.DELETE_SONG_SUCCESS: return deleteSongSuccess(state, action);
    case actionTypes.DELETE_SONG_FAIL: return deleteSongFail(state, action);

    default: return state;
  }
}

export default songsReducer;
