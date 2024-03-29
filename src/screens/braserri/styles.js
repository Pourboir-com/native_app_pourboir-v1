import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  tabBtn: {
    backgroundColor: '#FFF6D4',
    borderRadius: 13,
    width: '31%',
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
  },
  tabTxt: {
    fontFamily: 'ProximaNova',
    fontSize: 12,
    marginTop: 5,
  },
  team_common_sec: {
    flexDirection: 'row',
  },
  numberBox: {
    backgroundColor: '#FCDF6F',
    marginLeft: 20,
    borderRadius: 8,
    width: 'auto' || 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  input: {
    fontSize: 14,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    paddingLeft: 15,
    backgroundColor: '#fff',
  },
  numberTxt: {
    fontSize: 15,
    fontFamily: 'ProximaNova',
  },
  mainHeading: {
    fontSize: 22,
    fontFamily: 'ProximaNovaBold',
  },
  main_card_container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 14,
    // height:50
    paddingTop: 17,
    paddingBottom: 17,
  },
  section1: {
    flexDirection: 'row',
  },
  section2: {
    justifyContent: 'center',
    // paddingTop:10,
    alignItems: 'center',
    paddingRight: 10,
  },
  name_staff: {
    fontFamily: 'ProximaNova',
    fontSize: 18,
    width: 170,
    alignSelf: 'center',
  },
  inputsTopTow: {
    borderColor: '#E3E3E3',
    borderWidth: 1,
    width: '100%',
    alignSelf: 'center',
    height: 48,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontFamily: 'ProximaNova',
    fontSize: 16,
    // textAlign: 'center',
    paddingLeft: 15,
  },
  inputLabel: {
    color: 'black',
    opacity: 0.8,
    paddingBottom: 2.7,
    fontSize: 16,
    fontFamily: 'ProximaNovaBold',
  },
  input_box: {
    marginBottom: 16,
    justifyContent: 'center',
    width: '80%',
  },
  checkContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    height: 35,
  },
  media_main_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    width: '100%',
  },
});

export default styles;
