import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  textBold: {
    fontFamily: 'ProximaNovaBold',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 20,
    // marginHorizontal: 37,
    width: 270,
    alignSelf:'center'
  },
  textLight: {
    fontFamily: 'ProximaNova',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 20,
    paddingTop: 10,
    alignSelf:'center',
    width:'85%',
  },
  main_card_container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    padding: 14,
    borderRadius: 14,
    marginVertical: 10,
    width: '100%',
  },
  section1: {
    flexDirection: 'row',
  },
  section2: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },
  name_staff: {
    fontFamily: 'ProximaNova',
    fontSize: 18,
    width: 180,
  },
  boldTxt2: {
    fontFamily: 'ProximaNovaBold',
    fontSize: 24,
    lineHeight: 20,
  },
  lighTxt2: {
    fontFamily: 'ProximaNova',
    fontSize: 16,
    paddingTop: 10,
    paddingLeft: 4,
    color: '#000'
  },
});

export default styles;
