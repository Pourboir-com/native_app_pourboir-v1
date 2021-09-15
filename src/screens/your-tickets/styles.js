import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  lottery: {
    width: 220,
    backgroundColor: '#fcf4e4',
    borderRadius: 10,
    fontSize: 20,
    paddingVertical: 10,
    textAlign: 'center',
    marginBottom: 20,
    color: '#e6c33d',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    fontFamily: 'ProximaNova',
    textAlign: 'center',
    width: '70%',
  },
  yearText: {
    fontFamily: 'ProximaNovaBold',
    fontSize: 24,
  },
  monthTxt: {
    marginTop: 5,
    marginBottom: 20,
    fontFamily: 'ProximaNovaBold',
    fontSize: 24,
  },
  container_number: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
  },
});

export default styles;
