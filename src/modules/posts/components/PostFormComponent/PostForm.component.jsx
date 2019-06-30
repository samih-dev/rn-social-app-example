import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { Card } from '../../../../shared/components/layout';
import { AppTextField, ENUM_TEXT_TYPES, FormHint } from '../../../../shared/components/forms';
import { ActionButton } from '../../../../shared/components/buttons';
import { PostFormModel } from '../../models';

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
});

const PostForm = ({ model: { onSubmit, onIptChange, form } }) => {
  const iptPostTextConfig = {
    // label: 'write a post...',
    textType: ENUM_TEXT_TYPES.MULTI_LINE,
    placeholder: 'write a post...',
    onChange: onIptChange,
    styleOpts: {
      container: {
        height: 75,
      },
    },
    value: form.value,
  };

  return (
    <Card>
      <AppTextField config={iptPostTextConfig} />
      {form.submitted && !form.value && (
        <FormHint config={{ message: 'please provide post content' }} />
      )}

      <View style={styles.btnContainer}>
        <ActionButton
          config={{
            label: 'Post',
            icon: 'send',
            onPress: onSubmit,
          }}
        ></ActionButton>
      </View>
    </Card>
  );
};

PostForm.propTypes = {
  model: PropTypes.shape({
    onSubmit: PropTypes.func.isRequired,
    onIptChange: PropTypes.func.isRequired,
    form: PropTypes.instanceOf(PostFormModel),
  }).isRequired,
};

export { PostForm };
