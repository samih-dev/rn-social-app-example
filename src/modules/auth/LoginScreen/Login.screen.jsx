import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { AppTextField } from '../../../shared/components/forms';

import { screenMainContentSS } from '../../../constants/theme';

import styles from './LoginScreen.styles';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.iptUserNameConfig = {
      label: 'username',
      onChange: value => this.onIptChange('username', value),
    };

    this.iptPasswordConfig = {
      label: 'password',
      onChange: value => this.onIptChange('password', value),
    };
  }

  onIptChange = (fieldName, value) => {
    // todo change the rdx store
  };

  render() {
    return (
      <View style={[screenMainContentSS.styles, styles.container]}>
        <AppTextField style={styles.ipt} config={this.iptUserNameConfig} />
        <AppTextField style={styles.ipt} config={this.iptPasswordConfig} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const {
    authReducer: { authenticated },
  } = state;

  return {
    authenticated,
  };
}

LoginScreen.propTypes = {
  // authenticated: PropTypes.bool,
};

LoginScreen.defaultProps = {
  authenticated: false,
};

export default connect(
  mapStateToProps,
  null
)(LoginScreen);
