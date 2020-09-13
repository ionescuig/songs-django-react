import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/songs';
import SongsService from  '../../store/SongsServices';
import {alertMsg} from './messages';

const  songsService  =  new SongsService();


class SongsList extends React.Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.updateSongs();
  }

  handleDelete(e, id) {
    let self = this;
    songsService.deleteSong({id: id}).then(() => {
      let newArr = self.state.songs.filter(obj => {
        return obj.id !== id;
      });
      self.setState({songs:  newArr})
    }).catch(err => alert(alertMsg(err, 'delete')))
  }

  render() {
    return (
      <div className="col-md-10 offset-md-1">
        <h1>Songs</h1>
        <div>
          <table className="table table-sm table-hover">
            <thead key="thead">
            <tr>
              <th>Title</th>
              <th>Link</th>
              <th>Created</th>
              <th>Updated</th>
              <th>ID</th>
              <th>Owner</th>
              <th>Options</th>
            </tr>
            </thead>
            <tbody>
              {
                this.props.songs

                ?

                this.props.songs.map( song  =>
                <tr key={song.id}>
                  <td>{song.title}</td>
                  <td>{song.link}</td>
                  <td>{new Date(song.created).toLocaleString()}</td>
                  <td>{new Date(song.updated).toLocaleString()}</td>
                  <td>{song.id}</td>
                  <td>{song.owner}</td>
                  <td>
                    <a className="btn btn-info mr-2 my-1 up-del" href={"/songs/" + song.id}>Update</a>
                    <button className="btn btn-danger my-1 up-del" onClick={(e)=> this.handleDelete(e, song.id) }>Delete</button>
                  </td>
                </tr>)

                :

                null
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    songs: state.songs.songs,
    error: state.songs.error,
    loading: state.songs.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateSongs: () => dispatch(actions.updateSongs())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongsList);
