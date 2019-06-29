import React from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

import { AppColors } from '../../../constants/theme';

const ActionButton = ({ config: { icon, label, onPress } }) => {
  const iconName = Platform.OS === 'ios' ? `ios-${icon}` : `md-${icon}`;

  return (
    <Icon.Button name={iconName} backgroundColor={AppColors.blue} onPress={onPress}>
      {label}
    </Icon.Button>
  );
};

ActionButton.propTypes = {
  config: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  }).isRequired,
};

// ActionButton.defaultProps = {
// };

export { ActionButton };
