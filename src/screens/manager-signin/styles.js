import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  whiteCard: {
    backgroundColor: '#fff',
    height: 'auto',
    width: '90%',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  topHeading: {
    fontFamily: 'ProximaNovaBold',
    fontSize: 22,
    paddingTop: 10,
    textAlign:'center'
  },
  input: {
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 15,
    paddingVertical: 12,
    textAlign: 'center',
    marginTop: 10,
    borderRadius: 12,
  },
  btn_save: {
    backgroundColor: '#FCDF6F',
    width: '100%',
    marginTop: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  saveTxt: {
    paddingVertical: 5,
    fontFamily: 'ProximaNova',
    fontSize: 12,
  },
  signupTxt: {
    textAlign: 'center',
    fontFamily: 'ProximaNovaBold',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  text1: {
    textAlign: 'center',
    fontFamily: 'ProximaNova',
    fontSize: 15,
    paddingBottom:2
  },
});

export default styles;
