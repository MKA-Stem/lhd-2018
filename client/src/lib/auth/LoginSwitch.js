import React from 'react';
import {AuthConsumer} from './authContext.js';

export const LoginSwitch = ({loggedIn, loggedOut}) => (
  <AuthConsumer>{({info}) => (info === null ? loggedOut : loggedIn)}</AuthConsumer>
);

export default LoginSwitch;
