import React from 'react';
import navigationStrings from '../constants/navigationStrings';
import ChangeCity from '../Screens/ChangeCity/ChangeCity';

import Weather from '../Screens/Login/Weather';

export default function (Stack) {
  return (
    <>
      <Stack.Screen
        name={navigationStrings.WEATHER}
        component={Weather}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.CHANGE_CITY}
        component={ChangeCity}
        options={{headerShown: false}}
      />
    </>
  );
}
