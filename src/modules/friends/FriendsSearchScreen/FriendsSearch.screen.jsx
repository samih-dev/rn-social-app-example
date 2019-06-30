import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class FriendsSearchScreen extends Component {
  render() {
    return (
      <View>
        <Text>Reached</Text>
      </View>
    );
  }
}

export default connect()(FriendsSearchScreen);
