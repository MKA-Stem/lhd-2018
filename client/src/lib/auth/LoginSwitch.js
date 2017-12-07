import {withAuthInfo} from './authContext.js';

export const LoginSwitch = ({authInfo, loggedIn, loggedOut}) => {
  if (authInfo !== null) {
    return loggedIn;
  } else {
    return loggedOut;
  }
};

export default withAuthInfo()(LoginSwitch);
