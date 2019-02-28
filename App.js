import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Provider } from 'react-redux';

import RootNavigator from './src/shared/navigation/RootNavigator.component';

export default class App extends Component {
  render() {
    return (
      <Provider store={}>
        <RootNavigator />
      </Provider>
    );
  }
}
