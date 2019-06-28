import React from 'react';
import { View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import styles from './AppTextField.styles';

const AppTextField = ({ config: { label, textType, onChange } }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.ipt}
        textContentType={textType}
        placeholder={label}
        placeholderTextColor="#9a73ef"
        autoCapitalize="none"
        onChangeText={onChange}
      />
    </View>
  );
};

AppTextField.propTypes = {
  config: PropTypes.shape({
    label: PropTypes.string.isRequired,
    textType: PropTypes.oneOf(['none', 'password']),
    onChange: PropTypes.func.isRequired,
  }),
};

AppTextField.defaultProps = {
  config: {
    textType: 'none',
  },
};

export { AppTextField };
