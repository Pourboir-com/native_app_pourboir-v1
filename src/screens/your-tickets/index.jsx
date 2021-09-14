import React, { useContext } from 'react';
import {
  Dimensions,
  ImageBackground,
  Text,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import GlobalHeader from '../../components/GlobalHeader';
import i18n from '../../li8n';
import styles from './styles';
import { GET_TICKETS } from '../../queries/tickets';
import Context from '../../contextApi/context';
import { useQuery } from 'react-query';
import { reactQueryConfig } from '../../constants';
import get from 'lodash/get';

const YourTickets = ({ navigation }) => {
  const { state } = useContext(Context);
  const {
    data: ticketData,
    isLoading: ticketDataLoading,
    refetch: ticketRefetch,
    isFetching: ticketsIsFetching,
  } = useQuery(
    ['GET_TICKETS', { user_id: state.userDetails.user_id }],
    GET_TICKETS,
    {
      ...reactQueryConfig,
      onSuccess: () => {
        // keys();
      },
      onError: e => {
        alert(e?.response?.data?.message);
      },
    },
  );

  function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
  return (
    <View style={styles.container}>
      <View>
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
      <View
        style={{
          marginTop: 40,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={styles.text}>{i18n.t('collect_tickets')}</Text>
      </View>
      {ticketDataLoading ? (
        <View style={{ marginTop: 50 }}>
          <ActivityIndicator size={50} color="#EBC11B" />
        </View>
      ) : (
        (Object.keys(ticketData?.data) || []).map(year => {
          return (
            <>
              <Text>{year}</Text>
              {(Object.keys(ticketData?.data[year]) || []).map(month => (
                <>
                  <Text>{month}</Text>
                  {get(ticketData, `data.${year}.${month}`, []).map(item => (
                    <>
                      <Text>{item.token}</Text>
                    </>
                  ))}
                </>
              ))}
            </>
          );
        })
      )}
    </View>
  );
};

export default YourTickets;
