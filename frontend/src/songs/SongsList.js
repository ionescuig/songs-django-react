import React from 'react';
import '.././App.css';
import SongsService from  './SongsServices';

const  songsService  =  new SongsService();


class SongsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
    }
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    let self = this;
    songsService.getSongs().then(function (result) {
      if (result) self.setState({ songs: result});
    });
  }

  handleDelete(e, id) {
    let self = this;
    songsService.deleteSong({id: id}).then(() => {
      let newArr = self.state.songs.filter(obj => {
        return obj.id !== id;
      });
      self.setState({songs:  newArr})
    })
  }

  render() {
    return (
      <div>
        <h1>Songs</h1>
        <div>
        <table className="table table-sm table-hover">
          <thead key="thead">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Link</th>
            <th>Options</th>
          </tr>
          </thead>
          <tbody>
            {this.state.songs.map( song  =>
            <tr key={song.id}>
              <td>{song.id}</td>
              <td>{song.title}</td>
              <td>{song.owner}</td>
              <td>{new Date(song.created).toLocaleString()}</td>
              <td>{new Date(song.updated).toLocaleString()}</td>
              <td>{song.link}</td>
              <td>
                <a className="btn btn-info mr-1" href={"/songs/" + song.id}>Update</a>
                <button className="btn btn-danger" onClick={(e)=> this.handleDelete(e, song.id) }>Delete</button>
              </td>
            </tr>)}
          </tbody>
        </table>
    </div>
      </div>
    )
  }
}

export default SongsList;
