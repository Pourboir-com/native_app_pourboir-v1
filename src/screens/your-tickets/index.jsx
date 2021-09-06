import React from 'react';
import {
  Dimensions,
  ImageBackground,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import GlobalHeader from '../../components/GlobalHeader';
import i18n from '../../li8n';
import styles from './styles';
import { Colors } from '../../constants/Theme';
import NumberFormat from 'react-number-format';

const YourTickets = ({ navigation }) => {
  function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
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
            headingText={i18n.t('your_tickets')}
            fontSize={17}
            color={'black'}
            navigation={navigation}
            setting={false}
            backgroundColor={'transparent'}
            borderRadius={true}
          />
        </ImageBackground>
      </View>
      <View style={{ flex: 7 }}>
        <View
          style={{
            marginTop: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={styles.text}>{i18n.t('collect_tickets')}.</Text>
          <View style={styles.container_number}>
            <Text style={styles.monthTxt}>July</Text>
            <NumberFormat
              value={pad(3, 8, 2)}
              allowEmptyFormatting
              displayType={'text'}
              format="####-####"
              renderText={formattedValue => (
                <Text style={styles.lottery}>{formattedValue}</Text>
              )}
            />
            <NumberFormat
              value={pad(3, 8, 2)}
              allowEmptyFormatting
              displayType={'text'}
              format="####-####"
              renderText={formattedValue => (
                <Text style={styles.lottery}>{formattedValue}</Text>
              )}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default YourTickets;
