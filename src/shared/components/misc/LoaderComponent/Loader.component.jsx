import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { AppColors } from '../../../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Loader = ({ message }) => (
  <View style={styles.container}>
    {!!message && <Text>{message}</Text>}
    <ActivityIndicator size="large" color={AppColors.blue} />
  </View>
);

Loader.propTypes = {
  message: PropTypes.string,
};

Loader.defaultProps = {
  message: '',
};

export { Loader };
