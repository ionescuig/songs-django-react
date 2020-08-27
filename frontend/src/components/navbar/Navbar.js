import React from 'react';
import axiosInstance from "../auth/AuthServices";
import { Redirect } from 'react-router-dom';

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {logout: false}
    this.resetStateOnLogout = this.resetStateOnLogout.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  resetStateOnLogout() {
    this.setState({logout: false})
  }

  handleLogout() {
    let user = "";
    this.props.onUserChange(user)
    localStorage.removeItem('username');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    axiosInstance.defaults.headers['Authorization'] = null;
    this.setState({logout: true})
  }

  render() {
    let logout = this.state.logout
    if(logout) {
      this.resetStateOnLogout()
      return <Redirect to="/"/>
    }

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
          {(() => {if (this.props.username) return (
              <div className="form-inline my-2 my-lg-0">
                <span className="navbar-text text-dark">Welcome <strong>{this.props.username}</strong></span>
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

export default Navbar;
