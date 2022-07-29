import React, { useContext, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import GlobalHeader from '../../components/GlobalHeader';
import styles from './styles';
import { GET_BALANCE, GET_USER_DETAILS } from '../../queries';
import Context from '../../contextApi/context';
import { useQuery } from 'react-query';
import { reactQueryConfig } from '../../constants';
import CommonButton from '../../components/common-button';
import CommonModal from '../../components/modals/HelpUsImproveModal';
const balanceImg = require('../../assets/images/balance.png');
const balanceBg = require('../../assets/images/modalBG.png');

const Balance = ({ navigation }) => {
  const { state, localizationContext } = useContext(Context);
  const { data: balanceData } = useQuery(
    ['GET_BALANCE', { user_id: state.userDetails.user_id }],
    GET_BALANCE,
    {
      ...reactQueryConfig,
      onError: e => {
        alert(e?.response?.data?.message);
      },
    },
  );
  const { data: userData, isLoading: userDataLoading } = useQuery(
    ['GET_USER_DETAILS', { user_id: state.userDetails.user_id }],
    GET_USER_DETAILS,
    {
      ...reactQueryConfig,
      onError: e => {
        alert(e?.response?.data?.message);
      },
    },
  );

  const totalBalance = data => {
    return (
      data?.checkIn +
      data?.createAnAccount +
      data?.leaveAReview +
      data?.tip +
      data?.restaurantReview
    );
  };
  const [isTopUp, setIsTopUp] = useState(false);

  const historyDetails = item => {
    if (item.transaction_type === 'leaveAReview') {
      return (
        <>
          <Text style={styles.text}>
            {localizationContext.t('review_balance')}{' '}
            {item?.place_id?.name ? item?.place_id?.name : 'restaurant'}
          </Text>
          <Text style={styles.amount}>
            {item.transaction_amount > 0 && '+'}
            {item.transaction_amount}
          </Text>
        </>
      );
    } else if (item.transaction_type === 'tip') {
      return (
        <>
          <Text style={styles.text}>
            {localizationContext.t('tip_balance')}{' '}
            {item?.waiter_id?.full_name &&
              `${localizationContext.t('to')} ${item?.waiter_id?.full_name}`}
          </Text>
          <Text style={styles.amount}>
            {item.transaction_amount > 0 && '+'}
            {item.transaction_amount}
          </Text>
        </>
      );
    } else if (item.transaction_type === 'checkIn') {
      return (
        <>
          <Text style={styles.text}>
            {localizationContext.t('checkin_balance')}{' '}
            {item?.place_id?.name ? item?.place_id?.name : 'restaurant'}
          </Text>
          <Text style={styles.amount}>
            {item.transaction_amount > 0 && '+'}
            {item.transaction_amount}
          </Text>
        </>
      );
    } else if (item.transaction_type === 'restaurantReview') {
      return (
        <>
          <Text style={styles.text}>
            {localizationContext.t('review_balance')}{' '}
            {item?.place_id?.name ? item?.place_id?.name : 'restaurant'}
          </Text>
          <Text style={styles.amount}>
            {item.transaction_amount > 0 && '+'}
            {item.transaction_amount}
          </Text>
        </>
      );
    }
  };

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
            headingText={localizationContext.t('nav_head_balance')}
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
          marginVertical: 40,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={[styles.text, { width: '70%' }]}>
          {localizationContext.t('balance_description')}
        </Text>
        <Text style={styles.heading}>
          {localizationContext.t('balance_heading')}
        </Text>
        {userDataLoading ? (
          <View
            style={[
              styles.balance,
              { height: 100, width: 160, justifyContent: 'center' },
            ]}
          >
            <ActivityIndicator color="#EBC11B" />
          </View>
        ) : (
          <Text style={styles.balance}>
            {totalBalance(userData?.data?.balance) || 0}
          </Text>
        )}
        <Text style={{ marginTop: 26 }}>
          {balanceData?.data?.length ? (
            <Text style={styles.heading}>
              {localizationContext.t('history_heading')}
            </Text>
          ) : null}
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={[{ alignItems: 'center', paddingBottom: '22%' }]}
      >
        {(balanceData?.data || []).map((item, index) => (
          <View key={index} style={styles.flex}>
            {historyDetails(item)}
          </View>
        ))}
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          backgroundColor: '#f9f9f9',
        }}
      >
        <View style={{ paddingHorizontal: '5%', marginBottom: '5%' }}>
          <CommonButton
            disable={false}
            opacity={0.8}
            title={localizationContext.t('top_up')}
            onPress={() => setIsTopUp(true)}
          />
        </View>
      </View>
      {isTopUp && (
        <CommonModal
          isVisible={isTopUp}
          handleModalClose={() => setIsTopUp(false)}
          image={balanceImg}
          subHeadingText={localizationContext.t('patient_description')}
          heading={localizationContext.t('patient')}
          bgImage={balanceBg}
        />
      )}
    </View>
  );
};

export default Balance;
