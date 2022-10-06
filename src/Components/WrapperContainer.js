import React from 'react';
import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import Loader from './Loader';
import colors from '../styles/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const WrapperContainer = ({
  children,
  isLoading,
  statusBarColor = colors.white,
  bodyColor = colors.white,
  barStyle = 'dark-content',
  removeTopInset = false,
  removeBottomInset = false,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: statusBarColor,
        paddingTop: removeBottomInset ? 0 : insets.top,
        paddingBottom: removeBottomInset ? 0 : insets.bottom,
      }}>
      <StatusBar backgroundColor={statusBarColor} barStyle={barStyle} />
      <View style={{backgroundColor: bodyColor, flex: 1}}>{children}</View>
      <Loader isLoading={isLoading} />
    </View>
  );
};

export default WrapperContainer;
