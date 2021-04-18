import React, { useState, useContext } from 'react';
import { ImageBackground } from 'react-native';
import { Text, View, Dimensions, ActivityIndicator } from 'react-native';
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
import { APPLY_WAITER } from '../../queries';
import { useMutation } from 'react-query';

const Find_Job = ({ navigation }) => {
  const { state } = useContext(Context);
  const [applyWaiter] = useMutation(APPLY_WAITER);
  const [temp, setTemp] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [lastExperience, setLastExperience] = useState('');
  const [loading, setLoading] = useState(false);
  let validation =
    firstName &&
    lastName &&
    lastExperience &&
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
        last_experience: lastExperience || '',
        education: education || '',
        time: temp || '',
      };
      await applyWaiter(jobForm, {
        onSuccess: () => {
          setLoading(false);
          navigation.navigate('Remove');
        },
        onError: () => {
          setLoading(false);
        },
      });
    }
  };

  return (
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
      <View style={{ flex: 5 }}>
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          keyboardVerticalOffset={100}
          bounces={false}
          scrollEnabled={true}
          style={{
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
                  placeholderTextColor={'#485460'}
                />
              </View>
              <View style={styles.input_box}>
                <Text style={styles.inputLabel}>{i18n.t('last_name')}</Text>
                <TextInput
                  style={styles.inputsTopTow}
                  onChangeText={e => setLastName(e)}
                  value={lastName}
                  placeholder="Zhou"
                  placeholderTextColor={'#485460'}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
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
                      placeholderTextColor={'#485460'}
                    />
                    <Text style={styles.experience}>{i18n.t('years')}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.input_box}>
                <Text style={styles.inputLabel}>
                  {i18n.t('last_experience')}
                </Text>
                <TextInput
                  style={styles.inputsTopTow}
                  onChangeText={e => setLastExperience(e)}
                  value={lastExperience}
                  placeholder={i18n.t('passedat')}
                  placeholderTextColor={'#485460'}
                />
              </View>
              <View style={styles.input_box}>
                <Text style={styles.inputLabel}>{i18n.t('education')}</Text>
                <TextInput
                  style={styles.inputsTopTow}
                  onChangeText={e => setEducation(e)}
                  value={education}
                  placeholder="BTS Tourisme"
                  placeholderTextColor={'#485460'}
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
        </ScrollView>
      </View>
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
  );
};

export default Find_Job;
