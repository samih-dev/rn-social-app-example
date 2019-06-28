import { AppColors } from './appColors';

const AppStyle = {
  HeaderIconSize: 25,
  HeaderStyles: {
    backgroundColor: AppColors.HeaderColor,
    height: 50,
  },
  HeaderTextStyle: {
    color: AppColors.HeaderTextColor,
    fontSize: 18,
  },

  ScreenContentTopPadding: 5,
  ScreenContentLeftPadding: 5,

  ScreenBottomActions: {
    text: {
      color: AppColors.White,
    },
  },

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
      color: AppColors.ScreenLinkColor,
    },
    icon: {
      color: AppColors.ScreenLinkColor,
    },
  },
};

export { AppStyle };
