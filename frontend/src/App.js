import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route  } from 'react-router-dom'
import Login from './auth/Login'
import Signup from './auth/Signup'
import SongsList from './songs/SongsList'
import SongCreateUpdate from './songs/SongCreateUpdate'
import './App.css';

const BaseLayout = () => (
  <div className="container-fluid">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand text-info" href="/">Django React Test</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <a className="nav-item nav-link" href="/">Songs</a>
        <a className="nav-item nav-link" href="/songs">Create Song</a>
      </div>
      <div className="navbar-nav ml-auto">
      <a className="nav-item nav-link" href="/signup/">Signup</a>
        <a className="nav-item nav-link" href="/login/">Login</a>
      </div>
    </div>
    </nav>
    <div className="content">
      <Route path="/" exact component={SongsList} />
      <Route exact path={"/login/"} component={Login}/>
      <Route exact path={"/signup/"} component={Signup}/>
      <Route path="/songs/:id" component={SongCreateUpdate} />
      <Route path="/songs/" exact component={SongCreateUpdate} />
    </div>
  </div>
)

class App extends Component {
  render() {
    return (
    <BrowserRouter>
      <BaseLayout/>
    </BrowserRouter>
    );
  }
}

export default App;