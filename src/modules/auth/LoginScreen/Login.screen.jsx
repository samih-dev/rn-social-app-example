import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';

import { AppTextField } from '../../../shared/components/forms';
import { Card } from '../../../shared/components/layout';
import { ActionButton } from '../../../shared/components/buttons';

import styles from './LoginScreen.styles';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.iptUserNameConfig = {
      label: 'User Name',
      onChange: value => this.onIptChange('username', value),
    };

    this.iptPasswordConfig = {
      label: 'Password',
      onChange: value => this.onIptChange('password', value),
    };

    this.cardStyleOpts = StyleSheet.create({
      container: {
        width: '80%',
      },
    });
  }

  onIptChange = (fieldName, value) => {
    // todo change the rdx store
  };

  loginOrRegister = () => {};

  render() {
    return (
      <View style={styles.container}>
        <Card styleOpts={this.cardStyleOpts}>
          <View style={styles.txtLoginRegister}>
            <Text>Login | Register</Text>
          </View>
          <AppTextField style={styles.ipt} config={this.iptUserNameConfig} />
          <AppTextField style={styles.ipt} config={this.iptPasswordConfig} />

          <View style={styles.btn}>
            <ActionButton
              config={{
                icon: 'arrow-forward',
                label: 'Login',
                onPress: this.loginOrRegister,
              }}
            ></ActionButton>
          </View>
        </Card>
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
