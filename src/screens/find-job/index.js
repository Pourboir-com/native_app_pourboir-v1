import React, { useState, useContext } from 'react';
import { ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GlobalHeader from '../../components/GlobalHeader';
import i18n from '../../li8n';
import styles from './styles';
import { Colors } from '../../constants/Theme';
import Context from '../../contextApi/context';
import { APPLY_WAITER, ADD_PAST_EXP, GET_YOUR_ALL_RES } from '../../queries';
import { useMutation, useQuery } from 'react-query';
import CommonModal from '../../components/modals/HelpUsImproveModal';
const canidate = require('../../assets/images/canidate.png');
import { AntDesign } from '@expo/vector-icons';
import AddExperienceModal from '../../components/modals/AddExperienceModal';
import AddNicheModal from '../../components/modals/AddNicheModal';
import { removeId, nicheModalDataUpdated, checkExeperience } from './util';
import moment from 'moment';
import CurrentPositionModal from '../../components/modals/CurrentPositionModal';
import CommonTabs from '../../components/common-tabs';
import { reactQueryConfig } from '../../constants';

const Find_Job = ({ navigation, route }) => {
  const { form, refetch } = route?.params;
  const { state } = useContext(Context);

  // getting first and last name saved in state
  let savedFirstName = form?.user_id?.full_name || state?.userDetails?.name;
  let savedLastName = form?.user_id?.last_name || state?.userDetails?.last_name;

  const [applyWaiter] = useMutation(APPLY_WAITER);
  const [temp, setTemp] = useState(form?.time || '');
  const [firstName, setFirstName] = useState(savedFirstName);
  const [lastName, setLastName] = useState(savedLastName);
  const [education, setEducation] = useState(form?.diploma || '');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [position, setPosition] = useState(form?.position || '');
  const [phone, setPhone] = useState(form?.user_id?.phone_number || '');
  const [expModalVisible, setExpModalVisible] = useState(false);
  const [currentModal, setCurrentModal] = useState(false);
  const [nicheModalVisible, setNicheModalVisible] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const [currentPositionsData, setCurrentPositionsData] = useState([]);

  const [data, setData] = useState(checkExeperience(form) || []);
  const [job, setJob] = useState(form?.looking_for_job ? 'yes' : 'No');
  const [addPastExperience] = useMutation(ADD_PAST_EXP);

  const [nicheModalData, setNicheModalData] = useState(
    form?.availability || [],
  );

  const {
    refetch: refetchCurrentPositions,
    isLoading: currentPositionLoading,
    isFetching: currentPositionIsFetching,
  } = useQuery(
    [
      'GET_YOUR_ALL_RES',
      {
        user_id: state?.userDetails?.user_id,
      },
    ],
    GET_YOUR_ALL_RES,
    {
      ...reactQueryConfig,
      enabled: state?.userDetails?.user_id ? true : false,
      onSuccess: res => {
        let currentPosition = [];
        (res?.restaurants?.results || []).map(item => {
          let positionArray = currentPosition.push({
            restaurant_id: item?._id,
            status: item?.waiter?.status || '',
            start_date: item?.waiter?.start_date || '',
            user_id: state?.userDetails?.user_id || '',
            restaurant: {
              place_id: item?.place_id || '',
              rating: item?.rating || '',
              photos: item?.photos || [],
              name: item?.name || '',
              formatted_address: item?.vicinity || '',
              our_rating: item?.our_rating || '',
            },
          });
        });
        setCurrentPositionsData(currentPosition);
      },
    },
  );

  const validation = () => {
    if (job === 'yes') {
      if (temp === 'half') {
        return (
          firstName &&
          lastName &&
          position &&
          education &&
          job &&
          phone &&
          data.length &&
          nicheModalData.length &&
          currentPositionsData.length &&
          temp
        );
      } else if (temp === 'full') {
        return (
          firstName &&
          lastName &&
          position &&
          education &&
          job &&
          phone &&
          data.length &&
          currentPositionsData.length &&
          temp
        );
      }
    } else {
      return (
        firstName &&
        lastName &&
        position &&
        education &&
        job &&
        data.length &&
        currentPositionsData.length
      );
    }
  };

  const handleApplyJob = async () => {
    if (state?.userDetails?.user_id) {
      setLoading(true);
      let jobForm;
      if (job === 'yes') {
        if (temp === 'half') {
          jobForm = {
            id: state?.userDetails?.user_id || '',
            full_name: firstName || '',
            last_name: lastName || '',
            experience: removeId(data) || [],
            telephone_number: phone || '',
            time: temp || '',
            diploma: education || '',
            position: position || '',
            availability: removeId(nicheModalData) || [],
            looking_for_job: true,
          };
        } else if (temp === 'full')
          jobForm = {
            id: state?.userDetails?.user_id || '',
            full_name: firstName || '',
            last_name: lastName || '',
            experience: removeId(data) || [],
            telephone_number: phone || '',
            time: temp || '',
            diploma: education || '',
            position: position || '',
            looking_for_job: true,
          };
      } else {
        jobForm = {
          id: state?.userDetails?.user_id || '',
          full_name: firstName || '',
          last_name: lastName || '',
          experience: removeId(data) || [],
          diploma: education || '',
          position: position || '',
          looking_for_job: false,
        };
      }

      if (currentData?.length) {
        await addPastExperience(
          { data: currentData },
          {
            onSuccess: () => {
              refetchCurrentPositions();
            },
            onError: e => {
              alert(e.response?.data?.message);
            },
          },
        );
      }

      await applyWaiter(jobForm, {
        onSuccess: async () => {
          await refetch();
          setLoading(false);
          setModalVisible(true);
        },
        onError: e => {
          setLoading(false);
          alert(e.response?.data?.message);
        },
      });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <StatusBar translucent={true} style="light" />
        <ImageBackground
          style={{
            width: '100%',
            height: 100,
            borderBottomLeftRadius: Dimensions.get('window').width * 0.06,
            borderBottomRightRadius: Dimensions.get('window').width * 0.06,
            overflow: 'hidden',
          }}
          source={require('../../assets/images/blue-head.png')}
        >
          <GlobalHeader
            arrow={true}
            headingText={i18n.t('area_prof')}
            fontSize={17}
            color={'white'}
            navigation={navigation}
            setting={false}
            backgroundColor={'transparent'}
            borderRadius={true}
            whiteIcon={true}
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
              <View style={styles.input_box}>
                <Text style={styles.inputLabel}>{i18n.t('position')}</Text>
                <TextInput
                  style={styles.inputsTopTow}
                  onChangeText={e => setPosition(e)}
                  value={position}
                  placeholder="Waiter"
                  placeholderTextColor={'#707375'}
                />
              </View>

              <View style={styles.input_box}>
                <Text style={styles.inputLabel}>{i18n.t('diploma')}</Text>
                <TextInput
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
                    fontSize: 20,
                    marginBottom: 14,
                  }}
                >
                  {i18n.t('prof_exp')}
                </Text>
                <View style={{ marginTop: 10 }}>
                  <Text
                    style={{
                      paddingBottom: 10,
                      fontSize: 16,
                      fontFamily: 'ProximaNovaBold',
                    }}
                  >
                    {i18n.t('current_pos')}
                  </Text>
                  {currentPositionLoading || currentPositionIsFetching ? (
                    <Text
                      style={{
                        paddingBottom: 10,
                        fontSize: 15,
                        fontFamily: 'ProximaNova',
                      }}
                    >
                      Loading...
                    </Text>
                  ) : (
                    <View
                      style={{
                        marginBottom: currentPositionsData?.length ? 20 : 0,
                      }}
                    >
                      {(currentPositionsData || []).map((v, i) => {
                        return (
                          <View key={i}>
                            <View
                              style={{
                                ...styles.expBox,
                                backgroundColor:
                                  v?.status === 'active' ? '#FFF6D4' : '#fff',
                              }}
                            >
                              <View>
                                <View
                                  style={{
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                  }}
                                >
                                  <Text
                                    style={[styles.expTxt1, { width: 160 }]}
                                  >
                                    {v?.restaurant?.name || v?.name}
                                  </Text>
                                  <Text style={styles.expTxt1}>
                                    {v?.status
                                      ? v?.status === 'active'
                                        ? i18n.t('confirm')
                                        : v?.status
                                      : 'pending'}
                                  </Text>
                                </View>
                                <Text
                                  style={[
                                    styles.expTxt3,
                                    { paddingTop: v?.start_date ? 10 : 0 },
                                  ]}
                                >
                                  {v?.start_date &&
                                    `${i18n.t('since')} ${moment(
                                      v?.start_date,
                                    ).format('MM/DD/YYYY')}`}
                                </Text>
                              </View>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  )}
                  <View style={styles.viewAddReview}>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Text
                        style={[
                          styles.txtAddReview,
                          { fontFamily: 'ProximaNovaBold' },
                        ]}
                      >
                        {i18n.t('add_exp')}
                      </Text>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => setCurrentModal(true)}
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

                <View style={{ marginTop: 30 }}>
                  <Text
                    style={{
                      paddingBottom: 10,
                      fontSize: 16,
                      fontFamily: 'ProximaNovaBold',
                    }}
                  >
                    {i18n.t('past_pos')}
                  </Text>
                  <View style={{ marginBottom: data?.length ? 20 : 0 }}>
                    {data?.map((v, i) => {
                      return (
                        <View key={i}>
                          {v?.enterprise_name && (
                            <View style={styles.expBox}>
                              <View>
                                <Text style={styles.expTxt1}>
                                  {v?.enterprise_name}
                                </Text>
                                <Text style={styles.expTxt2}>
                                  {v?.position}
                                </Text>
                                <Text style={styles.expTxt3}>
                                  {`${i18n.t('of')} ${moment(
                                    v?.start_date,
                                  ).format('MM/DD/YYYY')} ${i18n.t('at')} ${
                                    v?.end_date
                                      ? moment(v?.end_date).format('MM/DD/YYYY')
                                      : i18n.t('still_working')
                                  }`}
                                </Text>
                              </View>
                            </View>
                          )}
                        </View>
                      );
                    })}
                  </View>
                  <View style={styles.viewAddReview}>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Text
                        style={[
                          styles.txtAddReview,
                          { fontFamily: 'ProximaNovaBold' },
                        ]}
                      >
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
              </View>
              <View
                style={{
                  marginBottom: temp === 'half' ? 9 : 16,
                }}
              >
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'ProximaNovaBold',
                    fontSize: 20,
                    marginBottom: 14,
                  }}
                >
                  {i18n.t('look_job')}
                </Text>
                <CommonTabs
                  tab1={i18n.t('yes')}
                  tab2={i18n.t('no')}
                  job={job}
                  setJob={setJob}
                  diff={true}
                />
              </View>
              {job === 'yes' && (
                <View style={{ marginBottom: temp === 'half' ? 9 : 16 }}>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'ProximaNovaBold',
                      fontSize: 20,
                      marginBottom: 14,
                    }}
                  >
                    {i18n.t('availability')}
                  </Text>
                  <Text style={styles.inputLabel}>{i18n.t('Time')}</Text>
                  <CommonTabs
                    tab1={i18n.t('full')}
                    tab2={i18n.t('partial')}
                    temp={temp}
                    setTemp={setTemp}
                    diff={false}
                  />
                </View>
              )}
              {temp === 'half' && job === 'yes' && (
                <View>
                  {(nicheModalDataUpdated(nicheModalData) || []).map((v, i) => {
                    return (
                      <View
                        key={i}
                        style={{ ...styles.availabilityCard, marginBottom: 8 }}
                      >
                        <Text style={styles.availTxt1}>{v?.day}</Text>
                        <Text style={styles.availTxt2}>
                          {` ${v?.slot.join(' - ')}`}
                        </Text>
                      </View>
                    );
                  })}

                  <View
                    style={{
                      ...styles.viewAddReview,
                      marginBottom: 20,
                      marginTop: 10,
                    }}
                  >
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
            {job === 'yes' && (
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'ProximaNovaBold',
                    fontSize: 20,
                    marginBottom: 14,
                    marginTop: 5,
                  }}
                >
                  {i18n.t('contact_me')}
                </Text>
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
              </View>
            )}
          </View>
        </KeyboardAwareScrollView>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handleApplyJob}
          disabled={loading ? true : validation() ? false : true}
          style={[
            styles.btn_yellow,
            validation() && {
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
              {i18n.t('save')}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {modalVisible && (
        <CommonModal
          isVisible={modalVisible}
          handleModalClose={() => {
            setModalVisible(false);
            navigation.navigate('WaiterProfile', { crossIcon: true });
          }}
          image={canidate}
          onPress={() => {
            setModalVisible(false);
            navigation.navigate('WaiterProfile', { crossIcon: true });
          }}
          heading={i18n.t('thank_info')}
          subHeadingText={i18n.t('broadcast')}
          buttonText={'OK'}
          customHeadingSize={Platform.OS === 'ios' ? 26 : 24}
          customButtonWidth={130}
        />
      )}
      <AddExperienceModal
        expModalVisible={expModalVisible}
        setExpModalVisible={setExpModalVisible}
        data={data}
        setData={setData}
      />
      <CurrentPositionModal
        currentModal={currentModal}
        setCurrentModal={setCurrentModal}
        currentData={currentData}
        setCurrentData={setCurrentData}
        setCurrentPositionsData={setCurrentPositionsData}
        currentPositionsData={currentPositionsData}
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
