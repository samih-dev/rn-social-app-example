import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { screenMainContentSS } from '../../../constants/theme';

import { Loader } from '../../../shared/components/misc';

import { FriendView } from '../components';
import { FriendModel } from '../models';
import {
  friendRequest as doFriendRequest,
  getNonFriendsList as doGetNonFriendsList,
} from '../friendsRdx';

import { UserModel } from '../../user/models';

class FriendsSearchScreen extends Component {
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
    const {
      user: { id: userId, friendsIds, usersIdsWithRequest },
      getNonFriendsList,
    } = this.props;

    getNonFriendsList(userId, friendsIds, usersIdsWithRequest);
  };

  onFriendAdd = friendIdToAsk => {
    const {
      friendRequest,
      user: { id: userId },
    } = this.props;

    friendRequest(userId, friendIdToAsk);
  };

  render() {
    const { nonFriends, pending } = this.props;

    if (pending) {
      return <Loader message="loading..." />;
    }

    return (
      <FlatList
        contentContainerStyle={screenMainContentSS.styles}
        data={nonFriends}
        keyExtractor={friendModel => friendModel.username}
        renderItem={({ item: friendModel }) => (
          <FriendView {...friendModel} config={{ onFriendAdd: this.onFriendAdd }} />
        )}
      ></FlatList>
    );
  }
}

FriendsSearchScreen.propTypes = {
  nonFriends: PropTypes.arrayOf(PropTypes.instanceOf(FriendModel)).isRequired,
  pending: PropTypes.bool.isRequired,
  user: PropTypes.instanceOf(UserModel).isRequired,

  getNonFriendsList: PropTypes.func.isRequired,
  friendRequest: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { pending, nonFriends } = state.friends;
  return {
    nonFriends,
    pending,

    user: state.user,
  };
}

export default connect(
  mapStateToProps,
  {
    getNonFriendsList: doGetNonFriendsList,
    friendRequest: doFriendRequest,
  }
)(FriendsSearchScreen);
