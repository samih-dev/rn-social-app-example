import React, { Component } from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Loader } from '../../../shared/components/misc';

import {
  getFriendsAndFriendsRequestsList as doGetFriendsAndFriendsRequestsList,
  acceptRequest as doAcceptRequest,
  denyRequest as doDenyRequest,
} from '../friendsRdx';
import { FriendModel } from '../models';

import { screenMainContentSS, AppColors } from '../../../constants/theme';

import { FriendView } from '../components';
import { UserModel } from '../../user/models';

const styles = StyleSheet.create({
  sectionHeader: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.greenLight,
  },

  noContent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
  },
  txtNoContent: {
    fontWeight: 'bold',
  },
});

class FriendsListScreen extends Component {
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
    const { getFriendsAndFriendsRequestsList, user } = this.props;
    getFriendsAndFriendsRequestsList(user.id);
  };

  onFriendAccept = friendId => {
    const {
      acceptRequest,
      user: { id: userId },
    } = this.props;
    acceptRequest(userId, friendId);
  };

  onFriendDeny = friendId => {
    const {
      denyRequest,
      user: { id: userId },
    } = this.props;
    denyRequest(userId, friendId);
  };

  renderSection = ({ section: { title, bgColor } }) => {
    return (
      <View style={[styles.sectionHeader, { backgroundColor: bgColor }]}>
        <Text>{title}</Text>
      </View>
    );
  };

  renderNoContent = section => {
    if (section.data.length === 0) {
      return (
        <View style={styles.noContent}>
          <Text style={styles.txtNoContent}>{section.noDataMessage}</Text>
        </View>
      );
    }
    return null;
  };

  render() {
    const { pending, friends, friendsRequests } = this.props;

    if (pending) {
      return <Loader />;
    }

    const sectionListData = [
      {
        title: 'Friends Requests',
        bgColor: AppColors.orange,
        data: friendsRequests,
        noDataMessage: 'No Friends Requests!!',
      },
      {
        title: 'Friends List',
        bgColor: AppColors.greenLight,
        data: friends,
        noDataMessage: 'No Friends Yet, start searching!!',
      },
    ];

    return (
      <View style={screenMainContentSS.styles}>
        <SectionList
          sections={sectionListData}
          keyExtractor={friendModel => friendModel.username}
          renderSectionHeader={this.renderSection}
          renderSectionFooter={({ section }) => this.renderNoContent(section)}
          renderItem={({ item: friendModel }) => (
            <FriendView
              {...friendModel}
              config={{
                onFriendAccept: this.onFriendAccept,
                onFriendDeny: this.onFriendDeny,
              }}
            />
          )}
        />
      </View>
    );
  }
}

FriendsListScreen.propTypes = {
  pending: PropTypes.bool.isRequired,
  friends: PropTypes.arrayOf(PropTypes.instanceOf(FriendModel)).isRequired,
  friendsRequests: PropTypes.arrayOf(PropTypes.instanceOf(FriendModel)).isRequired,
  user: PropTypes.instanceOf(UserModel).isRequired,

  getFriendsAndFriendsRequestsList: PropTypes.func.isRequired,
  acceptRequest: PropTypes.func.isRequired,
  denyRequest: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    friends: state.friends.friendsList,
    friendsRequests: state.friends.friendsRequests,
    pending: state.friends.pending,

    user: state.user,
  };
}

export default connect(
  mapStateToProps,
  {
    getFriendsAndFriendsRequestsList: doGetFriendsAndFriendsRequestsList,
    acceptRequest: doAcceptRequest,
    denyRequest: doDenyRequest,
  }
)(FriendsListScreen);
