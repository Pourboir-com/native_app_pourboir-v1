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
import { I_AM_WAITER } from '../../queries';
import { useMutation } from 'react-query';
import i18n from '../../li8n';
import Context from '../../contextApi/context';
const imgWaiter = require('../../assets/images/waiter2.png');
const imgBg = require('../../assets/images/Group7.png');

const ConfirmationModal = ({
  isVisible,
  handleModalClose,
  name,
  place_id,
  navigation,
  refetchWaiters,
  refetchRestaurant,
}) => {
  const { state } = useContext(Context);
  const [IAMWAITER] = useMutation(I_AM_WAITER);

  const handleIAMWAITER = async () => {
    if (state.userDetails.user_id) {
      let IWaiter = {
        user_id: state.userDetails.user_id,
        restaurant_id: place_id,
      };
      await IAMWAITER(IWaiter, {
        onSuccess: async () => {
          handleModalClose();
          await refetchWaiters();
          await refetchRestaurant();
        },
      });
    }
    // else {
    //   navigation.navigate('socialLogin');
    // }
  };

  return (
    <Overlay
      overlayStyle={styles.container}
      isVisible={isVisible}
      onBackdropPress={handleModalClose}
    >
      <ImageBackground
        style={styles.imgBgStyle}
        source={imgBg}
        resizeMode="stretch"
      >
        <View style={styles.viewImg}>
          <TouchableOpacity
            onPress={handleModalClose}
            style={{ alignSelf: 'flex-end', margin: 10 }}
          >
            <AntDesign name="close" size={29} color="#485460" />
          </TouchableOpacity>
          <Image
            source={imgWaiter}
            style={styles.imgStyle}
            resizeMode="contain"
          />
        </View>
      </ImageBackground>
      <Text style={[styles.txtConfrm, { fontFamily: 'ProximaNova' }]}>
        {i18n.t('confrm_you_are_server')}
      </Text>
      <Text
        ellipsizeMode="tail"
        numberOfLines={1}
        style={[styles.txtName, { fontFamily: 'ProximaNovaBold' }]}
      >
        {name}
      </Text>
      <TouchableOpacity onPress={handleIAMWAITER} style={styles.btnConfrm}>
        <Text style={[styles.txtBtnConfrm, { fontFamily: 'ProximaNova' }]}>
          {i18n.t('i_confirm')}
        </Text>
      </TouchableOpacity>
    </Overlay>
  );
};

export default ConfirmationModal;

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
    fontSize: 16,
    color: Colors.fontLight,
    marginTop: 20,
    width: 180,
    textAlign: 'center',
  },
  txtName: {
    fontSize: 24,
    color: Colors.fontDark,
    marginTop: 10,
    textAlign: 'center',
    maxWidth: '80%',
  },
  imgStyle: {
    width: 220,
    height: 200,
    alignSelf: 'center',
    marginTop: -30,
    marginRight: -20,
  },
  viewImg: {
    width: '100%',
    height: 240,
  },
});
