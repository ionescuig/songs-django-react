import React from 'react';


class AboutPage extends React.Component {

  render() {

    return (
      <div className="col-md-10 offset-md-1">
        <div className="row">

          <div className="col-md-8">
            <h2 style={{marginBottom: 40}}>About Page</h2>
            <p>Test Django REST Framework (API) and React.js (with Redux).</p>
            <ul>
              <li>user authentication</li>
              <li>user authorisation</li>
              <li>api calls</li>
              <li>redux state</li>
              <li>local storage</li>
              <li>CRUD in backend</li>
              <li>CRUD in frontend</li>
            </ul>
          </div>


          <div className="col-md-4" style={{color: "red"}}>
            <div>
              To Do:
              <ul>
                <li>Not geting songs list if anonymous user - check <strong>api</strong>.</li>
                <li>Signup not done in <strong>api</strong> yet.</li>
              </ul>
            </div>

            <div><small>
              Solved:
              <ul>
                <li>Not updating on delete. Maybe because renders from state instead of props.</li>
                <li>Not sorting. Maybe because can't modify props.  Maybe send as dispatch and modify in actions/reducers.</li>
                <li>Create <strong>About</strong> page.</li>
                <li>Move this list in <strong>About</strong> page.</li>
              </ul>
            </small></div>
          </div>

        </div>
      </div>        
    )
  }
}

export default AboutPage;
