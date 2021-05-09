import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  first_section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  child_one: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  child_two: {
    width: '20%',
    alignItems: 'center',
  },
  first_section_bold: {
    fontFamily: 'ProximaNovaBold',
    fontSize: 20,
  },
  yellow_box: {
    justifyContent: 'center',
    backgroundColor: '#FCDF6F',
    width: 58,
    height: 50,
    alignItems: 'center',
    borderRadius: 18,
  },
  numbers_staff: {
    fontFamily: 'ProximaNova',
    fontSize: 18,
  },
  second_section: {
    marginTop: 30,
    paddingBottom: 10,
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchBar: {
    backgroundColor: '#fff',
    width: '77%',
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 13,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: Platform.OS === 'ios' ? 0 : 1,
  },
  filter: {
    width: '23%',
    alignItems: 'center',
    paddingLeft: 10,
    paddingTop: 4,
  },
});

export default styles;
