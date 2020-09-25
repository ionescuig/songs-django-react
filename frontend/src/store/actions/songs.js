// import axiosInstance from "../../components/auth/AuthServices";
import * as actionTypes from "./actionTypes";
import SongsService from '../SongsServices'

const songsService  =  new SongsService();


// fetch songs from api
export const fetchSongsStart = () => {
  return {
    type: actionTypes.FETCH_SONGS_START
  }
}

export const fetchSongsSuccess = (songs) => {
  return {
    type: actionTypes.FETCH_SONGS_SUCCESS,
    songs: songs,
  }
}

export const fetchSongsFail = error => {
  return {
    type: actionTypes.FETCH_SONGS_FAIL,
    error: error
  }
}

export const retrieveSongs = () => {
  return dispatch => {
    dispatch(fetchSongsStart());

    songsService.getSongs()
    .then( res => {
      const songs = res.data;
      dispatch(fetchSongsSuccess(songs));
    })
    .catch( err => {
      dispatch(fetchSongsFail(err))
    })
  }
}


// update song
export const updateSongStart = (song) => {
  return {
    type: actionTypes.UPDATE_SONG_START,
    song: song
  }
}

export const updateSongSuccess = (song) => {
  return {
    type: actionTypes.UPDATE_SONG_SUCCESS,
    song: song
  }
}

export const updateSongFail = error => {
  return {
    type: actionTypes.UPDATE_SONG_FAIL,
    error: error
  }
}


// create song
export const createSongStart = (song) => {
  return {
    type: actionTypes.CREATE_SONG_START,
    song: song
  }
}

export const createSongSuccess = (song) => {
  return {
    type: actionTypes.CREATE_SONG_SUCCESS,
    song: song
  }
}

export const createSongFail = error => {
  return {
    type: actionTypes.CREATE_SONG_FAIL,
    error: error
  }
}

export const createUpdateSong = ({title, link, id, owner}, history) => {
  return dispatch => {
    
    if (owner){
      dispatch(updateSongStart({id, title, link}));
      songsService.updateSong({id, title, link})
      .then( res => {
        dispatch(updateSongSuccess(res.data))
      })
      .catch( err => {
        dispatch(updateSongFail(err))
      })
    } else {
      const newOwner = localStorage.getItem("username");
      dispatch(createSongStart({title, link, newOwner}));
      songsService.createSong({id, title, link})
      .then( res => {
        dispatch(createSongSuccess(res.data));
      })
      .catch( err => {
        dispatch(createSongFail(err))
      })
    }
  }
}


// delete song
export const deleteSongStart = (song) => {
  return {
    type: actionTypes.DELETE_SONG_START,
    song: song
  }
}

export const deleteSongSuccess = (song) => {
  return {
    type: actionTypes.DELETE_SONG_SUCCESS,
    song: song
  }
}

export const deleteSongFail = error => {
  return {
    type: actionTypes.DELETE_SONG_FAIL,
    error: error
  }
}

export const deleteSong = ({title, link, id, owner}) => {
  return dispatch => {
    
    dispatch(deleteSongStart({id, title, link}));
    songsService.deleteSong({id, title, link})
    .then( res => {
      dispatch(deleteSongSuccess({id, title, link}));
    })
    .catch( err => {
      dispatch(deleteSongFail(err))
    })
  }
}


// ==================== WORK IN PROGRESS ====================

// sort songs
export const sortSongs = (property) => {
  return {
    type: actionTypes.SORT_SONGS,
    property: property,
  }
}

// export const handleSortSongs = (property, order) => {
//   return dispatch => {
//     let sortedSongs = [];
    
//     dispatch(sortSongs(sortedSongs));
//   }
// }

// ==========================================================
