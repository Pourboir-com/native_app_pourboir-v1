import React, { useState, useContext } from 'react';
import { Text, View } from 'react-native';
import i18n from '../../li8n';
import styles from '../../screens/braserri/styles';
import AddBtn from '../add-common-btn';
import CommonCard from '../comman-card';
import AddWaiterCookModal from '../modals/AddWaiterCookModal';
import { useQuery, useMutation } from 'react-query';
import { STAFF, ADD_STAFF } from '../../queries';
import { reactQueryConfig } from '../../constants';
import Context from '../../contextApi/context';

const Team = () => {
  const { state } = useContext(Context);
  const [addModal, setAddModal] = useState(false);
  const [modalType, setModalType] = useState();
  const [waiters, setWaiters] = useState([]);
  const [cooks, setCooks] = useState([]);
  const [addStaff, { isLoading: addStaffLoading }] = useMutation(ADD_STAFF);

  const { data: waiterData, refetch: refetchWaiterData } = useQuery(
    ['STAFF', { type: ['waiter'], user_id: state.userDetails.user_id }],
    STAFF,
    {
      ...reactQueryConfig,
    },
  );

  const { data: cookData, refetch: refetchCookData } = useQuery(
    ['STAFF', { type: ['cook'], user_id: state.userDetails.user_id }],
    STAFF,
    {
      ...reactQueryConfig,
    },
  );
  console.log(waiterData);
  console.log(cookData);

  const openWaiterModal = () => {
    setAddModal(true);
    setModalType('waiter');
  };

  const openCookModal = () => {
    setAddModal(true);
    setModalType('cook');
  };

  const handleAddStaff = async (email, name) => {
    console.log({
      manager_id: state.userDetails.user_id || '',
      type: modalType,
      email: email || '',
      full_name: name || '',
    });
    await addStaff(
      {
        manager_id: state.userDetails.user_id || '',
        type: modalType,
        email: email || '',
        full_name: name || '',
      },
      {
        onSuccess: () => {
          console.log('success');
          if (modalType === 'waiter') {
            refetchWaiterData();
          } else if (modalType === 'cook') {
            refetchCookData();
          }
        },
        onError: (e) => {
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
            <Text style={styles.numberTxt}>{waiterData?.data?.length ? waiterData?.data?.length : 0}</Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          {waiterData?.data?.length ? (
            (waiterData?.data || [])?.map((v, i) => {
              return (
                <CommonCard
                  key={i}
                  waiter_name={v.full_name}
                  waiter_email={v.email}
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
            <Text style={styles.numberTxt}>{cookData?.data?.length ? cookData?.data?.length : 0}</Text>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          {cookData?.data?.length ? (
            (cookData?.data || []).map((v, i) => {
              return (
                <CommonCard
                  key={i}
                  cook_name={v.full_name}
                  cook_email={v.email}
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
