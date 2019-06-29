import React, { Component } from 'react';
import { connect } from 'react-redux';

// MAIN_TABS, AUTH
import { AUTH, MAIN_TABS } from '../../constants/screenNames';

import { Loader } from '../../shared/components/misc';

class InitLoadingScreen extends Component {
  componentDidMount() {
    const { navigation } = this.props;
    setTimeout(() => {
      navigation.navigate(AUTH);
    }, 3000);
  }

  render() {
    return <Loader message="pelase wait..." />;
  }
}

export default connect()(InitLoadingScreen);
