import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import InitLoadingScreen from '../../modules/InitLoadingScreen/InitLoading.screen';

import MainTabNavigatorComponent from './MainTabNavigator.component';

import AuthStackNavigatorComponent from './AuthNavigator.component';

import { INIT_LOADING_SCREEN, AUTH, MAIN_TABS } from '../../constants/screenNames';

export default createAppContainer(
  createSwitchNavigator(
    {
      [INIT_LOADING_SCREEN]: InitLoadingScreen,
      [AUTH]: AuthStackNavigatorComponent,
      [MAIN_TABS]: MainTabNavigatorComponent,
    },
    {
      // options
      initialRouteName: InitLoadingScreen,
      // mode: 'modal',
      // headerMode: 'none',
    }
  )
);
