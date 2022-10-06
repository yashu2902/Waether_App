import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { moderateScale } from '../styles/responsiveSize';
import colors from '../styles/colors';

const RoundImg = ({
    circularImgStyle = {},
    circularImg = {},

}) => {
    return (
        <Image
            style={{ ...styles.img, ...circularImgStyle }}
            source={{ uri: circularImg }}
        />
    )
};

const styles = StyleSheet.create({

    img: {
        width: moderateScale(76),
        height: moderateScale(76),
        borderRadius: moderateScale(76 / 2),
        borderWidth: moderateScale(2),
        borderColor: colors.whiteOpacity50

    }
});

export default RoundImg;