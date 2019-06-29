import React from 'react';
import PropTypes from 'prop-types';

import { Card } from '../../../../shared/components/layout';
import { AppTextField, ENUM_TEXT_TYPES } from '../../../../shared/components/forms';

const iptPostTextConfig = {
  // label: 'write a post...',
  textType: ENUM_TEXT_TYPES.MULTI_LINE,
  placeholder: 'write a post...',
  styleOpts: {
    container: {
      height: 75,
    },
  },
};

const PostForm = ({ config: { onSubmit, onIptChange }, submitted }) => {
  return (
    <Card>
      <AppTextField config={iptPostTextConfig} />
    </Card>
  );
};

PostForm.propTypes = {
  submitted: PropTypes.bool.isRequired,
  config: PropTypes.shape({
    onSubmit: PropTypes.func.isRequired,
    onIptChange: PropTypes.func.isRequired,
  }).isRequired,
};

export { PostForm };
