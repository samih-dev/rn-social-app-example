import React from 'react';
import { View, TouchableWithoutFeedback, Platform } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';

import { AppColors, headerSS } from '../../constants/theme';

import {
  POSTS_FEED_SCREEN,
  FRIENDS_SCREEN,
  FRIENDS_SEARCH_SCREEN,
  PROFILE_SCREEN,
  LOGIN_SCREEN,
} from '../../constants/screenNames';

import { PostsFeedScreen } from '../../modules/posts';
import { FriendsListScreen, FriendsSearchScreen } from '../../modules/friends';
import { ProfileScreen } from '../../modules/user';

const iconSize = 24;

const getTabNavigationOption = ({ label, iconName: icon }) => {
  return {
    tabBarLabel: label,
    // eslint-disable-next-line react/prop-types
    tabBarIcon: ({ tintColor }) => <Icon name={icon} color={tintColor} size={iconSize} />,
  };
};

const getScreenStackNavKey = screenKey => `${screenKey}_STACK_NAV`;

const getStackNavForScreen = (screenKey, screenComponent, additonalScreensConfigList = {}) => {
  return createStackNavigator({
    [`${getScreenStackNavKey(screenKey)}`]: {
      screen: screenComponent,
      navigationOptions: {
        header: null,
      },
    },
    ...additonalScreensConfigList,
  });
};

const screenTitles = {
  postsFeed: 'Feed',
  friends: 'Friends',
  profile: 'Profile',
  friendsSearch: 'Search Friends',
};

const PostFeedStackNav = getStackNavForScreen(POSTS_FEED_SCREEN, PostsFeedScreen);

const FriendsStackNav = getStackNavForScreen(FRIENDS_SCREEN, FriendsListScreen, {
  [FRIENDS_SEARCH_SCREEN]: {
    screen: FriendsSearchScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const ProfileStackNav = getStackNavForScreen(PROFILE_SCREEN, ProfileScreen);

// TABS
const tabsMainNavigator = createBottomTabNavigator(
  {
    [POSTS_FEED_SCREEN]: {
      screen: PostFeedStackNav,
      navigationOptions: getTabNavigationOption({
        label: screenTitles.postsFeed,
        iconName: 'view-day',
      }),
    },
    [FRIENDS_SCREEN]: {
      screen: FriendsStackNav,
      navigationOptions: getTabNavigationOption({ label: screenTitles.friends, iconName: 'group' }),
    },
    [PROFILE_SCREEN]: {
      screen: ProfileStackNav,
      navigationOptions: getTabNavigationOption({
        label: screenTitles.profile,
        iconName: 'person',
      }),
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
            headerRight: (
              <View style={headerSS.rightIconContainer}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate(LOGIN_SCREEN)}>
                  <Ionicon
                    name={Platform.OS === 'ios' ? 'ios-log-out' : 'md-log-out'}
                    color={AppColors.headerIconColor}
                    size={30}
                  />
                </TouchableWithoutFeedback>
              </View>
            ),
          };
          break;
        case `${getScreenStackNavKey(FRIENDS_SCREEN)}`:
          screenNavOptions = {
            title: screenTitles.friends,
            headerRight: (
              <View style={{ marginRight: 8 }}>
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate(FRIENDS_SEARCH_SCREEN)}
                >
                  <Ionicon
                    name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
                    color={AppColors.headerIconColor}
                    size={30}
                  />
                </TouchableWithoutFeedback>
              </View>
            ),
          };
          break;
        case FRIENDS_SEARCH_SCREEN:
          screenNavOptions = {
            title: screenTitles.friendsSearch,
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
