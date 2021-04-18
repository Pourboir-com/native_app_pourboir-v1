import {
  StyleSheet,
} from 'react-native';
import {
  Platform,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  btn_yellow: {
    backgroundColor: '#EAEAEA',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 8,
    marginBottom: Platform.OS === 'ios' ? 25 : 15,
    alignSelf: 'center',
  },
  heading1: {
    marginTop: 20,
    marginBottom: 21,
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'ProximaNovaBold',
  },
  main_container: {
    marginHorizontal: 10,
    flex: 8,
    alignItems: 'center',
  },
  inputsTopTow: {
    borderColor: '#E3E3E3',
    borderWidth: 1,
    width: 270,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontFamily: 'ProximaNova',
  },
  inputLabel: {
    color: 'black',
    opacity: 0.8,
    paddingBottom: 2.7,
    fontSize: 15,
    fontFamily: 'ProximaNovaBold',
  },
  input_box: {
    marginBottom: 16,
  },
  smallInput: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderColor: '#E3E3E3',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  chooseButtons_container: {
    width: 270,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
    height: 50,
    borderColor: '#E3E3E3',
    borderWidth: 1,
    borderRadius: 7,
  },
  time_opt: {
    width: 135,
    height: 49,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#E3E3E3',
  },
  timeTxt: {
    fontFamily: 'ProximaNova',
  },
  experience: {
    paddingLeft: 12,
    paddingTop: 14,
    fontFamily: 'ProximaNova',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default styles;