import { createStackNavigator } from 'react-navigation';

// #region screens
import LoginScreen from '../../modules/auth/LoginScreen/Login.screen';
// #endregion screens

import { LOGIN_SCREEN } from '../../constants/screenNames';

export default createStackNavigator(
  {
    [LOGIN_SCREEN]: LoginScreen,
  },
  {
    // options
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: LOGIN_SCREEN,
  }
);
