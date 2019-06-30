import React from 'react';
import { View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import { FormInputWrap } from '../../layout';

import styles from './AppTextField.styles';

const ENUM_TEXT_TYPES = {
  RAW_TEXT: 'none',
  PASSWORD: 'password',
  MULTI_LINE: 'multiline',
};

const AppTextField = ({ config: { label, textType, placeholder, styleOpts, onChange, value } }) => {
  return (
    <FormInputWrap>
      <View style={[styles.container, styleOpts ? styleOpts.container : {}]}>
        <Text style={label ? styles.label : {}}>{label}</Text>
        <View style={styles.ipt}>
          <TextInput
            secureTextEntry={textType === ENUM_TEXT_TYPES.PASSWORD}
            textContentType={textType === ENUM_TEXT_TYPES.MULTI_LINE ? 'none' : textType}
            multiline={textType === ENUM_TEXT_TYPES.MULTI_LINE}
            placeholder={placeholder || '...'}
            autoCapitalize="none"
            onChangeText={onChange}
            value={value}
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
    value: PropTypes.string,
  }),
};

AppTextField.defaultProps = {
  config: {
    textType: 'none',
  },
};

export { AppTextField, ENUM_TEXT_TYPES };
