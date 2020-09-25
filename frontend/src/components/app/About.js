import React from 'react';


class AboutPage extends React.Component {

  render() {

    return (
      <div className="col-md-10 offset-md-1">

        {/* Errors */}
        <div  style={{color: "red", margin: 40}}>
          <div>
            To Do:
            <ul>
              <li>
                Not geting songs list if anonymous user - check <strong>api</strong>.
              </li>
              <li>
                Signup not done in <strong>api</strong> yet.
              </li>
            </ul>
          </div>
          <div><small>
            Solved:
            <ul>
              <li>
                Not updating on delete. Maybe because renders from state instead of props.
              </li>
              <li>
                Not sorting. Maybe because can't modify props.  Maybe send as dispatch and modify in actions/reducers.
              </li>
              <li>
                Create <strong>About</strong> page.
              </li>
              <li>
                Move this list in <strong>About</strong> page.
              </li>
            </ul>
          </small></div>
        </div>
      </div>

    )
  }
}

export default AboutPage;
