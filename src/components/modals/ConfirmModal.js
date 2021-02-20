import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  // Keyboard,
  TextInput,
  Dimensions,
} from 'react-native';
import { Overlay } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../constants/Theme';
import i18n from '../../li8n';
const imgWaiter = require('../../assets/images/waiter2.png');
const imgBg = require('../../assets/images/Group7.png');

const ConfirmationModal = ({
  isVisible,
  handleModalClose,
  postData,
  loading,
}) => {
  const scrollRef = React.useRef(null);
  const [placeholderCompanyName, setplaceholderCompanyName] = useState(
    i18n.t('nom_de'),
  );
  const [placeholderSiren, setplaceholderSiren] = useState(i18n.t('siren'));
  const [placeholderBossName, setplaceholderBossName] = useState(
    i18n.t('nom_de_boss'),
  );
  const [placeholderBossContact, setplaceholderBossContact] = useState(
    i18n.t('contact_du_boss'),
  );
  const [placeholderWaiterName, setPlaceholderWaiterName] = React.useState(
    i18n.t('name_of_your_server'),
  );
  const [CompanyName, setCompanyName] = useState();
  const [Siren, setSiren] = useState();
  const [bossName, setBossName] = useState();
  const [bossContact, setBossContact] = useState();
  const [waiterName, setwaiterName] = useState();

  const ValidateDisable = () => {
    if (loading) {
      return true;
    } else if (!isVisible.addWaiterModalVisible) {
      if (CompanyName && Siren && bossName && bossContact) {
        return false;
      } else {
        return true;
      }
    } else if (isVisible.addWaiterModalVisible) {
      if (waiterName && CompanyName && Siren && bossName && bossContact) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };
  const ValidateButtonColor = () => {
    if (!isVisible.addWaiterModalVisible) {
      if (CompanyName && Siren && bossName && bossContact) {
        return {
          backgroundColor: Colors.yellow,
        };
      }
    } else if (isVisible.addWaiterModalVisible) {
      if (waiterName && CompanyName && Siren && bossName && bossContact) {
        return {
          backgroundColor: Colors.yellow,
        };
      }
    } else {
      return {};
    }
  };

  const HandlePostData = async () => {
    if (!isVisible.addWaiterModalVisible) {
      await postData(CompanyName, Siren, bossName, bossContact);
      resetPlaceholder();
    }
    if (isVisible.addWaiterModalVisible) {
      await postData(waiterName, CompanyName, Siren, bossName, bossContact);
      resetPlaceholder();
    }
  };

  // React.useEffect(() => {
  //   if (scrollRef.current) {
  //     const node = scrollRef.current;
  //     if (node) {
  //       const keyboardDidShowListener = Keyboard.addListener(
  //         'keyboardDidShow',
  //         () => {
  //           // setTimeout(() => {
  //           node.scrollToEnd({ animated: true });
  //           // }, 100);
  //         },
  //       );
  //       return () => {
  //         keyboardDidShowListener.remove();
  //       };
  //     }
  //   }
  // }, []);

  // const ScrollToEnd = () => {
  //   if (scrollRef.current) {
  //     const node = scrollRef.current;
  //     if (node) {
  //       node.scrollToEnd({ animated: true });
  //     }
  //   }
  // };

  const resetPlaceholder = () => {
    setCompanyName('');
    setBossName('');
    setBossContact('');
    setSiren('');
    if (Platform.OS != 'ios') {
      setplaceholderCompanyName(i18n.t('nom_de'));
      setplaceholderSiren(i18n.t('siren'));
      setplaceholderBossName(i18n.t('nom_de_boss'));
      setplaceholderBossContact(i18n.t('contact_du_boss'));
    }
  };

  return (
    <Overlay
      overlayStyle={[styles.container]}
      isVisible={
        isVisible.confirmModalVisible || isVisible.addWaiterModalVisible
      }
      onBackdropPress={() => {
        handleModalClose();
        resetPlaceholder();
      }}
    >
      <ScrollView
        // ref={scrollRef}
        keyboardShouldPersistTaps={'handled'}
        bounces={false}
        style={{
          width: '100%',
        }}
      >
        <KeyboardAvoidingView
          keyboardVerticalOffset={
            Dimensions.get('window').height <= 645 ? 10 : 25
          }
          behavior="position"
          enabled
        >
          <View style={{ alignItems: 'center' }}>
            <ImageBackground
              style={styles.imgBgStyle}
              source={imgBg}
              resizeMode="stretch"
            >
              <View style={styles.viewImg}>
                <Image
                  source={imgWaiter}
                  style={styles.imgStyle}
                  resizeMode="contain"
                />
                <TouchableOpacity
                  onPress={() => {
                    handleModalClose();
                    resetPlaceholder();
                  }}
                  style={{
                    alignSelf: 'flex-end',
                    marginTop: -160,
                    marginRight: 15,
                  }}
                >
                  <AntDesign name="close" size={29} color="#485460" />
                </TouchableOpacity>
              </View>
            </ImageBackground>
            <Text style={[styles.txtName, { fontFamily: 'ProximaNovaBold' }]}>
              {i18n.t('please_fill')}
            </Text>
            {isVisible.addWaiterModalVisible && (
              <TextInput
                selectionColor={Colors.yellow}
                value={waiterName}
                onChangeText={text => {
                  setwaiterName(text);
                  // ScrollToEnd();
                }}
                placeholder={placeholderWaiterName}
                onFocus={() => {
                  if (Platform.OS != 'ios') {
                    setPlaceholderWaiterName('');
                  }
                  // ScrollToEnd();
                }}
                onBlur={() => {
                  if (!CompanyName && Platform.OS != 'ios') {
                    setPlaceholderWaiterName(i18n.t('name_of_your_server'));
                  }
                }}
                style={[
                  styles.inputStyle,
                  { fontFamily: 'ProximaNova', textAlign: 'center' },
                ]}
              />
            )}
            <TextInput
              selectionColor={Colors.yellow}
              value={CompanyName}
              onChangeText={text => {
                setCompanyName(text);
                // ScrollToEnd();
              }}
              placeholder={placeholderCompanyName}
              onFocus={() => {
                if (Platform.OS != 'ios') {
                  setplaceholderCompanyName('');
                }
                // ScrollToEnd();
              }}
              onBlur={() => {
                if (!CompanyName && Platform.OS != 'ios') {
                  setplaceholderCompanyName(i18n.t('nom_de'));
                }
              }}
              style={[
                styles.inputStyle,
                { fontFamily: 'ProximaNova', textAlign: 'center' },
              ]}
            />
            <TextInput
              selectionColor={Colors.yellow}
              keyboardType="number-pad"
              placeholder={placeholderSiren}
              onFocus={() => {
                if (Platform.OS != 'ios') {
                  setplaceholderSiren('');
                }
                // ScrollToEnd();
              }}
              onBlur={() => {
                if (!Siren && Platform.OS != 'ios') {
                  setplaceholderSiren(i18n.t('siren'));
                }
              }}
              value={Siren}
              onChangeText={e => {
                setSiren(e);
                // ScrollToEnd();
              }}
              style={[
                styles.inputStyle,
                { fontFamily: 'ProximaNova', textAlign: 'center' },
              ]}
            />
            <TextInput
              selectionColor={Colors.yellow}
              placeholder={placeholderBossName}
              onFocus={() => {
                if (Platform.OS != 'ios') {
                  setplaceholderBossName('');
                }
                // ScrollToEnd();
              }}
              onBlur={() => {
                if (!bossName && Platform.OS != 'ios') {
                  setplaceholderBossName(i18n.t('nom_de_boss'));
                }
              }}
              value={bossName}
              onChangeText={e => {
                setBossName(e);
                // ScrollToEnd();
              }}
              style={[
                styles.inputStyle,
                { fontFamily: 'ProximaNova', textAlign: 'center' },
              ]}
            />
            <TextInput
              onFocus={() => {
                if (Platform.OS != 'ios') {
                  setplaceholderBossContact('');
                }
                // ScrollToEnd();
              }}
              selectionColor={Colors.yellow}
              keyboardType="number-pad"
              placeholder={placeholderBossContact}
              onBlur={() => {
                // setonHandleFocus(false);
                if (!bossContact && Platform.OS != 'ios') {
                  setplaceholderBossContact(i18n.t('contact_du_boss'));
                }
              }}
              value={bossContact}
              onChangeText={e => {
                setBossContact(e);
                // ScrollToEnd();
              }}
              style={[
                styles.inputStyle,
                { fontFamily: 'ProximaNova', textAlign: 'center' },
              ]}
            />

            <TouchableOpacity
              disabled={ValidateDisable()}
              onPress={HandlePostData}
              style={[styles.btnConfrm, ValidateButtonColor()]}
            >
              {loading ? (
                <ActivityIndicator size={30} color="#000" />
              ) : (
                <Text
                  style={[styles.txtBtnConfrm, { fontFamily: 'ProximaNova' }]}
                >
                  {i18n.t('validate')}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </Overlay>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
  container: {
    width: '88%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    overflow: 'hidden',
    borderRadius: 15,
  },
  imgBgStyle: {
    width: '100%',
    height: 220,
  },
  txtBtnConfrm: {
    fontSize: 16,
    color: Colors.fontDark,
  },
  btnConfrm: {
    backgroundColor: '#EAEAEA',
    borderRadius: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '5%',
    height: 45,
  },
  txtName: {
    fontSize: 18,
    color: Colors.fontDark,
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center',
    maxWidth: '80%',
  },
  imgStyle: {
    width: 300,
    height: 200,
    alignSelf: 'center',
    // marginTop: -30,
    marginRight: -20,
  },
  viewImg: {
    width: '100%',
    height: 240,
  },
  inputStyle: {
    height: 50,
    width: '80%',
    borderColor: '#e6e6e6',
    borderRadius: 9,
    borderWidth: 1.3,
    marginTop: 12,
    fontSize: 18,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
