import React, { useState, useContext } from 'react';
import { ImageBackground } from 'react-native';
import {
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import GlobalHeader from '../../components/GlobalHeader';
import i18n from '../../li8n';
import styles from './styles';
import { Colors } from '../../constants/Theme';
import Context from '../../contextApi/context';
import { APPLY_WAITER, SEARCH_RESTAURANTS } from '../../queries';
import { useMutation } from 'react-query';
import CommonModal from '../../components/modals/HelpUsImproveModal';
const canidate = require('../../assets/images/canidate.png');

const Find_Job = ({ navigation }) => {
  const { state } = useContext(Context);
  //getting first and last name saved in state
  let fullName = state?.userDetails?.name?.split(' ');
  let savedFirstName =
    fullName?.length > 1
      ? fullName?.slice(0, fullName?.length - 1).join(' ')
      : fullName[0];
  let savedLastName =
    fullName?.length > 1 ? fullName[fullName?.length - 1] : '';
  //states
  const [applyWaiter] = useMutation(APPLY_WAITER);
  const [searchRestaurant] = useMutation(SEARCH_RESTAURANTS);
  const [temp, setTemp] = useState('');
  const [firstName, setFirstName] = useState(savedFirstName);
  const [lastName, setLastName] = useState(savedLastName);
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [lastExperience, setLastExperience] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [position, setPosition] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [restaurants, setRestaurants] = useState();
  const [searchLoading, setSearchLoading] = useState(false);

  let validation =
    firstName &&
    lastName &&
    lastExperience?.last_exp &&
    position &&
    experience.replace(/[^0-9]/g, '') &&
    education &&
    temp;

  const handleApplyJob = async () => {
    if (state?.userDetails?.user_id) {
      setLoading(true);
      let jobForm = {
        id: state?.userDetails?.user_id || '',
        full_name: firstName || '',
        last_name: lastName || '',
        experience: experience || '',
        last_experience: {
          last_exp: lastExperience?.last_exp || '',
          restaurant_id: lastExperience?.res_id || '',
        },
        education: education || '',
        time: temp || '',
        position: position || '',
      };
      await applyWaiter(jobForm, {
        onSuccess: () => {
          setLoading(false);
          setModalVisible(true);
        },
        onError: () => {
          setLoading(false);
        },
      });
    }
  };
  const handleSearchRestaurant = async () => {
    if (lastExperience) {
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

  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          style={{
            width: '100%',
            height: 100,
            borderBottomLeftRadius: Dimensions.get('window').width * 0.06,
            borderBottomRightRadius: Dimensions.get('window').width * 0.06,
            overflow: 'hidden',
          }}
          source={require('../../assets/images/Group3.png')}
        >
          <GlobalHeader
            arrow={true}
            headingText={i18n.t('candidate_profile')}
            fontSize={17}
            color={'black'}
            navigation={navigation}
            setting={false}
            backgroundColor={'transparent'}
            borderRadius={true}
          />
        </ImageBackground>

        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          bounces={false}
          style={{
            width: '100%',
          }}
        >
          <KeyboardAvoidingView
            keyboardVerticalOffset={-500}
            behavior="position"
            enabled
          >
            <View style={styles.main_container}>
              <View>
                <Text style={styles.heading1}> {i18n.t('personal_info')}</Text>
              </View>
              <View>
                <View style={styles.input_box}>
                  <Text style={styles.inputLabel}>{i18n.t('first_name')}</Text>
                  <TextInput
                    style={styles.inputsTopTow}
                    onChangeText={e => setFirstName(e)}
                    value={firstName}
                    placeholder="Christine"
                    placeholderTextColor={'#707375'}
                  />
                </View>
                <View style={styles.input_box}>
                  <Text style={styles.inputLabel}>{i18n.t('last_name')}</Text>
                  <TextInput
                    style={styles.inputsTopTow}
                    onChangeText={e => setLastName(e)}
                    value={lastName}
                    placeholder="Zhou"
                    placeholderTextColor={'#707375'}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={styles.input_box}>
                    <Text style={styles.inputLabel}>
                      {i18n.t('experience')}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                      <TextInput
                        style={styles.smallInput}
                        onChangeText={e => setExperience(e)}
                        value={experience}
                        placeholder="5"
                        maxLength={2}
                        keyboardType="numeric"
                        placeholderTextColor={'#707375'}
                      />
                      <Text style={styles.experience}>{i18n.t('years')}</Text>
                    </View>
                  </View>
                  <View style={styles.input_box}>
                    <Text style={styles.inputLabel}>{i18n.t('position')}</Text>
                    <TextInput
                      style={styles.waiterInput}
                      onChangeText={e => setPosition(e)}
                      value={position}
                      placeholder="Waiter"
                      placeholderTextColor={'#707375'}
                    />
                  </View>
                </View>
                <View style={styles.input_box}>
                  <Text style={styles.inputLabel}>
                    {i18n.t('last_experience')}
                  </Text>
                  <View style={styles.input_icon}>
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
                      style={styles.input_icon_text}
                      placeholder={i18n.t('passedat')}
                      placeholderTextColor={'#707375'}
                    />
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => {
                        handleSearchRestaurant();
                      }}
                    >
                      <Image
                        source={require('../../assets/images/search.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  {showDropdown && (
                    <View style={styles.options}>
                      {searchLoading ? (
                        <Text style={styles.opt_txt}>Loading...</Text>
                      ) : (
                        (restaurants?.data || []).map((item, i) => (
                          <TouchableOpacity
                            key={i}
                            activeOpacity={0.5}
                            onPress={() => {
                              setShowDropdown(false);
                              setLastExperience({
                                last_exp: item?.name || '',
                                res_id: item?._id || '',
                              });
                            }}
                          >
                            <Text style={styles.opt_txt}>{item?.name}</Text>
                          </TouchableOpacity>
                        ))
                      )}
                    </View>
                  )}
                </View>
                <View style={styles.input_box}>
                  <Text style={styles.inputLabel}>{i18n.t('education')}</Text>
                  <TextInput
                    onFocus={() => showDropdown && setShowDropdown(false)}
                    style={styles.inputsTopTow}
                    onChangeText={e => setEducation(e)}
                    value={education}
                    placeholder="BTS Tourisme"
                    placeholderTextColor={'#707375'}
                  />
                </View>
                <View style={styles.input_box}>
                  <Text style={styles.inputLabel}>{i18n.t('Time')}</Text>
                  <View style={styles.chooseButtons_container}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={[
                        styles.time_opt,
                        temp === 'full' && {
                          backgroundColor: Colors.yellow,
                          borderTopLeftRadius: 7,
                          borderBottomLeftRadius: 7,
                        },
                      ]}
                      onPress={() => setTemp('full')}
                      value={temp}
                    >
                      <Text style={styles.timeTxt}>{i18n.t('full')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={[
                        styles.time_opt,
                        { borderLeftWidth: 1 },
                        temp === 'half' && {
                          backgroundColor: Colors.yellow,
                          borderTopRightRadius: 7,
                          borderBottomRightRadius: 7,
                        },
                      ]}
                      onPress={() => setTemp('half')}
                      value={temp}
                    >
                      <Text style={styles.timeTxt}>{i18n.t('partial')}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handleApplyJob}
          disabled={loading ? true : validation ? false : true}
          style={[
            styles.btn_yellow,
            validation && {
              backgroundColor: Colors.yellow,
            },
          ]}
        >
          {loading ? (
            <ActivityIndicator size={29} color="#EBC11B" />
          ) : (
            <Text
              style={{
                fontFamily: 'ProximaNova',
                fontSize: 16,
                color: Colors.fontDark,
              }}
            >
              {i18n.t('candidate_btn')}
            </Text>
          )}
        </TouchableOpacity>
      </View>
      {modalVisible && (
        <CommonModal
          isVisible={modalVisible}
          handleModalClose={() => {
            setModalVisible(false);
            navigation.navigate('Remove');
          }}
          image={canidate}
          onPress={() => {
            setModalVisible(false);
            navigation.navigate('Remove');
          }}
          heading={i18n.t('thank_info')}
          subHeadingText={i18n.t('broadcast')}
          buttonText={'OK'}
        />
      )}
    </>
  );
};

export default Find_Job;
