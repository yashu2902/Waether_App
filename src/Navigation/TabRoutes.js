import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import colors from '../styles/colors';
import {Image, StyleSheet} from 'react-native';
import {
  moderateScale,
  width,
  moderateScaleVertical,
} from '../styles/responsiveSize';
import imagePath from '../constants/imagePath';
import strings from '../constants/lang';
import navigationStrings from '../constants/navigationStrings';
import Weather from '../Screens/Login/Weather';

const BottomTab = createBottomTabNavigator();

const TabRoutes = props => {
  return (
    <BottomTab.Navigator
      tabBar={tabsProps => (
        <>
          <BottomTabBar {...tabsProps} />
        </>
      )}
      initialRouteName={navigationStrings.WEATHER}
      tabBarOptions={{
        style: styles.customBottomtabsStyle,
        activeTintColor: colors.blackColor,
        inactiveTintColor: 'gray',
        showLabel: false,
      }}>
      <BottomTab.Screen
        name={navigationStrings.WEATHER}
        component={Weather}
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? (
              <Image source={imagePath.firstActiveIcon} />
            ) : (
              <Image source={imagePath.firstInActiveIcon} />
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  customBottomtabsStyle: {
    //height: moderateScale(60)
  },
});

export default TabRoutes;
