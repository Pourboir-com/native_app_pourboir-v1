import React, { useState, useContext } from 'react';
import { Text, View } from 'react-native';
import i18n from '../../li8n';
import styles from '../../screens/braserri/styles';
import AddBtn from '../add-common-btn';
import CommonCard from '../comman-card';
import AddWaiterCookModal from '../modals/AddWaiterCookModal';
import { useQuery, useMutation } from 'react-query';
import { ADDING_WAITERS, GET_WAITERS } from '../../queries';
import { reactQueryConfig } from '../../constants';
import Context from '../../contextApi/context';

const Team = ({ restaurant_id, place_id, refetchWaiters }) => {
  const { state } = useContext(Context);
  const [addModal, setAddModal] = useState(false);
  const [modalType, setModalType] = useState();
  const [waiters, setWaiters] = useState([]);
  const [cooks, setCooks] = useState([]);
  const [addStaff, { isLoading: addStaffLoading }] = useMutation(
    ADDING_WAITERS,
  );

  const { data: waiterData, refetch: refetchWaiterData } = useQuery(
    [
      'GET_WAITERS',
      {
        type: 'waiter',
        restaurant_id: place_id,
      },
    ],
    GET_WAITERS,
    {
      ...reactQueryConfig,
    },
  );

  const { data: cookData, refetch: refetchCookData } = useQuery(
    [
      'GET_WAITERS',
      {
        type: 'cook',
        restaurant_id: place_id,
      },
    ],
    GET_WAITERS,
    {
      ...reactQueryConfig,
    },
  );

  const openWaiterModal = () => {
    setAddModal(true);
    setModalType('waiter');
  };

  const openCookModal = () => {
    setAddModal(true);
    setModalType('cook');
  };

  const handleAddStaff = async (email, name) => {
    await addStaff(
      {
        created_by: state.userDetails.user_id || '',
        type: modalType,
        email: email || '',
        full_name: name || '',
        restaurant: { place_id },
        status: 'active',
      },
      {
        onSuccess: () => {
          if (modalType === 'waiter') {
            refetchWaiterData();
            refetchWaiters();
          } else if (modalType === 'cook') {
            refetchCookData();
            refetchWaiters();
          }
        },
        onError: e => {
          alert(e.response?.data?.message);
        },
      },
    );
  };

  return (
    <View>
      {/* //waiters */}
      <View style={{ marginTop: 30 }}>
        <View style={styles.team_common_sec}>
          <View>
            <Text style={styles.mainHeading}>{i18n.t('waiters')}</Text>
          </View>
          <View style={styles.numberBox}>
            <Text style={styles.numberTxt}>
              {waiterData?.data?.length ? waiterData?.data?.length : 0}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          {waiterData?.data?.length ? (
            (waiterData?.data || [])?.map((v, i) => {
              return (
                <CommonCard
                  key={i}
                  waiter_name={v?.user_id?.full_name || v.full_name}
                  waiter_email={v.email}
                  picture={v?.user_id?.picture}
                />
              );
            })
          ) : (
            <View>
              <Text
                style={
                  (styles.numberTxt,
                  { ...styles.numberTxt, fontSize: 15, marginTop: 10 })
                }
              >
                {i18n.t('no_waiter')}{' '}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 18,
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AddBtn title={i18n.t('add_your_server')} onPress={openWaiterModal} />
      </View>

      {/* // Cooks */}
      <View style={{ marginTop: 30 }}>
        <View style={styles.team_common_sec}>
          <View>
            <Text style={styles.mainHeading}>{i18n.t('cook')}</Text>
          </View>
          <View style={styles.numberBox}>
            <Text style={styles.numberTxt}>
              {cookData?.data?.length ? cookData?.data?.length : 0}
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          {cookData?.data?.length ? (
            (cookData?.data || []).map((v, i) => {
              return (
                <CommonCard
                  key={i}
                  cook_name={v?.user_id?.full_name || v.full_name}
                  cook_email={v.email}
                  picture={v?.user_id?.picture}
                />
              );
            })
          ) : (
            <View>
              <Text
                style={
                  (styles.numberTxt,
                  { ...styles.numberTxt, fontSize: 15, marginTop: 10 })
                }
              >
                {i18n.t('no_cook')}{' '}
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            marginHorizontal: 18,
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AddBtn title={i18n.t('add_cooks')} onPress={openCookModal} />
        </View>
        <AddWaiterCookModal
          setAddModal={setAddModal}
          addModal={addModal}
          modalType={modalType}
          setCooks={setCooks}
          setWaiters={setWaiters}
          waiters={waiters}
          cooks={cooks}
          handleAddStaff={handleAddStaff}
        />
      </View>
    </View>
  );
};

export default Team;
