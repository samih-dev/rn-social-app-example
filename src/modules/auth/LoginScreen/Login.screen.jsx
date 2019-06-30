import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { AppTextField, FormHint } from '../../../shared/components/forms';
import { Card } from '../../../shared/components/layout';
import { ActionButton } from '../../../shared/components/buttons';
import { Loader } from '../../../shared/components/misc';
import { POSTS_FEED_SCREEN } from '../../../constants/screenNames';

import { loginUser as doLoginUser, fieldValueChange, setFormSubmitted } from '../authRdx';

import { setUserDetails as doSetUserDetails } from '../../user/userRdx';

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
      textType: 'password',
      onChange: value => this.onIptChange('password', value),
    };

    this.cardStyleOpts = StyleSheet.create({
      container: {
        width: '80%',
      },
    });
  }

  onIptChange = (fieldName, value) => {
    const { onFieldValueChange } = this.props;
    onFieldValueChange(fieldName, value);
  };

  loginOrRegister = () => {
    const { navigation, form, loginUser, doSetFormSubmitted, setUserDetails } = this.props;

    if (form.valid) {
      loginUser();

      setTimeout(() => {
        setUserDetails(form.username);
        navigation.navigate(POSTS_FEED_SCREEN);
      }, 3000);
    } else {
      doSetFormSubmitted(true);
    }
  };

  render() {
    const { pending, form } = this.props;

    const { username, password, submitted } = form;

    return (
      <View style={styles.container}>
        <Card styleOpts={this.cardStyleOpts}>
          {pending ? (
            <View style={styles.loaderContainer}>
              <Loader message="entering..." />
            </View>
          ) : (
            <View>
              <View style={styles.txtLoginRegister}>
                <Text>Login | Register</Text>
              </View>
              <AppTextField style={styles.ipt} config={this.iptUserNameConfig} />
              {submitted && !username && (
                <FormHint config={{ message: 'please provide a username' }} />
              )}

              <AppTextField style={styles.ipt} config={this.iptPasswordConfig} />
              {submitted && !password && (
                <FormHint config={{ message: 'please provide a password' }} />
              )}

              <View style={styles.btn}>
                <ActionButton
                  config={{
                    icon: 'arrow-forward',
                    label: 'Login',
                    onPress: this.loginOrRegister,
                  }}
                ></ActionButton>
              </View>
            </View>
          )}
        </Card>
      </View>
    );
  }
}

LoginScreen.propTypes = {
  onFieldValueChange: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  doSetFormSubmitted: PropTypes.func.isRequired,
  setUserDetails: PropTypes.func.isRequired,

  pending: PropTypes.bool.isRequired,
  form: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    submitted: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  const {
    auth: { authenticated, pending, form },
  } = state;

  return {
    authenticated,
    pending,
    form,
  };
}

export default connect(
  mapStateToProps,
  {
    loginUser: doLoginUser,
    onFieldValueChange: fieldValueChange,
    doSetFormSubmitted: setFormSubmitted,

    setUserDetails: doSetUserDetails,
  }
)(LoginScreen);
