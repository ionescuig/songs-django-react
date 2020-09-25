import React from 'react';
import { BrowserRouter , Switch} from 'react-router-dom'
import { Route  } from 'react-router-dom'

import Navbar from '../navbar/Navbar'
import Login from '../auth/Login'
import Signup from '../auth/Signup'
import SongsList from '../songs/SongsList'
import SongCreateUpdate from '../songs/SongCreateUpdate'
import AboutPage from './About';
import './App.css';


class App extends React.Component {
  render() {

    return (
      <BrowserRouter>
        <div className="container-fluid">
          <Navbar/>
          <div className="content">
            <Switch>
              <Route path="/" exact component={SongsList} />
              <Route exact path="/login/" component={Login} />
              <Route exact path="/signup/" component={Signup}/>
              <Route path="/songs/:id" component={SongCreateUpdate} />
              <Route path="/songs/" exact component={SongCreateUpdate} />
              <Route exact path="/about/" component={AboutPage}/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;