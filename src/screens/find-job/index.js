import React, { useState, useContext } from 'react';
import { ImageBackground } from 'react-native';
import {
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  Platform,
  Image,
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GlobalHeader from '../../components/GlobalHeader';
import i18n from '../../li8n';
import styles from './styles';
import { Colors } from '../../constants/Theme';
import Context from '../../contextApi/context';
import { APPLY_WAITER, SEARCH_RESTAURANTS } from '../../queries';
import { useMutation } from 'react-query';
import CommonModal from '../../components/modals/HelpUsImproveModal';
const canidate = require('../../assets/images/canidate.png');
import { AntDesign } from '@expo/vector-icons';
import AddExperienceModal from '../../components/modals/AddExperienceModal';
import AddNicheModal from '../../components/modals/AddNicheModal';

const Find_Job = ({ navigation }) => {
  const { state } = useContext(Context);
  // getting first and last name saved in state
  let fullName = state?.userDetails?.name?.split(' ');
  let savedFirstName =
    fullName?.length > 1
      ? fullName?.slice(0, fullName?.length - 1).join(' ')
      : fullName[0];
  let savedLastName =
    fullName?.length > 1 ? fullName[fullName?.length - 1] : '';
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
  const [phone, setPhone] = useState();
  const [expModalVisible, setExpModalVisible] = useState(false);
  const [nicheModalVisible, setNicheModalVisible] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [post, setPost] = useState('');
  const [startDate, setStartDate] = useState(new Date(1495051730000));
  const [endDate, setEndDate] = useState(new Date(1598051730000));
  const [data, setData] = useState([]);
  const [nicheModalData, setNicheModalData] = useState([]);

  let validation =
    firstName &&
    // lastName &&
    // lastExperience?.restaurant_id &&
    // lastExperience?.experience &&
    // position &&
    // experience.replace(/[^0-9]/g, '') &&
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
        // last_experience: {
        //   restaurant_id: lastExperience?.restaurant_id || '',
        //   experience: lastExperience?.experience || '',
        // },
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
    if (lastExperience?.experience) {
      setSearchLoading(true);
      setShowDropdown(true);
      await searchRestaurant(
        { search: lastExperience?.experience },
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

        <KeyboardAwareScrollView
          bounces={false}
          enableOnAndroid={true}
          extraScrollHeight={10}
          keyboardShouldPersistTaps="handled"
          scrollToOverflowEnabled={true}
          enableAutomaticScroll={Platform.OS === 'ios' ? true : false}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{
            width: '100%',
          }}
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
              {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View style={styles.input_box}>
                  <Text style={styles.inputLabel}>{i18n.t('experience')}</Text>
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
                    <Text style={styles.experience}>
                      {Number(experience) > 1
                        ? `${i18n.t('year')}s`
                        : i18n.t('year')}
                    </Text>
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
              </View> */}
              {/* <View style={styles.input_box}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={styles.inputLabel}>
                    {i18n.t('last_experience')}
                  </Text>
                  <Text>
                    {(!lastExperience?.experience ||
                      !lastExperience?.restaurant_id) && (
                      <>
                        {!showDropdown &&
                          lastExperience?.experience &&
                          !lastExperience?.restaurant_id && (
                            <Text style={{ color: 'red' }}>
                              *Click on search.
                            </Text>
                          )}

                        {!lastExperience?.restaurant_id &&
                          lastExperience?.experience &&
                          showDropdown && (
                            <Text style={{ color: 'red' }}>
                              *Select restaurant.
                            </Text>
                          )}
                      </>
                    )}
                  </Text>
                </View>
                <View style={styles.input_icon}>
                  <TextInput
                    returnKeyLabel="Find"
                    returnKeyType="done"
                    onSubmitEditing={handleSearchRestaurant}
                    onChangeText={e =>
                      setLastExperience({
                        experience: e || '',
                        restaurant_id:
                          lastExperience?.experience?.length < 2
                            ? ''
                            : lastExperience?.restaurant_id,
                      })
                    }
                    value={lastExperience?.experience}
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
                    <Image source={require('../../assets/images/search.png')} />
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
                              experience: item?.name || '',
                              restaurant_id: item?._id || '',
                            });
                          }}
                        >
                          <Text style={styles.opt_txt}>{item?.name}</Text>
                        </TouchableOpacity>
                      ))
                    )}
                  </View>
                )}
              </View> */}
              <View style={styles.input_box}>
                <Text style={styles.inputLabel}>{i18n.t('phone')}</Text>
                <TextInput
                  style={styles.inputsTopTow}
                  onChangeText={e => setPhone(e)}
                  value={phone}
                  placeholder="06 88 88 88 88"
                  placeholderTextColor={'#707375'}
                  keyboardType={'numeric'}
                />
              </View>
              <View style={styles.input_box}>
                <Text style={styles.inputLabel}>{i18n.t('diploma')}</Text>
                <TextInput
                  onFocus={() => showDropdown && setShowDropdown(false)}
                  style={styles.inputsTopTow}
                  onChangeText={e => setEducation(e)}
                  value={education}
                  placeholder="BTS Tourisme"
                  placeholderTextColor={'#707375'}
                />
              </View>
              <View style={{ marginVertical: 16 }}>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'ProximaNovaBold',
                    fontSize: 18,
                  }}
                >
                  {i18n.t('prof_exp')}
                </Text>
                {data.map((v, i) => {
                  return (
                    <View key={i} style={styles.expBox}>
                      <View>
                        <Text style={styles.expTxt1}>{v.companyName}</Text>
                        <Text style={styles.expTxt2}>{v.post}</Text>
                        <Text style={styles.expTxt3}>
                          {i18n.t('of')} {v.startDate} {i18n.t('at')}{' '}
                          {v.endDate}
                        </Text>
                      </View>
                    </View>
                  );
                })}
                <View style={styles.viewAddReview}>
                  {/* <Text style={[styles.txtCantFind, { fontFamily: 'ProximaNova' }]}>
            {i18n.t('cant_find_your_server')}
          </Text> */}
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={[
                        styles.txtAddReview,
                        { fontFamily: 'ProximaNovaBold' },
                      ]}
                    >
                      {/* {i18n.t('add_your_server')} */}
                      {i18n.t('add_exp')}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => setExpModalVisible(true)}
                      style={styles.btnAdd}
                    >
                      <AntDesign
                        name="plus"
                        size={16}
                        color={Colors.fontDark}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{ marginBottom: temp === 'half' ? 9 : 16 }}>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'ProximaNovaBold',
                    fontSize: 18,
                    marginBottom: 14,
                  }}
                >
                  {i18n.t('availability')}
                </Text>
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
              {temp === 'half' && (
                <View>
                  {nicheModalData.map((v, i) => {
                    return (
                      <View
                        key={i}
                        style={{ ...styles.availabilityCard, marginBottom: 8 }}
                      >
                        <Text style={styles.availTxt1}>{v.dayOfWeek}</Text>
                        <Text style={styles.availTxt2}>
                          {` ${v.times.join(' - ')}`}
                        </Text>
                      </View>
                    );
                  })}

                  <View style={{ ...styles.viewAddReview, marginBottom: 20 }}>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Text
                        style={[
                          styles.txtAddReview,
                          { fontFamily: 'ProximaNovaBold' },
                        ]}
                      >
                        {i18n.t('add_niche')}
                      </Text>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => setNicheModalVisible(true)}
                        style={styles.btnAdd}
                      >
                        <AntDesign
                          name="plus"
                          size={16}
                          color={Colors.fontDark}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>

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
      <AddExperienceModal
        expModalVisible={expModalVisible}
        setExpModalVisible={setExpModalVisible}
        companyName={companyName}
        post={post}
        startDate={startDate}
        endDate={endDate}
        setCompanyName={setCompanyName}
        setPost={setPost}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        data={data}
        setData={setData}
      />
      <AddNicheModal
        nicheModalVisible={nicheModalVisible}
        setNicheModalVisible={setNicheModalVisible}
        nicheModalData={nicheModalData}
        setNicheModalData={setNicheModalData}
      />
    </>
  );
};

export default Find_Job;
