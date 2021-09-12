import React, { useContext } from 'react';
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
import { GET_TICKETS } from '../../queries/tickets';
import Context from '../../contextApi/context';
import { useQuery } from 'react-query';
import { reactQueryConfig } from '../../constants';

const YourTickets = ({ navigation }) => {
  const { state } = useContext(Context);
  // console.log(state.userDetails, ' state')
  const {
    data: ticketData,
    isLoading: ticketDataLoading,
    refetch: ticketRefetch,
  } = useQuery(
    ['GET_TICKETS', { user_id: state.userDetails.user_id }],
    GET_TICKETS,
    {
      ...reactQueryConfig,
      onSuccess: e => {
        alert('Successfull');
        console.log(e);
      },
      onError: e => {
        alert(e?.response?.data?.message);
      },
    },
  );
  console.log(ticketData, ' tickets');

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
            <Text style={styles.lottery}>{pad(3, 8, '0').replace(/(\d{4})(\d{4})/, '$1-$2')}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default YourTickets;
