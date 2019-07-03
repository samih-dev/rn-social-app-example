import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PostForm, PostView } from '../components';

import { screenMainContentSS } from '../../../constants/theme';
import { PostModel, PostFormModel } from '../models';
import { UserModel } from '../../user/models';

import { Loader } from '../../../shared/components/misc';

import { createNewPost, formValueChange, loadPosts as doPostLoad } from '../postsRdx';

import styles from './PostsFeedScreen.styles';

class PostsFeedScreen extends Component {
  constructor(props) {
    super(props);
    this.navFocEvtSub = null;
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.navFocEvtSub = navigation.addListener('didFocus', this.loadData);
  }

  componentWillUnmount = () => {
    this.navFocEvtSub.remove();
  };

  loadData = () => {
    const { postLoad, user } = this.props;
    postLoad(user.id, user.friendsIds);
  };

  frmOnSubmit = () => {
    const { form, user, createPost, onFormValueChange } = this.props;
    if (form.valid) {
      createPost(user.id, form.value);
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
    const { posts, form, pending } = this.props;

    if (pending) {
      return <Loader message="loading..." />;
    }

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
  pending: PropTypes.bool.isRequired,
  user: PropTypes.instanceOf(UserModel).isRequired,

  createPost: PropTypes.func.isRequired,
  onFormValueChange: PropTypes.func.isRequired,
  postLoad: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { postsList: posts, form, pending } = state.posts;
  return {
    posts,
    form,
    pending,
    user: state.user,
  };
}
export default connect(
  mapStateToProps,
  {
    postLoad: doPostLoad,
    createPost: createNewPost,
    onFormValueChange: formValueChange,
  }
)(PostsFeedScreen);
