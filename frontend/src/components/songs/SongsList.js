import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/songs';

class SongsList extends React.Component {
  constructor() {
    super();
    this.state = {
      songs: null,
      property: null,
      order: true,
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  componentDidMount() {
    this.props.updateSongs();
    this.setState({songs: this.props.songs})
  }

  handleDelete(song) {
    this.props.deleteSong(song);
  }

  handleSort(property) {
    // update order
    let order = this.state.order;
    let stateProperty = this.state.property;
    if (stateProperty && property === stateProperty) order = !order;
    else order = true;

    //sort songs
    let songs = this.state.songs

    switch (property) {
      case "id":
        if (order) songs.sort((a, b) => a.id - b.id);
        else songs.sort((a, b) => b.id - a.id);
        break;
      case "title":
      case "link":
      case "created":
      case "updated":
      case "owner":
        if (order) songs.sort((a, b) => (a[property] > b[property]) ? 1 : ((b[property] > a[property]) ? -1 : 0));
        else songs.sort((a, b) => (b[property] > a[property]) ? 1 : ((a[property] > b[property]) ? -1 : 0));
        break;
      default:
        break;
    }

    this.setState({
      songs: songs,
      property: property,
      order: order,
    });
  }

  render() {
    let songs = this.state.songs

    return (
      <div className="col-md-10 offset-md-1">
        <h1>Songs</h1>
        <div>
          <table className="table table-sm table-hover">
            <thead key="thead">
            <tr>
              <th>
                Title
                <button className="btn btn-link ml-1" onClick={() => this.handleSort("title")}><i className="fa fa-sort m-2"></i></button>
              </th>
              <th onClick={() => this.handleSort("link")}>
                Link
                <button className="btn btn-link ml-2"><i className="fa fa-sort m-1"></i></button>
              </th>
              <th onClick={() => this.handleSort("created")}>
                Created
                <button className="btn btn-link ml-2"><i className="fa fa-sort m-1"></i></button>
              </th>
              <th onClick={() => this.handleSort("updated")}>
                Updated
                <button className="btn btn-link ml-2"><i className="fa fa-sort m-1"></i></button>
              </th>
              <th onClick={() => this.handleSort("id")}>
                ID
                <button className="btn btn-link ml-2"><i className="fa fa-sort m-1"></i></button>
              </th>
              <th onClick={() => this.handleSort("owner")}>
                Owner
                <button className="btn btn-link ml-2"><i className="fa fa-sort m-1"></i></button>
              </th>
              <th>
                Options
                <button className="btn btn-link ml-2"><i className="fa fa-sort-empty m-1"></i></button>
              </th>
            </tr>
            </thead>
            <tbody>
              {
                songs

                ?

                songs.map( song  =>
                <tr key={song.id}>
                  <td>{song.title}</td>
                  <td>{song.link}</td>
                  <td>{new Date(song.created).toLocaleString()}</td>
                  <td>{new Date(song.updated).toLocaleString()}</td>
                  <td>{song.id}</td>
                  <td>{song.owner}</td>
                  {
                    song.owner === localStorage.getItem("username")

                    ?

                    <td>
                    <a className="btn btn-info mr-2 my-1 up-del" href={"/songs/" + song.id}>Update</a>
                    <button className="btn btn-danger my-1 up-del" onClick={() => this.handleDelete(song)}>Delete</button>
                    </td>

                    :
                    <td></td>

                  }
                    
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSongs: () => dispatch(actions.retrieveSongs()),
    deleteSong: (title, link, id, owner) => dispatch(actions.deleteSong(title, link, id, owner))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongsList);
