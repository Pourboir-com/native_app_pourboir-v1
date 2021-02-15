import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Platform,
  Keyboard,
} from 'react-native';
import { Overlay } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../constants/Theme';
import { useMutation } from 'react-query';
import { ADDING_WAITERS } from '../../queries';
import i18n from '../../li8n';
import Context from '../../contextApi/context';
const imgSitting = require('../../assets/images/sittingtable.png');
const imgBg = require('../../assets/images/Group7.png');
import { filteredRestaurant, yourFilteredRestaurant } from '../../util';
import * as actionTypes from '../../contextApi/actionTypes';

const HelpUsImproveModal = ({
  isVisible,
  handleModalClose,
  place_id,
  refetchWaiters,
  navigation,
  loading,
  handleLoading,
}) => {
  // const [loading, setLoading] = useState(false);
  const [addingWaiters] = useMutation(ADDING_WAITERS);
  const scrollRef = React.useRef(null);
  const [onHandleFocus, setonHandleFocus] = useState(false);
  const [waiterName, setWaiterName] = useState('');
  const textRef = React.useRef(null);
  const { state, dispatch } = useContext(Context);

  const [placeholder, setPlaceholder] = React.useState(
    i18n.t('name_of_your_server'),
  );

  const updateRestaurants = (state, placeId) => {
    let FilteredRestaurant = filteredRestaurant(state, placeId);
    dispatch({
      type: actionTypes.RESTAURANTS_DETAILS,
      payload: FilteredRestaurant,
    });
    let YourFilteredRestaurant = yourFilteredRestaurant(state, placeId);
    dispatch({
      type: actionTypes.YOUR_RESTAURANTS,
      payload: YourFilteredRestaurant,
    });
  };

  // React.useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     'keyboardDidShow',
  //     () => {
  //       setTimeout(() => {
  //         scrollRef.current.scrollToEnd({ animated: true });
  //       }, 100);
  //     },
  //   );
  //   return () => {
  //     keyboardDidShowListener.remove();
  //   };
  // }, []);

  const handleAddingWaiters = async () => {
    if (state.userDetails.user_id) {
      handleLoading(true);
      let waiter = {
        restaurant_id: place_id,
        full_name: waiterName,
        created_by: state.userDetails.user_id,
      };
      if (waiterName) {
        await addingWaiters(waiter, {
          onSuccess: async () => {
            await refetchWaiters();
            updateRestaurants(state, place_id);
            handleModalClose();
            handleLoading(false);
            setWaiterName('');
          },
        });
      }
    } else {
      handleModalClose();
      navigation.navigate('socialLogin', { HelpUs: true });
    }
  };

  return (
    <Overlay
      overlayStyle={[
        styles.container,
        onHandleFocus && Platform.OS === 'ios' ? { flex: 1 } : {},
        Platform.OS === 'ios'
          ? onHandleFocus
            ? { marginBottom: Dimensions.get('window').height * 0.4 }
            : null
          : null,
      ]}
      isVisible={isVisible}
      onBackdropPress={handleModalClose}
    >
      <ScrollView
        ref={scrollRef}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        keyboardShouldPersistTaps={'handled'}
        style={onHandleFocus && Platform.OS === 'ios' ? { flex: 1 } : {}}
      >
        <KeyboardAvoidingView
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}
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
                source={imgSitting}
                style={styles.imgStyle}
                resizeMode="contain"
              />
            </View>
          </ImageBackground>
          <Text style={[styles.txtName, { fontFamily: 'ProximaNovaBold' }]}>
            {i18n.t('help_us_improve')}
          </Text>
          <Text style={[styles.txtConfrm, { fontFamily: 'ProximaNova' }]}>
            {i18n.t('will_contact_shortly')}
          </Text>
          <TextInput
            ref={textRef}
            selectionColor={Colors.yellow}
            placeholder={placeholder}
            placeholderTextColor="rgba(0,0,0,0.3)"
            value={waiterName}
            onChangeText={e => {
              scrollRef.current.scrollToEnd({ animated: true });
              setWaiterName(e);
            }}
            style={[
              styles.inputStyle,
              {
                fontFamily: 'ProximaNova',
                fontWeight: 'bold',
                textAlign: 'center',
              },
            ]}
            onFocus={() => {
              setonHandleFocus(true);
              setTimeout(() => {
                scrollRef.current.scrollToEnd({ animated: true });
              }, 100);
            }}
            onBlur={() => {
              setonHandleFocus(false);
            }}
          />
          <TouchableOpacity
            disabled={loading ? true : !waiterName ? true : false}
            onPress={handleAddingWaiters}
            style={[
              styles.btnConfrm,
              waiterName !== '' ? { backgroundColor: Colors.yellow } : null,
            ]}
          >
            {loading ? (
              <ActivityIndicator size={30} color="#000" />
            ) : (
              <Text
                style={[styles.txtBtnConfrm, { fontFamily: 'ProximaNova' }]}
              >
                {i18n.t('add')}{' '}
              </Text>
            )}
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </Overlay>
  );
};

export default HelpUsImproveModal;

const styles = StyleSheet.create({
  container: {
    width: '88%',
    padding: 0,
    overflow: 'hidden',
    borderRadius: 15,
  },
  imgBgStyle: {
    width: '100%',
    height: 240,
  },
  inputStyle: {
    width: '85%',
    height: 50,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    marginVertical: 15,
    fontSize: 16,
    textAlign: 'center',
  },
  txtBtnConfrm: {
    fontSize: 16,
    color: Colors.fontDark,
  },
  btnConfrm: {
    // backgroundColor: Colors.fontLight,
    backgroundColor: '#EAEAEA',
    borderRadius: 10,
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    height: 45,
  },
  txtConfrm: {
    fontSize: 16,
    color: Colors.fontLight,
    marginTop: 10,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  txtName: {
    fontSize: 16,
    color: Colors.fontDark,
    marginTop: 10,
    textAlign: 'center',
    marginHorizontal: 20,
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
