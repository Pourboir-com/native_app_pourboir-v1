import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  userDetails_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal:10
  },
  user_name: {
    fontFamily: 'ProximaNovaBold',
    fontSize: 24,
  },
  clientTxt: {
    fontFamily: 'ProximaNovaSemiBold',
    fontSize: 18,
    marginTop: 10
  },
  few_word_text: {
    fontFamily: 'ProximaNovaSemiBold',
    fontSize: 14,
    paddingTop: 10,
  },
  subscribeNumber: {
    fontFamily: 'ProximaNovaBold',
    fontSize: 18,
    textAlign: 'center',
  },
  subscribeTxt: {
    fontFamily: 'ProximaNova',
    fontSize: 14,
    marginTop: 5,
  },
  btn_follow: {
    backgroundColor: Colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
    marginLeft: 20,
  },
  text_follow: {
    fontFamily: 'ProximaNova',
    fontSize: 14,
  },
  publications_btn: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: 160,
  },
  publication_text: {
    fontSize: 15,
    fontFamily: 'ProximaNova',
  },
  sheet_elements: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sheetTxt: {
    color: '#485460',
    fontFamily: 'ProximaNova',
    fontSize: 16,
  },
  signOutBtn: {
    position: 'absolute',
    bottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default styles;
