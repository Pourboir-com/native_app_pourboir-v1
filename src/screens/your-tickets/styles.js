import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  lottery: {
    width: '80%',
    backgroundColor: '#fcf4e4',
    borderRadius: 10,
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    marginBottom: 20,
    color: '#e6c33d',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    fontFamily: 'ProximaNova',
    textAlign: 'center',
    width: '80%',
  },
  monthTxt: {
    paddingBottom: 20,
    fontFamily: 'ProximaNovaBold',
    fontSize: 24,
  },
  container_number: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});

export default styles;
