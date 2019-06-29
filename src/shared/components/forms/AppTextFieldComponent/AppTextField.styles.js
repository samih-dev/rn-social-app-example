import { StyleSheet } from 'react-native';

import { AppColors } from '../../../../constants/theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  label: {
    flex: 0,
    backgroundColor: AppColors.mainColor,
    color: AppColors.white,
    padding: 8,
    borderRadius: 5,
    width: '40%',
  },
  ipt: {
    flex: 1,
    marginLeft: 3,
  },
});
