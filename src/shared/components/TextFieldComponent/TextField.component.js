import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TextFieldComponent extends Component {
  onChangeHandler = text => {
    // to do dispatch redux action
  };

  render() {
    const { label } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Text>{label}</Text>

        <TextInput onChangeText={this.onChangeHandler} />
      </View>
    );
  }
}

TextFieldComponent.propTypes = {
  label: PropTypes.string.isRequired,
};

export default connect()(TextFieldComponent);
