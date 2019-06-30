import React from 'react';
import { Platform, View } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

import { AppColors } from '../../../constants/theme';

const ActionButton = ({ config: { icon, label, onPress, styleOpts } }) => {
  const iconName = Platform.OS === 'ios' ? `ios-${icon}` : `md-${icon}`;

  return (
    <View style={styleOpts ? styleOpts.container : {}}>
      <Icon.Button name={iconName} backgroundColor={AppColors.blue} onPress={onPress}>
        {label}
      </Icon.Button>
    </View>
  );
};

ActionButton.propTypes = {
  config: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    styleOpts: PropTypes.shape({
      container: PropTypes.object,
    }),
  }).isRequired,
};

// ActionButton.defaultProps = {
// };

export { ActionButton };
