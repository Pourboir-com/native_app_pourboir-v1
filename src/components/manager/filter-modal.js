import React, { useCallback, useState } from 'react';
import { Image, Text, View, TouchableOpacity, TextInput } from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import i18n from '../../li8n';
import RangeSlider from 'rn-range-slider';

const FilterModal = ({ filterModal, toggleFilter }) => {
  const [checked, setChecked] = useState();
  const [low, setLow] = useState();
  const [high, setHigh] = useState();
  const ratingCompleted = rating => {
    console.log(rating);
  };

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
  }, []);

  const Label = ({ text, ...restProps }) => {
    return (
      <View style={styles.root} {...restProps}>
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  };

  const Notch = props => {
    return <View style={styles.root_l} {...props} />;
  };
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
    <Modal style={{ height: '0%' }} isVisible={filterModal}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#fff',
          position: 'relative',
          borderRadius: 16,
        }}
      >
        <TouchableOpacity onPress={toggleFilter} style={styles.cancelBtn}>
          <Image source={require('../../assets/images/cross.png')} />
        </TouchableOpacity>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={styles.filterTxt}>{i18n.t('filter')}s</Text>
        </View>
        <View style={{ marginTop: 20, marginHorizontal: 25 }}>
          <View>
            <Text style={styles.postsLabel}>Posts</Text>
            <TextInput
              placeholder={i18n.t('position_list')}
              style={styles.postsInput}
            />
          </View>
          <View style={{ marginVertical: 22 }}>
            <Text style={styles.postsLabel}>{i18n.t('availability')}</Text>
            <View style={{ marginLeft: -5 }}>
              <View style={{ flexDirection: 'row' }}>
                <RadioButton
                  value="first"
                  color="#FDDF6F"
                  uncheckedColor="#FDDF6F"
                  status={checked === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('first')}
                />
                <Text style={styles.radioBtnTxt}>Full Time </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <RadioButton
                  value="second"
                  uncheckedColor="#FDDF6F"
                  color="#FDDF6F"
                  status={checked === 'second' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('second')}
                />
                <Text style={styles.radioBtnTxt}>Part Time</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.postsLabel}>Experience</Text>
            <View>
              <RangeSlider
                style={styles.slider}
                min={0}
                max={15}
                step={1}
                floatingLabel
                renderThumb={renderThumb}
                renderRail={renderRail}
                renderRailSelected={renderRailSelected}
                renderLabel={renderLabel}
                renderNotch={renderNotch}
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
              <Rating
                imageSize={18}
                style={{ paddingTop: 14, paddingRight: 180 }}
                ratingCount={5}
                readonly
                startingValue={3}
                onFinishRating={ratingCompleted}
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 40,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <TouchableOpacity activeOpacity={0.6} style={styles.btnGray}>
              <Text style={styles.btnTxt}>{i18n.t('return')}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} style={styles.btnYellow}>
              <Text style={styles.btnTxt}>{i18n.t('filter')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default FilterModal;
