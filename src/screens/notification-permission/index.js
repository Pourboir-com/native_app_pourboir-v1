import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { Colors } from '../../constants/Theme';
import i18n from '../../li8n';
import notification from '../../assets/images/notification.png';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { useMutation } from 'react-query';
import { SEND_PUSH_TOKEN } from '../../queries';
import { getAsyncStorageValues } from '../../constants';
import * as Localization from 'expo-localization';

const NotificationPermission = ({ navigation }) => {
  const [sendNotificationToken] = useMutation(SEND_PUSH_TOKEN);
  const notificationListener = useRef();
  const responseListener = useRef();

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
        const { userInfo = {} } = await getAsyncStorageValues();
        if (userInfo?.user_id) {
          navigation.replace('Home', { crossIcon: false, ad: true });
        } else {
          navigation.replace('socialLogin');
        }
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        sound: true,
      });
    }
    return token;
  }
  const handleNotificationPermission = () => {
    registerForPushNotificationsAsync().then(async token => {
      const { userInfo = {} } = await getAsyncStorageValues();
      const { locale } = await Localization.getLocalizationAsync();
      if (userInfo?.user_id) {
        await sendNotificationToken({
          id: userInfo?.user_id || '',
          expo_notification_token: token || '',
          lang: locale || '',
        });
        notificationListener.current = Notifications.addNotificationReceivedListener(
          notification => {
            navigation.navigate('WaiterProfile', {
              crossIcon: true,
            });
          },
        );
        responseListener.current = Notifications.addNotificationResponseReceivedListener(
          response => {
            navigation.navigate('WaiterProfile', {
              crossIcon: true,
            });
          },
        );
        navigation.replace('Home', { crossIcon: false, ad: true });
      } else {
        navigation.replace('socialLogin');
      }
    });
  };

  return (
    <View style={styles.container}>
      <Image source={notification} />
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
        {i18n.t('notification')}
      </Text>
      <TouchableOpacity
        style={styles.btnStyle}
        onPress={handleNotificationPermission}
      >
        <Text style={styles.txtColor}>{i18n.t('carry_on')}</Text>
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
