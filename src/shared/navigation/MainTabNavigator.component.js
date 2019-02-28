import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { AppColors } from '../../constants/theme';

import { POST_FEED_SCREEN } from '../../constants/screenNames';

import PostsFeedScreen from '../../modules/posts/PostsFeedScreen/PostsFeed.screen';

const iconSize = 24;

export default createMaterialTopTabNavigator(
  {
    [POST_FEED_SCREEN]: {
      screen: PostsFeedScreen,
      navigationOptions: {
        tabBarLabel: 'Home',
        // eslint-disable-next-line react/prop-types
        tabBarIcon: ({ tintColor }) => <Icon name="list_alt" color={tintColor} size={iconSize} />,
      },
    },
  },
  {
    initialRouteName: POST_FEED_SCREEN,
    defaultNavigationOptions: {},
    tabBarOptions: {
      activeTintColor: AppColors.Blue,
      inactiveTintColor: AppColors.Black,
      showLabel: false,
    },
  }
);
