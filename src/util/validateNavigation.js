export const validateNavigationIOS = (
  navigation,
  tracking,
  checkLocation,
  notification,
  userInfo,
) => {
  if (tracking && checkLocation && notification && userInfo.user_id) {
    navigation.replace('Home', { crossIcon: false, ad: true });
  } else if (tracking && checkLocation && notification && !userInfo.user_id) {
    navigation.replace('socialLogin');
  } else if (!tracking && !checkLocation && !notification) {
    navigation.replace('NoTracking', {
      checkLocation,
      notification,
    });
  } else if (tracking && !checkLocation && !notification) {
    navigation.replace('NoLocation', { notification });
  } else if (tracking && checkLocation && !notification) {
    navigation.replace('Notification');
  } else if (!tracking && checkLocation && notification) {
    navigation.replace('NoTracking');
  } else if (tracking && !checkLocation && notification) {
    navigation.replace('NoLocation');
  } else if (!tracking && checkLocation && !notification) {
    navigation.replace('NoTracking', {
      notification,
    });
  } else if (!tracking && !checkLocation && notification) {
    navigation.replace('NoTracking', {
      checkLocation,
    });
  }
};

export const validateNavigationAndroid = (navigation, checkLocation, userInfo) => {
  if (!checkLocation) {
    navigation.replace('NoLocation');
  } else if (checkLocation && userInfo.user_id) {
    navigation.replace('Home', { crossIcon: false, ad: true });
  } else if (checkLocation && !userInfo.user_id) {
    navigation.replace('socialLogin');
  }
};
