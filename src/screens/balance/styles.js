import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontFamily: 'ProximaNova',
    textAlign: 'center',
  },
  amount: {
    fontSize: 18,
    fontFamily: 'ProximaNovaBold',
    color: '#ebc42b',
  },
  heading: {
    marginTop: 25,
    fontFamily: 'ProximaNovaBold',
    fontSize: 24,
    textAlign: 'center',
  },
  balance: {
    fontFamily: 'ProximaNovaBold',
    backgroundColor: '#fff6d4',
    paddingVertical: 25,
    marginTop: 40,
    marginBottom: 15,
    paddingHorizontal: 65,
    fontSize: 50,
    color: '#ebc42b',
    borderRadius: 15,
    overflow: 'hidden',
  },
});

export default styles;
