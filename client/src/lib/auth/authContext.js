import React from 'react';
import PropTypes from 'prop-types';

const {Provider, Consumer} = React.createContext({info: null, googleAuth: null});

export class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.auth = props.auth;
    this.state = {
      ctx: {
        info: this.auth.getInfo(),
        googleAuth: this.auth
      }
    };

    this.listener = this.listener.bind(this);
  }

  listener(info) {
    this.setState({ctx: {info, googleAuth: this.auth}});
  }

  componentDidMount() {
    this.auth.subscribe(this.listener);
  }

  componentWillUnmount() {
    this.auth.unsubscribe(this.listener);
  }

  render() {
    return <Provider value={this.state.ctx}>{this.props.children}</Provider>;
  }
}

export const AuthConsumer = Consumer;
