import React, { Component } from "react";
import axiosInstance from "./AuthServices";
// import axiosInstance from './AuthServices'

class Login extends Component {
  constructor(props) {
      super(props);
      this.state = {username: "", password: ""};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    try {
      const response = axiosInstance.post('/token/', {
          username: this.state.username,
          password: this.state.password
      });
      response.then(res => {
        axiosInstance.defaults.headers['Authorization'] = "Bearer " + res.data.access;
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
      })
      return response;
    } catch (error) {
      throw error;
    }
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-2 offset-sm-5">
          <h2 className="mt-5 mb-5">Login Page</h2>
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Username:</label>
              <input className="form-control" name="username" type="text" value={this.state.username} onChange={this.handleChange} />

              <label className="mt-3">Password:</label>
              <input className="form-control" name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
              
              <input className="btn btn-primary mt-3" type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
