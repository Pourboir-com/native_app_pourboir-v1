import { StyleSheet } from 'react-native';

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
    fontSize: 19,
  },
  yellow_box: {
    justifyContent: 'center',
    backgroundColor: '#FCDF6F',
    width: 45,
    height: 45,
    alignItems: 'center',
    borderRadius: 14,
  },
  numbers_staff: {
    fontFamily: 'ProximaNova',
  },
  second_section: {
    marginTop: 30,
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

    elevation: 2,
  },
  filter: {
    width: '23%',
    alignItems: 'center',
    paddingLeft: 10,
    paddingTop: 3,
  },
  third_section: {
    marginTop: 40,
  },
});

export default styles;
