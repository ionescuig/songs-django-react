import axiosInstance from '../components/auth/AuthServices'

const API_URL = 'http://localhost:8000/api';

export default class SongsService {
  getSongs() {
    const url = `${API_URL}/songs/`;
    return axiosInstance.get(url)
  }

  getSong(pk) {
    const url = `${API_URL}/songs/${pk}`;
    return axiosInstance.get(url);
  }

  createSong(song){
    const url = `${API_URL}/songs/`;
    return axiosInstance.post(url, song);
  }

  deleteSong(song){
    const url = `${API_URL}/songs/${song.id}`;
    return axiosInstance.delete(url);
  }

  updateSong(song){
    const url = `${API_URL}/songs/${song.id}/`;
    return axiosInstance.put(url, song);
  }
}