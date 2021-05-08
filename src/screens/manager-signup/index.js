import React, { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  Image,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import i18n from '../../li8n';
import { useMutation } from 'react-query';
import { SIGN_UP } from '../../queries';
import { SEARCH_RESTAURANTS } from '../../queries';
import stylesTextbox from '../find-job/styles';

const ManagerSignUp = ({ navigation }) => {
  const [signUp] = useMutation(SIGN_UP);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [index, setIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(3);
  const [showDropdown, setShowDropdown] = useState(false);
  const [restaurants, setRestaurants] = useState();
  const [searchLoading, setSearchLoading] = useState(false);
  const [lastExperience, setLastExperience] = useState({});
  const [searchRestaurant] = useMutation(SEARCH_RESTAURANTS);

  const handleSearchRestaurant = async () => {
    if (lastExperience?.last_exp) {
      setSearchLoading(true);
      setShowDropdown(true);
      await searchRestaurant(
        { search: lastExperience?.last_exp },
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

  let restaurantNameTextbox = () => {
    return (
      <View style={stylesTextbox.input_box}>
        <View
          style={[
            stylesTextbox.input_icon,
            { backgroundColor: '#F8F8F8', borderWidth: 0, marginBottom: -16 },
          ]}
        >
          <TextInput
            returnKeyLabel="Find"
            returnKeyType="done"
            onSubmitEditing={handleSearchRestaurant}
            onChangeText={e =>
              setLastExperience({
                last_exp: e || '',
                res_id: '',
              })
            }
            value={lastExperience?.last_exp}
            style={[
              styles.input_icon_text,
              { textAlign: 'center', width: '90%' },
            ]}
            placeholder={i18n.t('passedat')}
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
          <View style={[stylesTextbox.options, { marginTop: 16 }]}>
            {searchLoading ? (
              <Text style={stylesTextbox.opt_txt}>Loading...</Text>
            ) : (
              (restaurants?.data || []).map((item, i) => (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.5}
                  onPress={() => {
                    setShowDropdown(false);
                    setLastExperience({
                      last_exp: item?.name || '',
                      res_id: item?.place_id || '',
                    });
                  }}
                >
                  <Text style={stylesTextbox.opt_txt}>{item?.name}</Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        )}
      </View>
    );
  };

  const data = [
    {
      id: 1,
      value: name,
      setValue: setName,
      placeholder: i18n.t('res_name'),
    },
    {
      id: 2,
      value: address,
      setValue: setAddress,
      placeholder: i18n.t('address'),
    },
    {
      id: 3,
      value: postalCode,
      setValue: setPostalCode,
      placeholder: i18n.t('code_postal'),
    },
    {
      id: 4,
      value: firstName,
      setValue: setFirstName,
      placeholder: i18n.t('first_name'),
    },
    {
      id: 5,
      value: lastName,
      setValue: setLastName,
      placeholder: i18n.t('last_name'),
    },
    {
      id: 6,
      value: email,
      setValue: setEmail,
      placeholder: i18n.t('email'),
    },
    {
      id: 7,
      value: password,
      setValue: setPassword,
      placeholder: i18n.t('password_sign'),
    },
  ];

  const handleNext = () => {
    if (lastIndex === 7) {
      setIndex(0);
      setLastIndex(3);
    }
    if (index !== 3) {
      setIndex(index + 3);
    } else {
      setIndex(index + 2);
    }
    setLastIndex(lastIndex + 2);
  };

  const handlePrev = () => {
    if (index === 0) {
      alert('no more next');
    }
    if (index === 3) {
      setIndex(index - 3);
    } else {
      setIndex(index - 2);
    }
    setLastIndex(lastIndex - 2);
  };

  const handleSubmit = async () => {
    if (
      lastExperience?.last_exp &&
      address &&
      postalCode &&
      lastName &&
      firstName &&
      email &&
      password
    ) {
      await signUp(
        {
          full_name: firstName,
          last_name: lastName,
          password: password,
          email: email,
          restaurant_id: lastExperience?.res_id || '',
          postal_code: postalCode,
          restaurant_address: address,
        },
        {
          onSuccess: () => {
            alert('Sign up successful! Please login now.');
            navigation.navigate('SignIn');
          },
          onError: e => {
            alert(e.response?.data?.message);
          },
        },
      );
    } else {
      alert('Please fill all the fields..');
    }
  };

  return (
    <ImageBackground
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
      }}
      source={require('../../assets/images/splashBg.png')}
    >
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
        behavior="position"
        keyboardVerticalOffset={-500}
        enabled
      >
        <View style={styles.whiteCard}>
          <Text style={styles.topHeading}>
            {index === 0
              ? i18n.t('resturant')
              : index === 3
              ? i18n.t('manager')
              : null}
          </Text>
          <View
            style={{
              marginVertical: 30,
              width: '93%',
            }}
          >
            {data.slice(index, lastIndex).map(v => (
              <>
                {v.id === 1 ? (
                  restaurantNameTextbox()
                ) : (
                  <TextInput
                    key={v.id}
                    style={styles.input}
                    onChangeText={e => v.setValue(e)}
                    value={v.value}
                    placeholder={v.placeholder}
                    placeholderTextColor="#707070"
                  />
                )}
              </>
            ))}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '100%',
              marginBottom: 4,
            }}
          >
            <TouchableOpacity
              style={styles.btn_return}
              onPress={index === 0 ? () => navigation.goBack() : handlePrev}
              activeOpacity={0.4}
            >
              <Text style={styles.btn_txt}>{i18n.t('return')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={
                name.length > 0 &&
                address.length > 0 &&
                postalCode.length > 0 &&
                lastName.length > 0 &&
                firstName.length > 0 &&
                email.length > 0 &&
                password.length > 0 &&
                lastIndex === 0
                  ? 1
                  : 0.4
              }
              style={styles.btn_yellow}
              onPress={lastIndex === 7 ? handleSubmit : handleNext}
            >
              <Text style={styles.btn_txt}>
                {lastIndex === 7 ? i18n.t('to_login') : i18n.t('carry_on')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default ManagerSignUp;
