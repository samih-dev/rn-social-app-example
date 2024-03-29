import { StyleSheet } from 'react-native';
import { AppColors } from './appColors';

const AppStyle = {
  headerIconSize: 25,
  headerStyles: {
    backgroundColor: AppColors.headerColor,
    height: 50,
  },
  headerTextStyle: {
    color: AppColors.headerTextColor,
    fontSize: 18,
  },

  screenContent: {
    padding: 8,
    flex: 1,
  },
  // #region general actions
  ActionEdit: {
    container: {
      backgroundColor: AppColors.Orange,
    },
    text: {
      color: AppColors.White,
    },
  },

  ActionCall: {
    container: {
      backgroundColor: AppColors.Blue,
    },
    text: {
      color: AppColors.White,
    },
  },

  ActionScreenLink: {
    text: {
      color: AppColors.screenLinkColor,
    },
    icon: {
      color: AppColors.screenLinkColor,
    },
  },
  // #region general actions
}; // AppStyle

const screenMainContentSS = StyleSheet.create({
  styles: AppStyle.screenContent,
});

const headerSS = StyleSheet.create({
  rightIconContainer: {
    marginRight: 8,
  },
});

export { AppStyle, screenMainContentSS, headerSS };
