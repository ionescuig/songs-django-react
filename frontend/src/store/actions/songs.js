// import axiosInstance from "../../components/auth/AuthServices";
import * as actionTypes from "./actionTypes";
import SongsService from '../SongsServices'

const songsService  =  new SongsService();


export const updateStart = () => {
  return {
    type: actionTypes.UPDATE_START
  }
}

export const updateSuccess = (songs) => {
  return {
    type: actionTypes.UPDATE_SUCCESS,
    songs: songs,
  }
}

export const updateFail = error => {
  return {
    type: actionTypes.UPDATE_FAIL,
    error: error
  }
}

export const updateSongs = () => {
  return dispath => {
    dispath(updateStart());

    songsService.getSongs()
    .then( res => {
      const songs = res.data;
      dispath(updateSuccess(songs));
    })
    .catch( err => {
      dispath(updateFail(err))
    })
  }
}