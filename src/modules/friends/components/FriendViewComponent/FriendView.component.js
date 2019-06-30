import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

import { ActionButton } from '../../../../shared/components/buttons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 75,
  },
  section: {
    flex: 1,
    justifyContent: 'center',
  },
  sectionBtns: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  txtUsername: {
    fontSize: 16,
    marginBottom: 3,
  },
});

const btnAcceptStyles = {
  container: {
    marginRight: 5,
  },
};

const FriendView = ({ username, askedDate, acceptDate, onFriendAccept, onFriendDeny }) => {
  const isFriendRequestView = !!acceptDate === false;

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.txtUsername} numberOfLines={1}>
          {username}
        </Text>
        {isFriendRequestView && <Text>{moment(askedDate).format('L')}</Text>}
      </View>
      {isFriendRequestView && (
        <View style={[styles.section, styles.sectionBtns]}>
          <ActionButton
            config={{
              icon: 'checkmark',
              label: 'Accept',
              onPress: () => onFriendAccept(username),
              styleOpts: btnAcceptStyles,
            }}
          ></ActionButton>

          <ActionButton
            config={{
              icon: 'close',
              label: 'Deny',
              onPress: () => onFriendDeny(username),
            }}
          ></ActionButton>
        </View>
      )}
    </View>
  );
};

FriendView.propTypes = {
  username: PropTypes.string.isRequired,
  askedDate: PropTypes.instanceOf(Date).isRequired,
  acceptDate: PropTypes.instanceOf(Date),

  onFriendAccept: PropTypes.func.isRequired,
  onFriendDeny: PropTypes.func.isRequired,
};

FriendView.defaultProps = {
  acceptDate: undefined,
};

export { FriendView };
