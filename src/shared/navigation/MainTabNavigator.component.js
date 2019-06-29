import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { AppColors } from '../../constants/theme';

import { POSTS_FEED_SCREEN, FRIENDS_SCREEN, PROFILE_SCREEN } from '../../constants/screenNames';

import { PostsFeedScreen } from '../../modules/posts';
import { FriendsListScreen } from '../../modules/friends';
import { ProfileScreen } from '../../modules/user';

const iconSize = 24;

const getNavigationOption = ({ label, iconName: icon }) => {
  return {
    tabBarLabel: label,
    // eslint-disable-next-line react/prop-types
    tabBarIcon: ({ tintColor }) => <Icon name={icon} color={tintColor} size={iconSize} />,
  };
};

const getScreenStackNavKey = screenKey => `${screenKey}_STACK_NAV`;

const getStackNavForScreen = (screenKey, screenComponent) => {
  return createStackNavigator({
    [`${getScreenStackNavKey(screenKey)}`]: {
      screen: screenComponent,
      navigationOptions: {
        header: null,
      },
    },
  });
};

const screenTitles = {
  postsFeed: 'Feed',
  friends: 'Friends',
  profile: 'Profile',
};

const PostFeedStackNav = getStackNavForScreen(POSTS_FEED_SCREEN, PostsFeedScreen);
const FriendsStackNav = getStackNavForScreen(FRIENDS_SCREEN, FriendsListScreen);
const ProfileStackNav = getStackNavForScreen(PROFILE_SCREEN, ProfileScreen);

const tabsMainNavigator = createBottomTabNavigator(
  {
    [POSTS_FEED_SCREEN]: {
      screen: PostFeedStackNav,
      navigationOptions: getNavigationOption({
        label: screenTitles.postsFeed,
        iconName: 'view-day',
      }),
    },
    [FRIENDS_SCREEN]: {
      screen: FriendsStackNav,
      navigationOptions: getNavigationOption({ label: screenTitles.friends, iconName: 'group' }),
    },
    [PROFILE_SCREEN]: {
      screen: ProfileStackNav,
      navigationOptions: getNavigationOption({ label: screenTitles.profile, iconName: 'person' }),
    },
  },
  {
    initialRouteName: POSTS_FEED_SCREEN,
    defaultNavigationOptions: {},
    tabBarOptions: {
      activeTintColor: AppColors.Blue,
      inactiveTintColor: AppColors.Black,
      style: {
        backgroundColor: AppColors.lightWhite,
      },
      // showLabel: false,
    },
  }
);

const mainStackNavDefaultOptions = {
  headerStyle: {
    backgroundColor: AppColors.headerColor,
  },
  headerTintColor: AppColors.White,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

export default createStackNavigator({
  tabs: {
    screen: tabsMainNavigator,
    navigationOptions: ({ navigation }) => {
      const activeScreenNavName =
        navigation.state.routes[navigation.state.index].routes[
          navigation.state.routes[navigation.state.index].index
        ].routeName;

      let screenNavOptions = {
        title: '',
      };

      switch (activeScreenNavName) {
        case `${getScreenStackNavKey(POSTS_FEED_SCREEN)}`:
          screenNavOptions = {
            title: screenTitles.postsFeed,
          };
          break;
        case `${getScreenStackNavKey(FRIENDS_SCREEN)}`:
          screenNavOptions = {
            title: screenTitles.friends,
          };
          break;
        case `${getScreenStackNavKey(PROFILE_SCREEN)}`:
          screenNavOptions = {
            title: screenTitles.profile,
          };
          break;
        default:
          screenNavOptions = {
            title:
              navigation.state.routes[navigation.state.index].routes[
                navigation.state.routes[navigation.state.index].index
              ].routeName,
          };
      }

      // merge nav options with default ones, overridng what needed per screen
      return { ...mainStackNavDefaultOptions, ...screenNavOptions };
    },
  },
});
