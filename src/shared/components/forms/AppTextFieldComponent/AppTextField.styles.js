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
    backgroundColor: AppColors.Red,
    color: AppColors.White,
    padding: 8,
  },
  ipt: {
    margin: 3,
    flex: 1,
  },
});
