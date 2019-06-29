import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { AppColors } from '../../../../constants/theme';

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: AppColors.white, // backgorund color should be set for it to work
    shadowColor: AppColors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

const Card = ({ children, styleOpts }) => (
  <View style={[styles.container, styleOpts.container]}>{children}</View>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  styleOpts: PropTypes.shape({
    container: PropTypes.object,
  }),
};

Card.defaultProps = {
  styleOpts: {},
};

export { Card };
