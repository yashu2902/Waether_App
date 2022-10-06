import {View, Text, Image, Dimensions} from 'react-native';
import React from 'react';
import imagePath from '../constants/imagePath';
import commonStyles from '../styles/commonStyles';
import colors from '../styles/colors';

const WeatherListComp = ({item, index}) => {
  return (
    <View style={{width: 50, marginHorizontal: 2, alignItems: 'center'}}>
      <Image
        source={
          item.weather[0]?.main === 'Rain' ? imagePath.rainy : imagePath.sun
        }
        style={{height: 25, width: 25, tintColor: 'white'}}
      />
      <Text
        style={{
          ...commonStyles.fontBold16,
          color: colors.white,
          marginTop: 10,
        }}>
        {item.weather[0]?.main}
      </Text>
    </View>
  );
};

export default WeatherListComp;
