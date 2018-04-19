import React from 'react';
import {LoginButton} from 'lib/auth/LoginButton.js';

import './LoginPage.css';

const LoginPage = () => (
  <div className="LoginPage">
    <div className="LoginPage_center">
      <h1>ayc-starter</h1>
      <p>Some description</p>
      <LoginButton />
    </div>
  </div>
);

export default LoginPage;
