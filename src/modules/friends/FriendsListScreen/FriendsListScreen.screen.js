import React, { Component } from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Loader } from '../../../shared/components/misc';

import { getFriendsList as doGetFriendsList } from '../friendsRdx';
import { FriendModel } from '../models';

import { screenMainContentSS, AppColors } from '../../../constants/theme';

import { FriendView } from '../components';

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

const friendViewStylesOpts = {
  container: {
    paddingLeft: 5,
    borderLeftWidth: 3,
    borderLeftColor: AppColors.mainColor,
    marginTop: 5,
    marginBottom: 5,
  },
};

class FriendsListScreen extends Component {
  componentDidMount() {
    const { getFriendsList } = this.props;
    getFriendsList();
  }

  onFriendAccept = username => {};

  onFriendDeny = username => {};

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

    if (pending) {
      return <Loader />;
    }

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
                styleOpts: friendViewStylesOpts,
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
  getFriendsList: PropTypes.func.isRequired,

  friends: PropTypes.arrayOf(PropTypes.instanceOf(FriendModel)).isRequired,
  friendsRequests: PropTypes.arrayOf(PropTypes.instanceOf(FriendModel)).isRequired,
};

function mapStateToProps(state) {
  return {
    friends: state.friends.friendsList,
    friendsRequests: state.friends.friendsRequests,
    pending: state.friends.pending,
  };
}

export default connect(
  mapStateToProps,
  {
    getFriendsList: doGetFriendsList,
  }
)(FriendsListScreen);
