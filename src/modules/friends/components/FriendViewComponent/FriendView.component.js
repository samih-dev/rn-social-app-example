import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

import { AppColors } from '../../../../constants/theme';

import { ActionButton } from '../../../../shared/components/buttons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 75,
    paddingLeft: 5,
    borderLeftWidth: 3,
    borderLeftColor: AppColors.mainColor,
    marginTop: 5,
    marginBottom: 5,
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

const FriendView = ({
  id,
  username,
  askedDate,
  isApproved,
  config: { onFriendAccept, onFriendDeny, onFriendAdd, styleOpts },
}) => {
  const isFriendRequestView = !isApproved && onFriendAccept && onFriendDeny;
  const isFriendAddView = !!onFriendAdd;

  return (
    <View style={[styles.container, styleOpts ? styleOpts.container : {}]}>
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
              onPress: () => onFriendAccept(id),
              styleOpts: btnAcceptStyles,
            }}
          ></ActionButton>

          <ActionButton
            config={{
              icon: 'close',
              label: 'Deny',
              onPress: () => onFriendDeny(id),
            }}
          ></ActionButton>
        </View>
      )}
      {/* //isFriendRequestView */}

      {isFriendAddView && (
        <View style={[styles.section, styles.sectionBtns]}>
          <ActionButton
            config={{
              icon: 'add',
              label: 'Add',
              onPress: () => onFriendAdd(id),
            }}
          ></ActionButton>
        </View>
      )}
    </View>
  );
};

FriendView.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  askedDate: PropTypes.instanceOf(Date),
  isApproved: PropTypes.bool.isRequired,
  config: PropTypes.shape({
    onFriendAccept: PropTypes.func,
    onFriendDeny: PropTypes.func,
    onFriendAdd: PropTypes.func,
    styleOpts: PropTypes.object,
  }).isRequired,
};

FriendView.defaultProps = {
  askedDate: undefined,
};

export { FriendView };
