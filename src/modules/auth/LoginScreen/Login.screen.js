import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

class LoginScreen extends Component {
  render() {
    return <Text>Login Screen!</Text>;
  }
}

export default connect()(LoginScreen);
