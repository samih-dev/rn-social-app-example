import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

import { Card } from '../../../../shared/components/layout';

const styles = StyleSheet.create({
  container: {},
  details: {
    flexDirection: 'row',
    flex: 1,
  },
});

const PostView = ({ username, dateCreated, body }) => {
  return (
    <Card>
      <View style={styles.details}>
        <Text>{username}</Text>
      </View>
      <View style={styles.details}>
        <Text>{moment(dateCreated).format('LLLL')}</Text>
      </View>
      <View style={styles.details}>
        <Text numberOfLines={1}>{body}</Text>
      </View>
    </Card>
  );
};

PostView.propTypes = {
  username: PropTypes.string.isRequired,
  dateCreated: PropTypes.instanceOf(Date).isRequired,
  body: PropTypes.string.isRequired,
};

export { PostView };
