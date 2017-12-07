import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import {withAuthInfo} from 'lib/auth/authContext.js';

import './App.css';

import DemoPage from 'pages/DemoPage.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App_header">
          <div className="App_container">
            <span className="App_brand">
              <Link to="/">ayc-starter</Link>
            </span>
            <button className="App_logout" onClick={() => this.props.auth.signOut()}>
              {(this.props.auth.getInfo() || {}).email} | Sign Out
            </button>
          </div>
        </div>

        <div className="App_container">
          <Switch>
            <Route exact path="/" component={DemoPage} />
            <Route path="*" component={() => <h2>404: Not Found</h2>} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withAuthInfo()(App);
