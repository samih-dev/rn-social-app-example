import React from 'react';
import { View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import { FormInputWrap } from '../../layout';

import styles from './AppTextField.styles';

const AppTextField = ({ config: { label, textType, placeholder, styleOpts, onChange } }) => {
  return (
    <FormInputWrap>
      <View style={[styles.container, styleOpts ? styleOpts.container : {}]}>
        <Text style={label ? styles.label : {}}>{label}</Text>
        <View style={styles.ipt}>
          <TextInput
            secureTextEntry={textType === 'password'}
            textContentType={textType}
            multiline={textType === 'multiline'}
            placeholder={placeholder || '...'}
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
    label: PropTypes.string,
    placeholder: PropTypes.string,
    styleOpts: PropTypes.shape({
      container: PropTypes.object,
    }),
    textType: PropTypes.oneOf(['none', 'password', 'multiline']),
    onChange: PropTypes.func.isRequired,
  }),
};

AppTextField.defaultProps = {
  config: {
    textType: 'none',
  },
};

const ENUM_TEXT_TYPES = {
  RAW_TEXT: 'none',
  PASSWORD: 'password',
  MULTI_LINE: 'multiline',
};

export { AppTextField, ENUM_TEXT_TYPES };
