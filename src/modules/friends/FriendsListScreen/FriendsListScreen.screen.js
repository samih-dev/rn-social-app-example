import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { connect } from 'react-redux';

class FriendsListScreen extends Component {
  render() {
    return (
      <View>
        <Text></Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  {}
)(FriendsListScreen);
