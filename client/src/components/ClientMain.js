import React from 'react';
import io from 'socket.io-client';

const socketUrl = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8080/';

console.log('sock url', socketUrl);

class ClientMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: ''
    };
  }

  componentDidMount() {
    console.log('Connecting to socket');
    this.socket = io(socketUrl, {transports: ['websocket']});

    this.socket.on('connect', () => {
      window.socket = this.socket;
      console.log('connected, window.socket for debugging');
    });

    this.socket.on('error', err => {
      throw err;
    });

    this.socket.on('debug', msg => console.log('debug:', msg));

    window.socket = this.socket; // for debugging
  }

  render() {
    return <h1>Client Main</h1>;
  }
}

export default ClientMain;
