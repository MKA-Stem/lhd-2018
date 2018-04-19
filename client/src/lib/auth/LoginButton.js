import React from 'react';
import {AuthConsumer} from './authContext.js';
import google_logo from './google_logo.svg';
import './LoginButton.css';

export const LoginButton = () => (
  <AuthConsumer>
    {({googleAuth}) => (
      <button className="LoginButton" onClick={() => googleAuth.signIn()}>
        <img src={google_logo} alt="" className="LoginButton_logo" />
        Sign In with Google
      </button>
    )}
  </AuthConsumer>
);
