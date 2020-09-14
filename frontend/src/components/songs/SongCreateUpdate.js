import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/songs';


class SongCreateUpdate extends Component {
    constructor() {
      super();
      this.state = {
        title: "",
        link: "",
        id: "",
        owner: "",
        submit: false

      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount(){
      const { match: { params } } = this.props;
      if(params && params.id) {
        let song = this.props.songs.find(s => s.id.toString() === params.id);

        if(song) {
          this.setState({
            title: song.title,
            link: song.link,
            id: song.id,
            owner: song.owner
          })
        }
      }
    }

    handleChange(event) {
      const name = event.target.name;
      const value = event.target.value;
      this.setState({[name]: value})

    }

    handleSubmit(event) {
      event.preventDefault();
      this.props.createUpdateSong(this.state);

      if (!this.state.owner) this.setState({submit: true})
      else if (this.state.owner === localStorage.getItem("username")) this.setState({submit: true})
    }

    render() {
      let errorMessage = null;
      if (this.props.error) {
        errorMessage = (
          <p>{this.props.error.message}</p>
        )
      }
      let submit = this.state.submit;
      if (submit) return <Redirect to='/' />

      return (
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input className="form-control" type="text" name='title' onChange={this.handleChange} value={this.state.title} />

            <br/>
            <label>Link:</label>
            <input className="form-control" type="url" name='link' onChange={this.handleChange} value={this.state.link} />
            
            <br />
            <input className="btn btn-primary" type="submit" value="Submit" />
          </div>
          <br />{errorMessage}
        </form>
      );
    }
}

const mapStateToProps = state => {
  return {
    songs: state.songs.songs,
    error: state.songs.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUpdateSong: (title, link, id, owner) => dispatch(actions.createUpdateSong(title, link, id, owner))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongCreateUpdate);