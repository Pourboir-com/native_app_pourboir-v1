import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';
import { Overlay } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../constants/Theme';
const imgWaiter = require('../../assets/images/job-hunt.png');
const imgBg = require('../../assets/images/Group7.png');
import i18n from '../../li8n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { SEARCH_RESTAURANTS } from '../../queries';
import { useMutation } from 'react-query';
import stylesTextbox from '../../screens/find-job/styles';
import Context from '../../contextApi/context';
import {
  validateCurrentPositions,
  validateSelectedPositions,
} from '../../util';

const CurrentPositionModal = ({
  setCurrentModal,
  currentModal,
  currentData,
  setCurrentData,
  setCurrentPositionsData,
  currentPositionsData,
}) => {
  const [modeS, setModeS] = useState('date');
  const [showS, setShowS] = useState(false);
  const [start, setStart] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  //search textbox
  const [showDropdown, setShowDropdown] = useState(false);
  const [restaurants, setRestaurants] = useState();
  const [searchLoading, setSearchLoading] = useState(false);
  const [restaurant, setRestaurant] = useState('');
  const [searchRestaurant] = useMutation(SEARCH_RESTAURANTS);
  const { state } = useContext(Context);

  const handleSearchRestaurant = async () => {
    if (restaurant?.name) {
      setSearchLoading(true);
      setShowDropdown(true);
      await searchRestaurant(
        { search: restaurant?.name },
        {
          onSuccess: res => {
            setSearchLoading(false);
            setRestaurants(res);
          },
          onError: () => {
            setSearchLoading(false);
          },
        },
      );
    }
  };

  const AddData = () => {
    let validateRestaurant = validateCurrentPositions(
      currentPositionsData,
      restaurant,
    );
    let validateSelectedRestaurants = validateSelectedPositions(
      currentData,
      restaurant,
    );
    if (!validateRestaurant && !validateSelectedRestaurants) {
      setCurrentPositionsData([
        ...currentPositionsData,
        {
          status: 'pending',
          start_date: startDate,
          user_id: state?.userDetails?.user_id || '',
          restaurant: {
            place_id: restaurant?.place_id || '',
            rating: restaurant?.rating || '',
            photos: restaurant?.photos || [],
            name: restaurant?.name || '',
            formatted_address: restaurant?.formatted_address || '',
            our_rating: restaurant?.our_rating || '',
            location: restaurant?.location,
          },
        },
      ]);
      setCurrentData([
        ...currentData,
        {
          start_date: startDate,
          user_id: state?.userDetails?.user_id || '',
          restaurant: {
            place_id: restaurant?.place_id || '',
            rating: restaurant?.rating || '',
            photos: restaurant?.photos || [],
            name: restaurant?.name || '',
            formatted_address: restaurant?.formatted_address || '',
            our_rating: restaurant?.our_rating || '',
            location: restaurant?.location,
          },
        },
      ]);
      setCurrentModal(false);
      setRestaurant({});
      setTimeout(() => {
        setStart('');
      }, 1300);
    } else {
      alert('This place is already added in your current experiences.');
    }
  };

  let validation = restaurant && start;

  const onChangeStartDate = selectedDate => {
    const currentDate = selectedDate || startDate;
    setShowS(false);
    setStartDate(currentDate);
    setStart(currentDate);
  };
  const showModeStartDate = currentMode => {
    setShowS(true);
    setModeS(currentMode);
  };

  return (
    <Overlay
      overlayStyle={styles.container}
      isVisible={currentModal}
      onBackdropPress={() => setCurrentModal(false)}
    >
      <ImageBackground
        style={styles.imgBgStyle}
        source={imgBg}
        resizeMode="stretch"
      >
        <View style={styles.viewImg}>
          <TouchableOpacity
            onPress={() => setCurrentModal(false)}
            style={{ alignSelf: 'flex-end', margin: 10 }}
          >
            <AntDesign name="close" size={29} color="#485460" />
          </TouchableOpacity>
          <View
            style={{
              width: 140,
              height: 130,
              alignSelf: 'center',
              marginBottom: -70,
              bottom: -20,
            }}
          />
          <Image
            source={imgWaiter}
            style={styles.imgStyle}
            resizeMode="contain"
          />
        </View>
      </ImageBackground>

      <KeyboardAwareScrollView
        bounces={false}
        enableOnAndroid={true}
        extraScrollHeight={10}
        scrollEnabled={showDropdown ? false : true}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        scrollToOverflowEnabled={true}
        enableAutomaticScroll={Platform.OS === 'ios' ? true : false}
        resetScrollToCoords={{ x: 0, y: 0 }}
      >
        <Text style={[styles.txtConfrm, { fontFamily: 'ProximaNovaBold' }]}>
          {i18n.t('add_curr_pos')}
        </Text>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: 270,
            marginVertical: 15,
          }}
        >
          <View style={stylesTextbox.input_box}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text>
                {(!restaurant?.name || !restaurant?.restaurant_id) && (
                  <>
                    {!showDropdown &&
                      restaurant?.name &&
                      !restaurant?.restaurant_id && (
                        <Text style={{ color: 'red' }}>
                          *{i18n.t('search_click')}.
                        </Text>
                      )}

                    {!restaurant?.restaurant_id &&
                      restaurant?.name &&
                      showDropdown && (
                        <Text style={{ color: 'red' }}>
                          *{i18n.t('select_restaurant')}.
                        </Text>
                      )}
                  </>
                )}
              </Text>
            </View>
            <View style={[stylesTextbox.input_icon, { width: '80%' }]}>
              <TextInput
                returnKeyLabel="Find"
                returnKeyType="done"
                onSubmitEditing={handleSearchRestaurant}
                onChangeText={e =>
                  setRestaurant({
                    name: e || '',
                    restaurant_id:
                      restaurant?.name?.length < 2
                        ? ''
                        : restaurant?.restaurant_id,
                  })
                }
                value={restaurant?.name}
                style={stylesTextbox.input_icon_text}
                placeholder={i18n.t('name_of_company')}
                placeholderTextColor={'#707375'}
              />
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  handleSearchRestaurant();
                }}
              >
                <Image source={require('../../assets/images/search.png')} />
              </TouchableOpacity>
            </View>
            {showDropdown && (
              <ScrollView style={stylesTextbox.options}>
                {searchLoading ? (
                  <Text style={stylesTextbox.opt_txt}>Loading...</Text>
                ) : (
                  (restaurants?.data || []).map((item, i) => (
                    <TouchableOpacity
                      key={i}
                      activeOpacity={0.5}
                      onPress={() => {
                        setShowDropdown(false);
                        setRestaurant({
                          name: item?.name || '',
                          restaurant_id: item?._id || '',
                          place_id: item?.place_id || '',
                          rating: item?.rating,
                          photos: item?.photos,
                          formatted_address: item?.formatted_address || '',
                          our_rating: item?.our_rating,
                          location: item?.location,
                        });
                      }}
                    >
                      <Text style={stylesTextbox.opt_txt}>{item?.name}</Text>
                    </TouchableOpacity>
                  ))
                )}
              </ScrollView>
            )}
          </View>

          <TouchableOpacity onPress={showModeStartDate} style={styles.btnInput}>
            <Text
              style={{
                fontFamily: 'ProximaNova',
                color: '#707375',
                fontSize: 15,
                paddingTop: 15,
              }}
            >
              {start === ''
                ? i18n.t('start_date')
                : startDate.toLocaleDateString()}
            </Text>
            <DateTimePickerModal
              date={startDate}
              isVisible={showS}
              mode="date"
              onConfirm={onChangeStartDate}
              onCancel={() => setShowS(false)}
              dateFormat="dayofweek"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={AddData}
          disabled={validation ? false : true}
          style={[
            styles.btn_yellow,
            validation && {
              backgroundColor: Colors.yellow,
            },
          ]}
        >
          <Text
            style={{
              fontFamily: 'ProximaNova',
              fontSize: 14,
              color: Colors.fontDark,
            }}
          >
            {i18n.t('add')}
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </Overlay>
  );
};

