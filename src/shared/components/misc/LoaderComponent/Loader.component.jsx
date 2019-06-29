import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { AppColors } from '../../../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Loader = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={AppColors.blue} />
  </View>
);

export { Loader };
