import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

class PostsFeedScreen extends Component {
  render() {
    return <Text>Post Feed !</Text>;
  }
}

export default connect()(PostsFeedScreen);
