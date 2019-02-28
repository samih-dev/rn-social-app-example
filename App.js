import React, { Component } from 'react';

import { Provider } from 'react-redux';

import RootNavigator from './src/shared/navigation/RootNavigator.component';

import store from './src/shared/redux/store';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}
