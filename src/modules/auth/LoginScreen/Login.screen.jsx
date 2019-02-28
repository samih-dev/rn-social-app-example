import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class LoginScreen extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <View>
        <Text>Login Screen!</Text>
        <Text>Auth: {authenticated ? 'yes' : 'no'}</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {
    authReducer: { authenticated },
  } = state;

  return {
    authenticated,
  };
}

LoginScreen.propTypes = {
  authenticated: PropTypes.bool,
};

LoginScreen.defaultProps = {
  authenticated: false,
};

export default connect(
  mapStateToProps,
  null
)(LoginScreen);
