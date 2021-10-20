import React, { useRef, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { Colors } from '../../constants/Theme';
import notification from '../../assets/images/notification.png';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { useMutation } from 'react-query';
import { SEND_PUSH_TOKEN } from '../../queries';
import { getAsyncStorageValues } from '../../constants';
import Context from '../../contextApi/context';

const NotificationPermission = ({ navigation }) => {
  const [sendNotificationToken] = useMutation(SEND_PUSH_TOKEN);
  const notificationListener = useRef();
  const responseListener = useRef();
  const { localizationContext } = useContext(Context);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const {
        status: existingStatus,
      } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        return;
      } else {
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            sound: true,
          });
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
      }
    } else {
      const { userInfo = {} } = await getAsyncStorageValues();
      if (userInfo?.user_id) {
        navigation.replace('Home', { crossIcon: false, ad: true });
      } else {
        navigation.replace('socialLogin');
      }
    }
    return token;
  }
  const handleNotificationPermission = async () => {
    const { userInfo = {}, language } = await getAsyncStorageValues();
    registerForPushNotificationsAsync()
      .then(async token => {
        if (userInfo?.user_id) {
          await sendNotificationToken({
            id: userInfo?.user_id || '',
            expo_notification_token: token || '',
            lang: language || '',
          });
          notificationListener.current = Notifications.addNotificationReceivedListener(
            notification => {
              // navigation.navigate('WaiterProfile', {
              //   crossIcon: true,
              // });
            },
          );
          responseListener.current = Notifications.addNotificationResponseReceivedListener(
            response => {
              // navigation.navigate('WaiterProfile', {
              //   crossIcon: true,
              // });
            },
          );
          navigation.replace('Home', { crossIcon: false, ad: true });
        } else {
          navigation.replace('socialLogin');
        }
      })
      .catch(() => {
        if (userInfo?.user_id) {
          navigation.replace('Home', { crossIcon: false, ad: true });
        } else {
          navigation.replace('socialLogin');
        }
      });
  };

  return (
    <View style={styles.container}>
      <Image style={{ width: 220, height: 220 }} source={notification} />
      <Text
        style={{
          fontSize: 18,
          color: Colors.fontDark,
          marginTop: 30,
          marginHorizontal: 30,
          textAlign: 'center',
          fontFamily: 'ProximaNovaSemiBold',
        }}
      >
        {localizationContext.t('notification')}
      </Text>
      <TouchableOpacity
        style={styles.btnStyle}
        onPress={handleNotificationPermission}
      >
        <Text style={styles.txtColor}>{localizationContext.t('carry_on')}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default NotificationPermission;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStyle: {
    backgroundColor: Colors.yellow,
    width: '85%',
    position: 'absolute',
    bottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
  },
  txtColor: {
    color: Colors.fontLight,
    fontSize: 16,
  },
});
