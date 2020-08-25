import React, { Component } from 'react';
import SongsService from './SongsServices';

const songService = new SongsService();

class SongCreateUpdate extends Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount(){
      const { match: { params } } = this.props;
      if(params && params.id)
      {
        songService.getSong(params.id).then((song)=>{
          this.refs.title.value = song.title;
          this.refs.link.value = song.link;
        })
      }
    }

    handleCreate(){
      songService.createSong(
        {
          "title": this.refs.title.value,
          "link": this.refs.link.value,
          "owner": "gabriel"
      }
      ).then((result)=>{
        alert("Song created!");
      }).catch(()=>{
        alert('There was an error! Please re-check your form.');
      });
    }

    handleUpdate(id){
      songService.updateSong(
        {
          "id": id,
          "title": this.refs.title.value,
          "link": this.refs.link.value,
      }
      ).then((result)=>{
        alert("Song updated!");
      }).catch(()=>{
        alert('There was an error! Please re-check your form.');
      });
    }

    handleSubmit(event) {
      const { match: { params } } = this.props;

      if(params && params.id){
        this.handleUpdate(params.id);
      }
      else
      {
        this.handleCreate();
      }

      event.preventDefault();
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input className="form-control" type="text" ref='title' />

          <label>Link:</label>
          <input className="form-control" type="url" ref='link'/>
          
          <input className="btn btn-primary" type="submit" value="Submit" />
          </div>
        </form>
      );
    }
}

export default SongCreateUpdate;