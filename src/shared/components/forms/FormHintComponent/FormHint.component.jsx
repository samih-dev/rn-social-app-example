import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { AppColors } from '../../../../constants/theme';

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 3,
    borderLeftColor: AppColors.red,
    paddingLeft: 5,
    marginBottom: 15,
  },
  msg: {
    color: AppColors.red,
  },
});

const FormHint = ({ config: { message } }) => (
  <View style={styles.container}>
    <Text style={styles.msg}>{message}</Text>
  </View>
);

FormHint.propTypes = {
  config: PropTypes.shape({
    message: PropTypes.string,
  }).isRequired,
};

export { FormHint };
