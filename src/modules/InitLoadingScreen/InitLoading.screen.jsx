import React, { Component } from 'react';
import { connect } from 'react-redux';

// MAIN_TABS, AUTH
import { MAIN_TABS } from '../../constants/screenNames';

import { Loader } from '../../shared/components/misc';

class InitLoadingScreen extends Component {
  componentDidMount() {
    const { navigation } = this.props;
    navigation.navigate(MAIN_TABS);
  }

  render() {
    return <Loader message="please wait..." />;
  }
}

export default connect()(InitLoadingScreen);
