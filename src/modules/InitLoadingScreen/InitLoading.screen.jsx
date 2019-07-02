import React, { Component } from 'react';
import { connect } from 'react-redux';

// MAIN_TABS, AUTH
import { AUTH } from '../../constants/screenNames';

import { Loader } from '../../shared/components/misc';

class InitLoadingScreen extends Component {
  componentDidMount() {
    const { navigation } = this.props;
    navigation.navigate(AUTH);
  }

  render() {
    return <Loader message="please wait..." />;
  }
}

export default connect()(InitLoadingScreen);
