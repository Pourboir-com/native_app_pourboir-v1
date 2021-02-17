import React from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Feather, Entypo, AntDesign } from '@expo/vector-icons';

import { Colors } from '../../constants/Theme';
import { Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { spacing } from '../../constants/layout';

import { HEADER_BAR_HEIGHT, LAYOUT } from '../../constants/layout';

export default function HeaderSimple(props) {
  const navigation = useNavigation();

  const [isFocused, setIsFocused] = React.useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerRight: null,
      headerShown: false,
      headerLeft: null,
      headerTransparent: true,
      headerTitleAlign: 'left',
    });
  });

  return (
    <View style={styles.viewHeader2}>
      <View style={styles.viewInputSearch}>
        <TouchableOpacity
          onPress={() => props.setSearchIconPress(!props.searchIconPress)}
          style={{ paddingHorizontal: 8 }}
        >
          <Feather name="search" color={Colors.yellow} size={21} />
        </TouchableOpacity>

        <TextInput
          value={props.searchVal}
          onSubmitEditing={() => props.setsearchEnter(props.searchVal)}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          onChangeText={e => {
            props.setSearchVal(e);
          }}
          style={[{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.2,
            shadowRadius: 0.1,
            elevation: 5,
            zIndex: 120,
          }]}
          placeholder="Search"
          style={styles.inputSearch}
        />

        <TouchableOpacity
          onPress={() => {
            props.setSearchVal('');
          }}
          style={{ paddingHorizontal: 8 }}
        >
          <View
            style={{
              backgroundColor: Colors.yellow,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 4,
            }}
          >
            {/* <Entypo
                            name="cross"
                            color={'#1E272E'}
                            size={25}
                        /> */}
            <AntDesign name="close" size={14} color="#485460" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewInputSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '90%',
    marginTop: 45,
    alignSelf: 'center',
    borderRadius: 10,
    // overflow: "hidden"
  },
  viewHeader2: {
    width: '100%',
    height: 110,
    backgroundColor: Colors.yellow,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  inputSearch: {
    height: HEADER_BAR_HEIGHT,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 0,
    flex: 1,
  },
});
