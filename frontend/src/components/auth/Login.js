import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';


class Login extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    this.props.onAuth(username, password);
  }

  render() {
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }
    let access_token = this.props.access_token;
    if (access_token) return <Redirect to='/' />

    return (
      <div className="row">
        <div className="col-md-2 offset-md-5">
          <h2 className="mt-5 mb-5">Login Page</h2>

          {errorMessage}

          {
            this.props.loading

            ?
            <i className="fa fa-spinner fa-pulse fa-5x fa-fw"></i>

            
            :

            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Username:</label>
                <input
                  className="form-control"
                  name="username"
                  type="text"
                  required />

                <label className="mt-3">Password:</label>
                <input
                  className="form-control"
                  name="password"
                  type="password"
                  required />
                
                <input className="btn btn-primary mt-3" type="submit" value="Submit" />
              </div>
            </form>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    access_token: state.auth.access_token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) => dispatch(actions.authLogin(username, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
