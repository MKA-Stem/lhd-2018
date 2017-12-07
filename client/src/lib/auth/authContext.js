import React from 'react';
import PropTypes from 'prop-types';

export class AuthProvider extends React.Component {
  getChildContext() {
    return {
      auth: this.props.auth
    };
  }

  render() {
    return this.props.children;
  }

  static get childContextTypes() {
    return {
      auth: PropTypes.object
    };
  }
}

export const withAuthInfo = (mapInfoToProps, mapAuthToProps) => Child => {
  mapInfoToProps = mapInfoToProps || (authInfo => ({authInfo}));
  mapAuthToProps = mapAuthToProps || (auth => ({auth}));

  return class WithAuthInfo extends React.Component {
    constructor(props, context) {
      super(props);
      this.auth = context.auth;
      this.state = {authInfo: this.auth.getInfo()};
      this.listener = authInfo => this.setState({authInfo});
    }

    static get contextTypes() {
      return {
        auth: PropTypes.object
      };
    }

    componentDidMount() {
      this.auth.subscribe(this.listener);
    }

    componentWillUnmount() {
      this.auth.unsubscribe(this.listener);
    }

    render() {
      return (
        <Child
          {...this.props}
          {...mapInfoToProps(this.state.authInfo)}
          {...mapAuthToProps(this.auth)}
        />
      );
    }
  };
};
