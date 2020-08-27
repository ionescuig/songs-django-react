import React, { Component } from 'react';
import { BrowserRouter , Switch} from 'react-router-dom'
import { Route  } from 'react-router-dom'
import Login from '../auth/Login'
import Signup from '../auth/Signup'
import SongsList from '../songs/SongsList'
import SongCreateUpdate from '../songs/SongCreateUpdate'
import './App.css';
import axiosInstance from "../auth/AuthServices";


class NavLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
    }
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount () {
    try {
      let username = localStorage.getItem("username")
      this.setState({username: username})
    } catch (error) {
      throw error;
    }
  }

  handleLogout() {
    this.setState({username: ""});
    localStorage.removeItem('username');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    axiosInstance.defaults.headers['Authorization'] = null;
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand text-info" href="/">Django React Test</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/">Songs</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/songs">Create Song</a>
            </li>
          </ul>
          {(() => {if (this.state.username) return (
              <div className="form-inline my-2 my-lg-0">
                <span className="navbar-text text-dark">Welcome <strong>{this.state.username}</strong></span>
                <a className="nav-link" onClick={this.handleLogout} href="/">Logout</a>
              </div>
            );
            else return (
              <div className="form-inline my-2 my-lg-0">
                <a className="nav-link" href="/signup/">Signup</a>
                <a className="nav-link" href="/login/">Login</a>
              </div>
            )})()}
        </div>
      </nav>
    )
  }
}

const BaseLayout = ({username, signup}) => (
  <div className="container-fluid">
    <NavLayout/>
    <div className="content">
      <Switch>
        <Route path="/" exact component={SongsList} />
        <Route exact path={"/login/"} component={Login}/>
        <Route exact path={"/signup/"} component={Signup}/>
        <Route path="/songs/:id" component={SongCreateUpdate} />
        <Route path="/songs/" exact component={SongCreateUpdate} />
      </Switch>
    </div>
  </div>
)

class App extends Component {
  render() {
    return (
    <BrowserRouter>
      <BaseLayout />
    </BrowserRouter>
    );
  }
}

export default App;