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
    paddingLeft: 10,
    paddingRight: 10,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontFamily: 'ProximaNova',
    fontSize: 16,
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
  },
  smallInput: {
    width: 48,
    height: 48,
    paddingLeft: 18,
    borderColor: '#E3E3E3',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  waiterInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    width: 140,
    padding: 10,
    fontSize: 16,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontFamily: 'ProximaNova',
    height: 48,
  },
  chooseButtons_container: {
    width: 270,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
    height: 48,
    borderColor: '#E3E3E3',
    borderWidth: 1,
    borderRadius: 7,
  },
  time_opt: {
    width: 135,
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#E3E3E3',
  },
  timeTxt: {
    fontFamily: 'ProximaNova',
    fontSize: 16,
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