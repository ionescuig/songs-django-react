import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';

class Navbar extends React.Component {

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
          {(() => {if (this.props.username) return (
              <div className="form-inline my-2 my-lg-0">
                <span className="navbar-text text-dark">Welcome <strong>{this.props.username}</strong></span>
                <a className="nav-link" href="/" onClick={this.props.logout}>Logout</a>
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

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    loading: state.auth.loading,
    error: state.auth.error
  }

}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.authLogout())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
