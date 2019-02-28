import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

// MAIN_TABS
import { AUTH } from '../../constants/screenNames';

class InitLoadingScreen extends Component {
  componentDidMount() {
    const { navigation } = this.props;
    navigation.navigate(AUTH);
  }

  render() {
    return (
      <View>
        <Text>Loading...</Text>;
      </View>
    );
  }
}

export default connect()(InitLoadingScreen);
