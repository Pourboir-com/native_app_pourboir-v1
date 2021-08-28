import React, { useState } from 'react';
import { Text, View } from 'react-native';
import i18n from '../../li8n';
import styles from '../../screens/braserri/styles';
import AddBtn from '../add-common-btn';
import CommonCard from '../comman-card';
import AddWaiterCookModal from '../modals/AddWaiterCookModal';

const Team = () => {
  const [addModal, setAddModal] = useState(false);
  const [modalType, setModalType] = useState();
  const [waiters, setWaiters] = useState([]);
  const [cooks, setCooks] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const openWaiterModal = () => {
    setAddModal(true);
    setModalType('waiter');
  };

  const openCookModal = () => {
    setAddModal(true);
    setModalType('cook');
  };

  return (
    <>
      {/* //waiters */}
      <View style={{ marginTop: 30 }}>
        <View style={styles.team_common_sec}>
          <View>
            <Text style={styles.mainHeading}>{i18n.t('waiters')}</Text>
          </View>
          <View style={styles.numberBox}>
            <Text style={styles.numberTxt}>{waiters.length}</Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          {waiters.length ? (
            waiters.map((v, i) => {
              return (
                <CommonCard
                  key={i}
                  waiter_name={v.waiter_name}
                  waiter_email={v.waiter_email}
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
            <Text style={styles.numberTxt}>{cooks.length}</Text>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          {cooks.length ? (
            cooks.map((v, i) => {
              return (
                <CommonCard
                  key={i}
                  cook_name={v.cook_name}
                  cook_email={v.cook_email}
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
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          setCooks={setCooks}
          setWaiters={setWaiters}
          waiters={waiters}
          cooks={cooks}
        />
      </View>
    </>
  );
};

export default Team;
