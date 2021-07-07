import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import CommonButton from '../../components/common-button';
import GlobalHeader from '../../components/GlobalHeader';
import { Colors } from '../../constants/Theme';
import i18n from '../../li8n';
import { StatusBar } from 'expo-status-bar';

const ProfessionalArea = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
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
          whiteIcon={true}
          arrow={true}
          headingText={i18n.t('area_prof')}
          fontSize={17}
          color={'white'}
          navigation={navigation}
          setting={false}
          backgroundColor={'transparent'}
          borderRadius={true}
        />
      </ImageBackground>
      <ScrollView style={{ flex: 11 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Image
            style={{ width: 350, height: 350 }}
            source={require('../../assets/images/Waiters-cuate.png')}
          />
        </View>
        <View style={{ marginHorizontal: '4%' }}>
          <View style={{ marginTop: 20 }}>
            <CommonButton
              title={i18n.t('prof_pofile')}
              color={Colors.yellow}
              disable={false}
              navigation="FindJob"
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <CommonButton
              title={i18n.t('i_manage')}
              color={Colors.yellow}
              disable={false}
              navigation="SignIn"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfessionalArea;

const styles = StyleSheet.create({});
