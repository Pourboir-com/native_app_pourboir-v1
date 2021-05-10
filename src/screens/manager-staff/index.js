import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import StaffCard from '../../components/manager/staff-card';
import StaffModal from '../../components/manager/staff-modal';
import FilterModal from '../../components/manager/filter-modal';
import i18n from '../../li8n';
import { useQuery } from 'react-query';
import { RECRUITMENT_FORM } from '../../queries';
import { reactQueryConfig } from '../../constants';
import { ReviewsSkeleton } from '../../components/skeleton';

const ManagerStaff = () => {
  const [value, setValue] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [formId, setFormId] = useState('');
  //Filter States
  const [avail, setAvail] = useState([]);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(15);
  const [rating, setRating] = useState(1);
  const [position, setPosition] = useState();
  const [filterClicked, setFilterClicked] = useState();

  let filterSearch = () => {
    return {
      rating: rating || '',
      experience_greater: high || '',
      experience_less: low || '',
      time: avail?.length ? [avail] : [],
      position: position || '',
      search: value,
      rating_needed: true,
    };
  };
  console.log(filterModal ? false : true);
  const {
    data: waitersFormData,
    isLoading: waitersFormLoading,
    refetch: refetchFormWaiters,
    isFetching: waitersFormIsFetching,
  } = useQuery(['RECRUITMENT_FORM', filterSearch()], RECRUITMENT_FORM, {
    ...reactQueryConfig,
    enabled: filterModal ? false : true,
    onError: e => {
      alert(e?.response?.data?.message);
    },
  });

  let FilterStates = {
    avail,
    setAvail,
    low,
    setLow,
    high,
    setHigh,
    rating,
    setRating,
    position,
    setPosition,
    setFilterClicked,
    refetchFormWaiters,
  };

  const toggleModal = id => {
    setFormId(id);
    setModalVisible(!isModalVisible);
  };
  const toggleFilter = () => {
    setFilterModal(!filterModal);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F9F9F9' }}>
      <View style={{ paddingHorizontal: 25, marginTop: 80 }}>
        <View style={styles.first_section}>
          <View style={styles.child_one}>
            <Text style={styles.first_section_bold}>
              {i18n.t('recruit_estab')}
            </Text>
          </View>
          <View style={styles.child_two}>
            <View style={styles.yellow_box}>
              <Text style={styles.numbers_staff}>
                {waitersFormData?.data?.length || '0'}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.second_section}>
          <View style={styles.main}>
            <View style={styles.searchBar}>
              <View style={{ justifyContent: 'center', paddingRight: 20 }}>
                <Feather name="search" size={25} color="#FCDF6F" />
              </View>
              <View style={{ width: '77%' }}>
                <TextInput
                  placeholder={i18n.t('search')}
                  value={value}
                  placeholderTextColor="#707070"
                  onChangeText={e => setValue(e)}
                  style={{ width: '100%', height: 40 }}
                />
              </View>
            </View>
            <View style={styles.filter}>
              <TouchableOpacity onPress={toggleFilter} activeOpacity={0.6}>
                <Image
                  source={require('../../assets/images/Filter.png')}
                  style={{ width: 40, height: 40, resizeMode: 'contain' }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {waitersFormLoading ? (
        <View style={{ paddingHorizontal: 25, marginTop: 25 }}>
          <ReviewsSkeleton />
          <ReviewsSkeleton />
        </View>
      ) : (
        <>
          {waitersFormData?.data?.length ? (
            <FlatList
              style={{ paddingHorizontal: 25, marginTop: 25 }}
              refreshControl={
                <RefreshControl
                  //refresh control used for the Pull to Refresh
                  refreshing={waitersFormIsFetching}
                  // color="#F9F9F9"
                  // tintColor="#F9F9F9"
                  onRefresh={refetchFormWaiters}
                />
              }
              data={waitersFormData?.data || []}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={itemData => (
                <StaffCard
                  data={itemData?.item}
                  toggleModal={toggleModal}
                  isModalVisible={isModalVisible}
                  setModalVisible={setModalVisible}
                />
              )}
            />
          ) : (
            <Text
              style={{
                fontFamily: 'ProximaNovaSemiBold',
                fontSize: 16,
                paddingHorizontal: 25,
                marginTop: 25,
              }}
            >
              {i18n.t('no_job_found')}
            </Text>
          )}
        </>
      )}
      {isModalVisible && (
        <StaffModal
          formId={formId || ''}
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
        />
      )}
      {filterModal && (
        <FilterModal
          toggleFilter={toggleFilter}
          filterModal={filterModal}
          setFilterModal={setFilterModal}
          FilterStates={FilterStates}
        />
      )}
    </View>
  );
};

export default ManagerStaff;
