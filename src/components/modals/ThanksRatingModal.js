import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { Overlay } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../constants/Theme';
const imgWaiter = require('../../assets/images/ThanksGiving.png');
const imgBg = require('../../assets/images/Group7.png');
import Context from '../../contextApi/context';
import { GET_ACCOUNTS } from '../../queries';
import { useQuery } from 'react-query';
import { reactQueryConfig } from '../../constants';

const ThanksRatingModal = ({
  isVisible,
  handleModalClose,
  checkBalance,
  heading,
  subText,
  navigation,
  setModalClose,
  balanceType,
}) => {
  const { localizationContext } = useContext(Context);
  const { data: accountsData } = useQuery(['GET_ACCOUNTS'], GET_ACCOUNTS, {
    ...reactQueryConfig,
    enabled: balanceType ? true : false,
    onError: e => {
      alert(e?.response?.data?.message);
    },
  });

  return (
    <Overlay
      overlayStyle={styles.container}
      isVisible={isVisible}
      onBackdropPress={setModalClose || handleModalClose}
    >
      <ImageBackground
        style={styles.imgBgStyle}
        source={imgBg}
        resizeMode="stretch"
      >
        <View style={styles.viewImg}>
          <TouchableOpacity
            onPress={setModalClose || handleModalClose}
            style={{ alignSelf: 'flex-end', margin: 10 }}
          >
            <AntDesign name="close" size={29} color="#485460" />
          </TouchableOpacity>
          <View
            style={{
              width: 140,
              height: 140,
              borderRadius: 100,
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              alignSelf: 'center',
              marginBottom: -70,
              bottom: -20,
            }}
          />
          <Image
            source={imgWaiter}
            style={styles.imgStyle}
            resizeMode="cover"
          />
        </View>
      </ImageBackground>

      <Text style={[styles.txtConfrm, { fontFamily: 'ProximaNovaBold' }]}>
        {heading
          ? localizationContext.t(heading)
          : localizationContext.t('thank_review')}
      </Text>
      <Text style={[styles.txtName, { fontFamily: 'ProximaNova' }]}>
        {subText
          ? localizationContext.t(subText)
          : `${localizationContext.t('balance_credited')} ${
              accountsData?.data[balanceType]
            } ${localizationContext.t('balance_credited_2')}`}
      </Text>
      {checkBalance && (
        <TouchableOpacity
          style={{ width: '80%' }}
          activeOpacity={0.7}
          onPress={() => {
            navigation.replace('Balance');
          }}
        >
          <Text style={styles.lottery}>
            {localizationContext.t('navigate_balance')}
          </Text>
        </TouchableOpacity>
      )}
    </Overlay>
  );
};

export default ThanksRatingModal;

const styles = StyleSheet.create({
  container: {
    width: '88%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    overflow: 'hidden',
    borderRadius: 15,
  },
  imgBgStyle: {
    width: '100%',
    height: 240,
  },
  txtBtnConfrm: {
    fontSize: 16,
    color: Colors.fontDark,
  },
  btnConfrm: {
    backgroundColor: Colors.yellow,
    borderRadius: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
    height: 45,
  },
  txtConfrm: {
    fontSize: 24,
    color: Colors.fontDark,
    marginTop: 20,
    textAlign: 'center',
  },
  txtName: {
    fontSize: 16,
    color: Colors.fontLight,
    marginTop: 12,
    width: 270,
    textAlign: 'center',
    marginBottom: 20,
  },
  imgStyle: {
    width: 210,
    height: 200,
    alignSelf: 'center',
    marginTop: -109,
    marginRight: -20,
  },
  viewImg: {
    width: '100%',
    height: 240,
  },
  lottery: {
    backgroundColor: '#fcf4e4',
    borderRadius: 10,
    overflow: 'hidden',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    marginBottom: 20,
    color: '#e6c33d',
    fontWeight: 'bold',
  },
});
