import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Theme';
import styles from '../../screens/find-job/styles';

const CommonTabs = ({ tab1, tab2, job, temp, setJob, setTemp, diff }) => {
  return (
    <View>
      {/* <Text style={styles.inputLabel}>{i18n.t('Time')}</Text> */}
      <View style={styles.chooseButtons_container}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.time_opt,
            job === 'yes' || temp === 'full'
              ? {
                  backgroundColor: Colors.yellow,
                  borderTopLeftRadius: 7,
                  borderBottomLeftRadius: 7,
                }
              : null,
          ]}
          onPress={() =>
            diff === true
              ? setJob('yes')
              : diff !== true
              ? setTemp('full')
              : null
          }
          value={job}
        >
          <Text style={styles.timeTxt}>{tab1}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.time_opt,
            { borderLeftWidth: 1 },
            job === 'No' || temp === 'half'
              ? {
                  backgroundColor: Colors.yellow,
                  borderTopRightRadius: 7,
                  borderBottomRightRadius: 7,
                }
              : null,
          ]}
          onPress={() =>
            diff === true
              ? setJob('No')
              : diff !== true
              ? setTemp('half')
              : null
          }
          value={job || temp}
        >
          <Text style={styles.timeTxt}>{tab2}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommonTabs;
