import React, { Component } from 'react';
import { BrowserRouter , Switch} from 'react-router-dom'
import { Route  } from 'react-router-dom'

import Navbar from '../navbar/Navbar'
import Login from '../auth/Login'
import Signup from '../auth/Signup'
import SongsList from '../songs/SongsList'
import SongCreateUpdate from '../songs/SongCreateUpdate'
import './App.css';


class BaseLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
    }
    this.handleUserChange = this.handleUserChange.bind(this)
  }

  handleUserChange (username) {
    this.setState({username: username})
  }

  componentDidMount () {
    try {
      let username = localStorage.getItem("username")
      this.setState({username: username})
    } catch (error) {
      throw error;
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <Navbar username={this.state.username} onUserChange={this.handleUserChange}/>
        <div className="content">
          <Switch>
            <Route path="/" exact component={SongsList} />
            <Route exact path={"/login/"} render={(props) => <Login {...props} onUserChange={this.handleUserChange} />} />
            <Route exact path={"/signup/"} component={Signup}/>
            <Route path="/songs/:id" component={SongCreateUpdate} />
            <Route path="/songs/" exact component={SongCreateUpdate} />
          </Switch>
        </div>
      </div>
    )
  }
}

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