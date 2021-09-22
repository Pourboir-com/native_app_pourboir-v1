import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useQuery } from 'react-query';
import GlobalHeader from '../../components/GlobalHeader';
import { reactQueryConfig } from '../../constants';
import { GET_MENU } from '../../queries';
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

const MenuScreen = ({ navigation, route }) => {
  const [menu, setMenu] = useState([]);
  const dummy = [
    {
      cat: 'Entree',
      dishes: [
        {
          name: 'First dish',
          description: 'Description of first dish',
          price: '12,00',
        },
        {
          name: 'First dish',
          description: 'Description of first dish',
          price: '12,00',
        },
      ],
    },
    {
      cat: 'Entree',
      dishes: [
        {
          name: 'First dish',
          description: 'Description of first dish',
          price: '12,00',
        },
        {
          name: 'First dish',
          description: 'Description of first dish',
          price: '12,00',
        },
        {
          name: 'First dish',
          description: 'Description of first dish',
          price: '12,00',
        },
      ],
    },
  ];
  const {
    data: menus,
    isLoading: menusLoading,
    isFetching: menusIsFetching,
    refetch: refetchMenus,
  } = useQuery(
    ['GET_MENU', { place_id: route.params.restaurant_id }],
    GET_MENU,
    {
      ...reactQueryConfig,
      onSuccess: async res => {
        setMenu(res.data);
      },
      onError: e => {
        alert(e?.response?.data?.message);
      },
    },
  );
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={{
            width: '100%',
            height: 100,
            borderBottomLeftRadius: Dimensions.get('window').width * 0.06,
            borderBottomRightRadius: Dimensions.get('window').width * 0.06,
            overflow: 'hidden',
          }}
          source={require('../../assets/images/Group3.png')}
        >
          <GlobalHeader
            arrow={true}
            headingText={'MENU'}
            fontSize={17}
            color={'black'}
            navigation={navigation}
            setting={false}
            backgroundColor={'transparent'}
            borderRadius={true}
          />
        </ImageBackground>
      </View>
      <View style={{ flex: 5 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginHorizontal: 25 }}>
            {dummy.map((v, i) => {
              return (
                <View key={i} style={{ marginBottom: 20 }}>
                  <View>
                    <Text style={styles.category_name}>{v.cat}</Text>
                  </View>
                  {v.dishes.map((dish, key) => {
                    return (
                      <View key={key} style={styles.dish_container}>
                        <View>
                          <Text style={styles.dish_txt}>{dish.name}</Text>
                          <Text style={styles.dish_txt}>
                            {dish.description}
                          </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                          <FontAwesome
                            name="euro"
                            style={{ paddingTop: 3 }}
                            size={20}
                            color="black"
                          />
                          <Text style={styles.price}>{dish.price}</Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  category_name: {
    fontSize: 22,
    fontFamily: 'ProximaNovaBold',
  },
  dish_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  dish_txt: {
    fontSize: 15,
    fontFamily: 'ProximaNova',
    fontWeight: '700',
  },
  price: {
    fontSize: 16,
    fontFamily: 'ProximaNovaBold',
    paddingLeft: 8,
  },
});
