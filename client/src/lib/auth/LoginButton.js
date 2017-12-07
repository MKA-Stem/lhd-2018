import React from 'react';
import {withAuthInfo} from './authContext.js';
import google_logo from './google_logo.svg';
import './LoginButton.css';

export const LoginButton = withAuthInfo()(
  class LoginButton extends React.Component {
    async onLogin() {
      await this.props.auth.readyWait;
      this.props.auth.signIn();
    }

    render() {
      return (
        <button className="LoginButton" onClick={this.onLogin.bind(this)}>
          <img src={google_logo} alt="" className="LoginButton_logo" />
          Sign In with Google
        </button>
      );
    }
  }
);
