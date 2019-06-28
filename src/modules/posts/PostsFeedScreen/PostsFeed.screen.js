import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { screenMainContentSS } from '../../../constants/theme';

class PostsFeedScreen extends Component {
  render() {
    return (
      <View style={screenMainContentSS.styles}>
        <Text>Post Feed !</Text>
      </View>
    );
  }
}

export default connect()(PostsFeedScreen);
