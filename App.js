import React, {useEffect} from 'react';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routes from './src/Navigation/Routes';
import Geolocation from 'react-native-geolocation-service';
import {getItem, setItem} from './src/utils/utils';
import Geocoder from 'react-native-geocoder';

const App = () => {
  useEffect(() => {
    checkLocation();
  }, []);

  const askPermission = async () => {
    if (Platform.OS === 'ios') {
      const permissionIos = await Geolocation.requestAuthorization('whenInUse');
      return permissionIos;
    } else {
      const permissionAndroid = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (permissionAndroid === PermissionsAndroid.RESULTS.GRANTED) {
        return 'granted';
      } else {
        return 'not granted';
      }
    }
  };

  const checkLocation = async () => {
    const checkData = await getItem('locationKey');

    if (checkData === null) {
      askPermission()
        .then(itm => {
          Geolocation.getCurrentPosition(async loc => {
            const latitude = loc.coords.latitude;
            const longitude = loc.coords.longitude;

            console.log(latitude, longitude, 'latitudelatitude');

            let res = await Geocoder.geocodePosition({
              lat: latitude,
              lng: longitude,
            });
            let addr = res[0].locality;
            const data = {
              lat: loc.coords.latitude,
              long: loc.coords.longitude,
              city: addr,
            };
            setItem('locationKey', data);
          });
        })
        .catch(error => {
          Alert.alert('Location Permission Denied');
          console.log('error', error);
        });
    } else {
    }
  };

  return (
    <SafeAreaProvider>
      <Routes />
    </SafeAreaProvider>
  );
};

export default App;
