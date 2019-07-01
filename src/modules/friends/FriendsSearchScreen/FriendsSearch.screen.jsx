import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { screenMainContentSS } from '../../../constants/theme';

import { FriendView } from '../components';
import { FriendModel } from '../models';

class FriendsSearchScreen extends Component {
  onFriendAdd = () => {};

  render() {
    const { friends } = this.props;

    return (
      <FlatList
        contentContainerStyle={screenMainContentSS.styles}
        data={friends}
        keyExtractor={friendModel => friendModel.username}
        renderItem={({ item: friendModel }) => (
          <FriendView {...friendModel} config={{ onFriendAdd: this.onFriendAdd }} />
        )}
      ></FlatList>
    );
  }
}

FriendsSearchScreen.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.instanceOf(FriendModel)).isRequired,
};

function mapStateToProps(state) {
  return {
    friends: state.friends.friendsList,
  };
}

export default connect(
  mapStateToProps,
  {}
)(FriendsSearchScreen);
