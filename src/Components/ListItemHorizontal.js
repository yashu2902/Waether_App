import React, {Component} from 'react';
import {View, Text} from 'react-native';
import commonStyles from '../styles/commonStyles';
import colors from '../styles/colors';

export default ({label, value,onPressRight=()=>{},lblStyle={},valStyle={},marginBottom=6}) => {
  return (
    <View style={{flexDirection: 'row',marginBottom,justifyContent:'space-between'}}>
      <Text style={{...commonStyles.fontSize14, paddingVertical:2, flex: 1,...lblStyle}}>{label}</Text>
      <Text
        onPress={onPressRight}
        style={{...commonStyles.fontSize14,paddingVertical:2, color: colors.orange,...valStyle}}>
        {value}
      </Text>
    </View>
  );
};
