import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import { Text, View, StatusBar } from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import GlobalHeader from '../../components/GlobalHeader';
import i18n from '../../li8n';
import styles from './styles';
import { Button } from 'native-base';
import { set } from 'react-native-reanimated';
import I18n, { l } from 'i18n-js';
import { KeyboardAvoidingView } from 'react-native';
import { Dimensions } from 'react-native';

const ProfileCandidate = ({ navigation }) => {
  const [temp, setTemp] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [lastExperience, setLastExperience] = useState('');
  const windowHeight = Dimensions.get('window').height;

  console.log(temp);
  return (
    <View style={styles.container}>
      <StatusBar translucent={true} style="dark" />
      <View style={{ flex: 1, zIndex: 1111 }}>
        <ImageBackground
          style={{
            width: '100%',
            height: 100,
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
      </View>
      <View style={{ flex: 5, marginTop: 10 }}>
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
                <Text style={styles.inputLabel}>{I18n.t('first_name')}</Text>
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
                      placeholder=""
                      maxLength={2}
                      keyboardType="numeric"
                      placeholderTextColor={'#485460'}
                    />
                    <Text style={styles.experience}> ans </Text>
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
                <Text style={styles.inputLabel}>Temps</Text>
                <View
                  style={
                    temp !== ''
                      ? styles.chooseButtons_container_active
                      : styles.chooseButtons_container
                  }
                >
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={temp === 'Full' ? styles.btn1_active : styles.btn1}
                    onPress={() => setTemp('Full')}
                    value={temp}
                  >
                    <Text style={styles.timeTxt}>{i18n.t('full')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={
                      temp === 'Partial' ? styles.btn2_active : styles.btn2
                    }
                    onPress={() => setTemp('Partial')}
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
      <View style={{ flex: -2 }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          {(firstName.length &&
            lastName.length &&
            lastExperience.length &&
            experience.length &&
            education.length &&
            temp.length > 0) ||
          undefined ||
          null ? (
            <Button disabled={false} style={styles.btn_yellow}>
              <Text style={{ fontSize: 14, fontFamily: 'ProximaNova' }}>
                {i18n.t('candidate_btn')}
              </Text>
            </Button>
          ) : (
            <Button disabled={true} style={styles.btn_gray}>
              <Text style={{ fontSize: 14, fontFamily: 'ProximaNova' }}>
                {i18n.t('candidate_btn')}
              </Text>
            </Button>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProfileCandidate;
