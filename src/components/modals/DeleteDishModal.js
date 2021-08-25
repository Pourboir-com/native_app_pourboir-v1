import React from 'react';
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
const imgWaiter = require('../../assets/images/delete-dish.png');
const imgBg = require('../../assets/images/Group7.png');
import i18n from '../../li8n';
import NumberFormat from 'react-number-format';

const DeleteDishModal = ({ deleteDishModal ,setDeleteDishModal }) => {
  function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
  console.log(deleteDishModal)
  const handleClose = () => {
      setDeleteDishModal(false)
  }
  console.log(deleteDishModal, " modal")
  return (
    <Overlay
      overlayStyle={styles.container}
      isVisible={deleteDishModal}
      onBackdropPress={handleClose}
    >
      <ImageBackground
        style={styles.imgBgStyle}
        source={imgBg}
        resizeMode="stretch"
      >
        <View style={styles.viewImg}>
          <TouchableOpacity
            onPress={() => setDeleteDishModal(false)}
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
            <View style={{marginTop:100}}>
                
            <View>
            <Text style={[styles.txtConfrm, { fontFamily: 'ProximaNovaBold' }]}>
        {/* {i18n.t('thanks_for_vote')} */}
        Are you sure?
      </Text>
      <Text style={[styles.txtName, { fontFamily: 'ProximaNova' }]}>
        {/* {i18n.t('will_contact_by_email')} */}
        You are about to delete this dish/category. 
      </Text>
            </View>
            <View style={{marginVertical:20, flexDirection:'row', justifyContent:'space-between'}}>
                <TouchableOpacity style={styles.btns}>
                    <Text style={{fontFamily:'ProximaNova'}}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btns,  {...styles.btns, backgroundColor:'#FCDF6F'}}>
                    <Text style={{fontFamily:'ProximaNova'}}>Yes</Text>
                </TouchableOpacity>
            </View>
            </View>
    </Overlay>
  );
};

export default DeleteDishModal;

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
    height: 160,
    // overflow:"hidden"
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
    height: 210,
    alignSelf: 'center',
    marginTop: -69,
    marginRight: 0,
  },
  viewImg: {
    width: '100%',
    height: 240,
    // backgroundColor:"red"
  },
 btns: {
    backgroundColor:'#EAEAEA',
    width:130,
    borderRadius:12,
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:17,
 }
});
