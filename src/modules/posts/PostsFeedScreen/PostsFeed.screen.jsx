import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PostForm, PostView } from '../components';

import { screenMainContentSS } from '../../../constants/theme';
import { PostModel, PostFormModel } from '../models';
import { UserModel } from '../../user/models';

import { createNewPost, formValueChange } from '../postsRdx';

import styles from './PostsFeedScreen.styles';

class PostsFeedScreen extends Component {
  frmOnSubmit = () => {
    const { form, user, createPost, onFormValueChange } = this.props;
    if (form.valid) {
      createPost(user.username, form.value);
    } else {
      // todo set submitted to true
      onFormValueChange('submitted', true);
    }
  };

  frmIptOnChange = value => {
    const { onFormValueChange } = this.props;
    onFormValueChange('value', value);
  };

  render() {
    const { posts, form } = this.props;
    return (
      <View style={screenMainContentSS.styles}>
        <View style={styles.frmContainer}>
          <PostForm
            model={{
              onSubmit: this.frmOnSubmit,
              onIptChange: this.frmIptOnChange,
              form,
            }}
          />
        </View>

        <View style={styles.listContainer}>
          <FlatList
            data={posts}
            keyExtractor={post => post.id}
            renderItem={({ item: post }) => <PostView {...post} />}
          />
        </View>
      </View>
    );
  }
}

PostsFeedScreen.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.instanceOf(PostModel)).isRequired,
  form: PropTypes.instanceOf(PostFormModel).isRequired,
  user: PropTypes.instanceOf(UserModel).isRequired,

  createPost: PropTypes.func.isRequired,
  onFormValueChange: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    posts: state.posts.postsList,
    form: state.posts.form,
    user: state.user,
  };
}
export default connect(
  mapStateToProps,
  {
    createPost: createNewPost,
    onFormValueChange: formValueChange,
  }
)(PostsFeedScreen);
