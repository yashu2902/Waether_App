import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import WrapperContainer from '../../Components/WrapperContainer';
import commonStyles from '../../styles/commonStyles';
import colors from '../../styles/colors';
import imagePath from '../../constants/imagePath';
import axios from 'axios';
import fontFamily from '../../styles/fontFamily';
import {moderateScaleVertical} from '../../styles/responsiveSize';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../Components/Loader';
import {setItem} from '../../utils/utils';
import navigationStrings from '../../constants/navigationStrings';

const ChangeCity = () => {
  const navigation = useNavigation();
  const [pageNumber, setPageNumber] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [showData, setShowData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchText.length) {
        setLoader(true);
        setPageNumber(1);
        getCitiesList(1);
      } else {
        setShowData([]);
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const onPressLocation = item => {
    const data = {
      lat: item.coord.lat,
      long: item.coord.lon,
      city: item.name,
    };
    setItem('locationKey', data);
    navigation.navigate(navigationStrings.WEATHER);
  };

  const getCitiesList = page => {
    axios
      .get(
        `http://52.73.146.184:3000/api/app/user/get-city-list?page=${page}&search=${searchText}`,
      )
      .then(itm => {
        setLoader(false);
        if (page === 1) {
          setShowData(itm.data?.data?.Record);
        } else {
          setShowData(prev => [...prev, ...itm.data?.data?.Record]);
        }
      })
      .catch(error => {
        setLoader(false);
        console.log(error, 'eroorr');
      });
  };

  const onEndReached = () => {
    getCitiesList(pageNumber + 1);
    setPageNumber(prev => prev + 1);
  };

  return (
    <WrapperContainer>
      <View style={styles.headView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={imagePath.back} style={{height: 20, width: 20}} />
        </TouchableOpacity>
        <Text style={styles.mainText}>Change City</Text>
      </View>

      <TextInput
        onChangeText={txt => setSearchText(txt)}
        style={styles.inputView}
        placeholder={'Search here'}
      />
      <View style={{flex: 1, marginTop: 20, marginHorizontal: 20}}>
        <FlatList
          onEndReached={onEndReached}
          showsVerticalScrollIndicator={false}
          data={showData}
          renderItem={({item, index}) => {
            console.log(item, 'itemitemitemitemitem');
            return (
              <View style={styles.listView}>
                <TouchableOpacity onPress={() => onPressLocation(item)}>
                  <Text style={styles.listText}>{item.name}</Text>
                  <Text style={{...styles.listText, marginTop: 5}}>
                    {item.country}
                  </Text>
                </TouchableOpacity>
                <View style={styles.horizontalView} />
              </View>
            );
          }}
        />
      </View>
      <Loader isLoading={loader} />
    </WrapperContainer>
  );
};

export default ChangeCity;

const styles = StyleSheet.create({
  mainView: {},
  headView: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  mainText: {
    ...commonStyles.fontBold16,
    color: colors.black,
    marginLeft: 20,
  },
  inputView: {
    ...commonStyles.shadowStyle,
    marginVertical: 20,
    borderWidth: 2,
    borderColor: '#0fbed8',
    marginHorizontal: 20,
    paddingHorizontal: 10,
    height: 45,
    borderRadius: 10,
    fontSize: 15,
    fontFamily: fontFamily.medium,
    color: colors.black,
  },
  horizontalView: {
    height: 1,
    backgroundColor: '#D3D3D3',
    marginVertical: moderateScaleVertical(15),
  },
  listText: {
    fontSize: 15,
    fontFamily: fontFamily.medium,
    color: colors.black,
  },
});
