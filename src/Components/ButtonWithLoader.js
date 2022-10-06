import React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import commonStyles from '../styles/commonStyles';
import {moderateScaleVertical} from '../styles/responsiveSize';
import colors from '../styles/colors';
const ButtonWithLoader = ({
  onPress = () => {},
  btnText = '',
  btnTextStyle = {},
  btnStyle = {},
  isLoading = false,
  color = colors.white,
  marginHorizontal = 0,
  marginBottom = 0,
  borderRadius = 8,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...commonStyles.buttonRect,
        marginHorizontal,
        borderRadius,
        marginBottom,
        marginTop: moderateScaleVertical(16),
        ...btnStyle,
      }}
      onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator size="small" color={color} />
      ) : (
        <Text style={{...commonStyles.buttonTextWhite, color, ...btnTextStyle}}>
          {btnText}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default ButtonWithLoader;
