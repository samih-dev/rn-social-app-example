import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { AppColors } from '../../../../constants/theme';

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: AppColors.mainColor,
    marginBottom: 5,
    borderRadius: 5,
  },
});

const FormInputWrap = ({ children }) => <View style={styles.container}>{children}</View>;

FormInputWrap.propTypes = {
  children: PropTypes.node.isRequired,
};

export { FormInputWrap };
