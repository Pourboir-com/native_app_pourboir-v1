import React, { useEffect, useState } from 'react';
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
import { useMutation } from 'react-query';
import { Colors } from '../../constants/Theme';
const imgWaiter = require('../../assets/images/delete-dish.png');
const imgBg = require('../../assets/images/Group7.png');
import i18n from '../../li8n';
import { DELETE_DISH } from '../../queries';

const DeleteDishModal = ({
  deleteDishModal,
  setDeleteDishModal,
  dishId,
  refetchMenus,
  menuId,
  deleteType,
  deleteMenu,
}) => {
  const [deleteDish, { isLoading: deleteDishLoading }] = useMutation(
    DELETE_DISH,
  );
  const handleClose = () => {
    setDeleteDishModal(false);
  };
  console.log(menuId, 'menuId');
  console.log(deleteType);
  console.log(dishId, ' dishId');
  console.log(menuId, 'menuId');

  const DeleteDish = async () => {
    //  if(id.charAt(0) == 'y'){
    //   setDishes(  d.filter((v) => {
    //     return v.idDish !== id
    //   }))

    //  }else{
    await deleteDish(
      {
        dish_id: dishId || '',
        menu_id: menuId || '',
      },
      {
        onSuccess: () => {
          refetchMenus();
          alert('Dish deleted successfully');
          setDeleteDishModal(false);
        },
        onError: e => {
          alert('Error ');
          console.log(e);
        },
      },
    );
  };
  // };
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
      <View style={{ marginTop: 100 }}>
        <View>
          <Text style={[styles.txtConfrm, { fontFamily: 'ProximaNovaBold' }]}>
            {i18n.t('are_u_sure')}
          </Text>
          <Text style={[styles.txtName, { fontFamily: 'ProximaNova' }]}>
            {/* {i18n.t('will_contact_by_email')} */}
            {deleteType === 'menu'
              ? i18n.t('delete_menu')
              : i18n.t('delete_dish')}
          </Text>
        </View>
        <View
          style={{
            marginVertical: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity onPress={handleClose} style={styles.btns}>
            <Text style={{ fontFamily: 'ProximaNova', fontSize: 16 }}>
              {i18n.t('no')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              deleteType === 'menu' ? deleteMenu(menuId) : DeleteDish(dishId)
            }
            style={
              (styles.btns, { ...styles.btns, backgroundColor: '#FCDF6F' })
            }
          >
            <Text style={{ fontFamily: 'ProximaNova', fontSize: 16 }}>
              {i18n.t('yes')}
            </Text>
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
  },
  btns: {
    backgroundColor: '#EAEAEA',
    width: 130,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
  },
});
