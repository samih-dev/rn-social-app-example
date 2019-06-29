import React from 'react';
import { View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import { FormInputWrap } from '../../layout';

import styles from './AppTextField.styles';

const AppTextField = ({ config: { label, textType, onChange } }) => {
  return (
    <FormInputWrap>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.ipt}>
          <TextInput
            textContentType={textType}
            placeholder="..."
            autoCapitalize="none"
            onChangeText={onChange}
          />
        </View>
      </View>
    </FormInputWrap>
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