export default CurrentPositionModal;

const styles = StyleSheet.create({
  inputsTopTow: {
    borderColor: '#E3E3E3',
    borderWidth: 1,
    width: 270,
    paddingLeft: 10,
    paddingRight: 10,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontFamily: 'ProximaNova',
    fontSize: 16,
    textAlign: 'center',
  },
  inputLabel: {
    color: 'black',
    opacity: 0.8,
    paddingBottom: 2.7,
    fontSize: 16,
    fontFamily: 'ProximaNovaBold',
  },
  input_box: {
    marginBottom: 16,
  },
  btn_yellow: {
    backgroundColor: '#EAEAEA',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 46,
    borderRadius: 8,
    marginBottom: Platform.OS === 'ios' ? 25 : 15,
    alignSelf: 'center',
  },
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
    height: 200,
  },
  txtConfrm: {
    fontSize: 18,
    color: Colors.fontDark,
    marginTop: 18,
    textAlign: 'center',
  },
  imgStyle: {
    width: 240,
    height: 220,
    alignSelf: 'center',
    marginTop: -122,
  },
  viewImg: {
    width: '100%',
    height: 240,
  },
  btnInput: {
    borderColor: '#E3E3E3',
    borderRadius: 10,
    borderWidth: 1,
    width: 270,
    height: 48,
    alignItems: 'center',
  },
});
