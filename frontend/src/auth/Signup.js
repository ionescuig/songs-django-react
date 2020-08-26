import React, { Component } from "react";

class Signup extends Component{
  constructor(props){
      super(props);
      this.state = {
          username: "",
          password: "",
          email:""
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
      alert('A username and password was submitted: ' + this.state.username + " " + this.state.password + " " + this.state.email);
      event.preventDefault();
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-2 offset-sm-5">
          <h2 className="mt-5 mb-5">Signup Page</h2>
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Username:</label>
              <input className="form-control" name="username" type="text" value={this.state.username} onChange={this.handleChange} />

              <label className="mt-3">Email:</label>
              <input className="form-control" name="email" type="email" value={this.state.email} onChange={this.handleChange} />

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

export default Signup;