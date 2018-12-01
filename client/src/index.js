import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import mobile from 'is-mobile';

import HostMain from 'components/HostMain.js';
import ClientMain from 'components/ClientMain.js';

let MainComponent = HostMain;
if (mobile()) {
  MainComponent = ClientMain;
}

ReactDOM.render(<MainComponent />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
