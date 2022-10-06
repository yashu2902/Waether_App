import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import imagePath from '../../constants/imagePath';
import commonStyles from '../../styles/commonStyles';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import moment from 'moment';
import WeatherListComp from '../../Components/WeatherListComp';
import navigationStrings from '../../constants/navigationStrings';
import {getItem} from '../../utils/utils';
import axios from 'axios';
import Loader from '../../Components/Loader';
import {arrData} from '../../constants/constants';

const Weather = ({navigation}) => {
  const _renderItem = ({item, index}) => {
    return <WeatherListComp item={item} index={index} />;
  };

  const [getDataAsync, setDataAsync] = useState({});

  const [getStorageData, setStorageData] = useState({});

  const getWeatherApi = (lat, long) => {
    console.log(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=55cd0d84ee0511a043c8496902b1ac20&units=metric&exclude=current,minutely,hourly,alerts`,
    );
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=55cd0d84ee0511a043c8496902b1ac20&units=metric&exclude=current,minutely,hourly,alerts`,
      )
      .then(itm => {
        setLoader(false);
        setDataAsync(itm.data);
      })
      .catch(error => {
        setLoader(false);
        console.log(error, 'sdjhgfsidkbkfjd');
      });
  };

  useEffect(() => {
    const apiCall = navigation.addListener('focus', async () => {
      await getData();
      setLoader(true);
    });
    return apiCall;
  }, [navigation]);

  const getData = async () => {
    const a = await getItem('locationKey');
    console.log(a, 'aaaaaaaaa');

    if (a !== null && a !== undefined) {
      getWeatherApi(a.lat, a.long);
      setStorageData(a);
    } else {
      const newData = {
        lat: '30.210995',
        long: '74.945473',
        city: 'Bathinda',
      };
      setStorageData(newData);
      getWeatherApi(newData.lat, newData.long);
    }
  };

  const onChangeCity = () => {
    navigation.navigate(navigationStrings.CHANGE_CITY);
  };

  const [loader, setLoader] = useState(false);

  return (
    <View style={{flex: 1}}>
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        style={styles.mainView}
        colors={['#0fbed8', '#1bd7bb']}>
        <Text style={styles.typeText}>Current Weather</Text>
        <View style={styles.rowView}>
          <View style={{flex: 0.33, alignItems: 'center'}}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onChangeCity}
              style={styles.rowView}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: fontFamily.bold,
                  color: colors.white,
                  opacity: 0.7,
                }}>
                {getStorageData?.city}
              </Text>
              <Image
                source={imagePath.down}
                style={{...styles.imgStyle, marginLeft: 5}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{...styles.rowView, flex: 0.33, justifyContent: 'center'}}>
            {getDataAsync?.weather && (
              <Text style={styles.tempText}>
                {(getDataAsync?.main?.temp).toFixed(0)} °
              </Text>
            )}
            <View style={{alignItems: 'center', marginLeft: 5}}>
              {getDataAsync?.weather && (
                <Image
                  source={
                    getDataAsync?.weather[0]?.main === 'Clouds'
                      ? imagePath.cloud
                      : getDataAsync?.weather[0]?.main === 'Rainy'
                      ? imagePath.rainy
                      : imagePath.sun
                  }
                  style={{tintColor: 'white', height: 22, width: 22}}
                />
              )}
              {getDataAsync?.weather && (
                <Text style={{...styles.typeText, marginTop: 2}}>
                  {getDataAsync?.weather[0]?.main}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.equalFlex}>
            <View style={styles.calendarView}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.dateText}>
                  {moment(new Date()).format('DD')}
                </Text>
                <View
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 15,
                    backgroundColor: '#7DF9FF',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 5,
                    opacity: 0.7,
                  }}>
                  <Image
                    source={imagePath.calendar}
                    style={{height: 15, width: 15}}
                  />
                </View>
              </View>
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: fontFamily.bold,
                  marginTop: 3,
                  textAlign: 'center',
                }}>
                {moment(new Date()).format('ddd,YYYY')}
              </Text>
            </View>
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            data={arrData}
            renderItem={_renderItem}
          />
        </View>
      </LinearGradient>
      <Loader isLoading={loader} />
    </View>
  );
};

export default Weather;

const styles = StyleSheet.create({
  mainView: {
    paddingHorizontal: 15,
    paddingVertical: 30,
    paddingTop: '15%',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tempText: {
    ...commonStyles.fontBold24,
    color: colors.white,
  },
  typeText: {
    ...commonStyles.fontBold16,
    color: colors.white,
  },
  equalFlex: {
    flex: 0.33,
    alignItems: 'flex-end',
  },
  imgStyle: {
    height: 15,
    width: 15,
    tintColor: colors.white,
  },
  calendarView: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  dateText: {
    fontSize: 15,
    fontFamily: fontFamily.bold,
    color: '#7DF9FF',
  },
});
