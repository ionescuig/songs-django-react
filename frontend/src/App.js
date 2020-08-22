import React from 'react';
import axios from 'axios';
import './App.css';


const API_URL = 'http://localhost:8000';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      songs: [],
    }
    this.getSongs = this.getSongs.bind(this);
  }

  getSongs() {
    const url = `${API_URL}/api/songs/`;
    return axios.get(url).then(response => response.data);
  }

  componentDidMount() {
    var  self  =  this;
    this.getSongs().then(function (result) {
      self.setState({ songs: result})
    });
  }

  render() {
    return (
      <div>
        <h1>Songs</h1>
        <div>
          {this.state.songs.map( song =>
            <ul>
              <strong>{song.title}</strong>
              <li>Id: {song.id}</li>
              <li>Owner: {song.owner}</li>
              <li>Created: {song.created}</li>
              <li>Updated: {song.updated}</li>
              <li>Link: {song.link}</li>
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App;
