import React, { useCallback, useState } from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native-gesture-handler';
import i18n from '../../li8n';
import RangeSlider from 'rn-range-slider';
import RatingStar from '../../components/RatingComponent';
import { Radio } from 'galio-framework';

const FilterModal = ({ filterModal, toggleFilter, setFilterModal }) => {
  const [avail, setAvail] = useState('');
  const [low, setLow] = useState();
  const [high, setHigh] = useState();
  const [rating, setRating] = useState();
  const obj = [1, 2, 3, 4, 5];
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
  }, []);
console.log(avail)

  const Rail = () => {
    return <View style={styles.root_r} />;
  };
  const RailSelected = () => {
    return <View style={styles.root_rr} />;
  };

  const Thumb = () => {
    return <View style={styles.root_t} />;
  };

  return (
    <Modal  onBackdropPress={() => setFilterModal(false)} isVisible={filterModal}>
      <View
        style={{
          backgroundColor: '#fff',
          position: 'relative',
          borderRadius: 16,
          height: 'auto',
        }}
      >
        <ScrollView>
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={styles.filterTxt}>{i18n.t('filter')}s</Text>
          </View>
          <View style={{ marginTop: 20, marginHorizontal: 25 }}>
            <View>
              <Text style={styles.postsLabel}>{i18n.t('post')}</Text>
              <TextInput
                placeholder={i18n.t('position_list')}
                placeholderTextColor="#707070"
                style={styles.postsInput}
              />
            </View>
            <View style={{ marginVertical: 22 }}>
              <Text style={styles.postsLabel}>{i18n.t('availability')}</Text>
              <View style={{ marginLeft:0 }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{marginBottom:8}}>
                  <Radio label="Full Time" onChange={() => setAvail("Full Time")}  color={"#FCDF6F"} labelStyle={{ color: '#1E272E',fontSize:13, fontFamily:'ProximaNovaBold', paddingTop:1  }}  />
                  </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                <View>
                  <Radio onChange={() => setAvail("Part Time")} label="Part Time" color={"#FCDF6F"} labelStyle={{ color: '#1E272E', fontSize:13,  fontFamily:'ProximaNovaBold', paddingTop:1 }}  />
                  </View>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.postsLabel}>Experience</Text>
              <View style={{ marginHorizontal: 4, marginTop: 12 }}>
                <RangeSlider
                  // style={styles.slider}
                  min={0}
                  max={15}
                  step={1}
                  floatingLabel
                  renderThumb={renderThumb}
                  renderRail={renderRail}
                  renderRailSelected={renderRailSelected}
                  onValueChanged={handleValueChange}
                />
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginTop: 10,
                  marginHorizontal: 10,
                }}
              >
                <Text style={styles.fontYears}>
                  {low} <Text style={styles.ansFont}>{i18n.t('years')} </Text>
                </Text>
                <Text style={styles.fontYears}>
                  {high} <Text style={styles.ansFont}>{i18n.t('years')} </Text>
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.postsLabel}>{i18n.t('eval')}</Text>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 12,
                    paddingLeft: 2,
                  }}
                >
                  {obj.map((v, i) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          v === 1
                            ? setRating(1)
                            : v === 2
                            ? setRating(2)
                            : v === 3
                            ? setRating(3)
                            : v === 4
                            ? setRating(4)
                            : v === 5
                            ? setRating(5)
                            : null
                        }
                        style={{ marginRight: 3 }}
                        key={i}
                      >
                        <RatingStar
                          starSize={17}
                          type={
                            v <= rating
                              ? 'filled'
                              : v === rating + 0.5
                              ? 'half'
                              : 'empty'
                          }
                          notRatedStarColor="#f1f1f1"
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 40,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginBottom: 20,
              }}
            >
              <TouchableOpacity
                onPress={toggleFilter}
                activeOpacity={0.6}
                style={styles.btnGray}
              >
                <Text style={styles.btnTxt}>{i18n.t('return')}</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} style={styles.btnYellow}>
                <Text style={styles.btnTxt}>{i18n.t('filter')}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={toggleFilter} style={styles.cancelBtn}>
            <Image source={require('../../assets/images/cross.png')} />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default FilterModal;
