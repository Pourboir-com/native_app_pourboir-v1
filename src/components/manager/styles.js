import { Platform, StyleSheet } from 'react-native';
const THUMB_RADIUS = 9;

const styles = StyleSheet.create({
  main_card_container: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 0.2,

    elevation: Platform.OS === 'ios' ? 0 : 1,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 14,
  },
  section1: {
    flexDirection: 'row',
  },
  section2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  name_staff: {
    fontFamily: 'ProximaNova',
    fontSize: 14,
  },
  modal_container: {
    backgroundColor: '#fff',
    height: 'auto',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 14,
    width: '90%',
    alignSelf: 'center',
  },
  btn_green: {
    backgroundColor: '#6DD400',
    borderRadius: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnGreen_txt: {
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 13,
    fontFamily: 'ProximaNova',
  },
  text_dispon: {
    fontFamily: 'ProximaNova',
    textAlign: 'center',
    fontSize: 11,
    paddingVertical: 3,
    fontWeight: '700',
    paddingBottom: 4,
  },
  first_part_modal: {
    borderBottomColor: '#FDDF6F',
    borderBottomWidth: 2,
    borderStyle: 'dashed',
    width: '80%',
    alignItems: 'center',
    borderRadius: 1,
  },
  exp_year: {
    fontFamily: 'ProximaNova',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  ansTxt: {
    fontFamily: 'ProximaNova',
    fontSize: 12,
    paddingLeft: 3,
    paddingTop: 4,
    textAlign: 'center',
  },
  expsTxt: {
    fontSize: 12,
    fontFamily: 'ProximaNova',
    textAlign: 'center',
    fontWeight: '700',
  },
  cancelBtn: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 20,
    right: 20,
    color: '#000',
  },
  petitTxt: {
    fontSize: 11,
    fontFamily: 'ProximaNova',
    textAlign: 'center',
    paddingTop: 15,
    color: '#1E272E',
  },
  qualifDetail: {
    fontSize: 11,
    fontFamily: 'ProximaNova',
    textAlign: 'center',
    paddingTop: 15,
    marginHorizontal: 50,
  },
  recruterBtns: {
    flexDirection: 'row',
    paddingTop: 20,
    alignItems:'center'
  },
  filterTxt: {
    fontFamily: 'ProximaNovaBold',
    fontSize: 20,
  },
  postsInput: {
    backgroundColor: '#EAEAEA',
    width: '100%',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
  postsLabel: {
    fontFamily: 'ProximaNovaBold',
    fontSize: 14,
    paddingLeft: 4,
    paddingBottom: 5,
  },
  radioBtnTxt: {
    fontFamily: 'ProximaNova',
    fontWeight: '700',
    fontSize: 12,
    paddingLeft: 5,
  },
  slider: {
    color: '#FDDF6F',
    marginLeft: -6,
  },
  fontYears: {
    fontFamily: 'ProximaNova',
    fontSize: 17,
    fontWeight: '700',
  },
  ansFont: {
    fontFamily: 'ProximaNova',
    fontSize: 12,
    fontWeight: '200',
    paddingLeft: 4,
  },
  btnYellow: {
    backgroundColor: '#FCDF6F',
    width: '46%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  btnTxt: {
    paddingVertical: 15,
    fontFamily: 'ProximaNova',
  },
  btnGray: {
    backgroundColor: '#EAEAEA',
    width: '46%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },

  root: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#4499ff',
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
  root_l: {
    width: 8,
    height: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#4499ff',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
  },
  root_r: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D8D8D8',
  },
  root_rr: {
    height: 4,
    backgroundColor: '#FDDF6F',
    borderRadius: 2,
  },
  root_t: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    borderWidth: 2,
    borderColor: '#FDDF6F',
    backgroundColor: '#FDDF6F',
  },
});

export default styles;
