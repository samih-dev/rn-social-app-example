import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { PostForm } from '../components';

import { screenMainContentSS } from '../../../constants/theme';

const styles = StyleSheet.create({
  frmContainer: {
    borderBottomWidth: 2,
    borderStyle: 'dashed',
  },
  listContainer: {
    flex: 1,
  },
});

class PostsFeedScreen extends Component {
  render() {
    return (
      <View style={screenMainContentSS.styles}>
        <View style={styles.frmContainer}>
          <PostForm config={{}} />
        </View>

        <View style={styles.listContainer}>
          <FlatList
            data={[{ key: 'a' }, { key: 'b' }]}
            renderItem={({ item }) => <Text>{item.key}</Text>}
          />
        </View>
      </View>
    );
  }
}

export default connect()(PostsFeedScreen);
