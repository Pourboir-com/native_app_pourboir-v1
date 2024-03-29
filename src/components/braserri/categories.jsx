import React, { useEffect, useState, useContext } from 'react';
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Image } from 'react-native';
import { TextInput } from 'react-native';
import styles from '../../screens/braserri/styles';
import AddBtn from '../add-common-btn';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import uuid from 'react-native-uuid';
import CommonButton from '../common-button';
import { SAVE_CHANGES } from '../../queries';
import { useMutation } from 'react-query';
import NumberFormat from 'react-number-format';
import { getAsyncStorageValues } from '../../constants';
import Context from '../../contextApi/context';

const Categories = props => {
  const [dishes, setDishes] = useState([]);
  const [disable, setDisable] = useState(true);
  const [currency, setCurrency] = useState();
  const { localizationContext } = useContext(Context);

  useEffect(() => {
    (async () => {
      const { Currency } = await getAsyncStorageValues();
      setCurrency(JSON.parse(Currency));
    })();
  }, []);

  useEffect(() => {
    if (props?.dishes) {
      setDishes(props?.dishes);
    }
  }, [props?.dishes]);

  const addDish = () => {
    const list = dishes.push({
      idDish: 'y' + uuid.v4(),
      name: '',
      price: Number(''),
      description: '',
    });
    // setDishes([...dishes]);
    props?.setDishess(list);
  };

  const handleInputChange = (value, index, name) => {
    dishes[index][name] = value;
    props?.setDishess((dishes[index][name] = value));
  };

  const openDeleteDish = id => {
    props?.setDishId(id);
    props?.setDeleteDishModal(true);
    props?.setDishess(props?.dishes);
    props?.setMenuId(props?.id ? props?.id : props?.idMenu);
    props?.setDeleteType('dish');
  };

  const deleteDish = id => {
    setDishes(
      dishes.filter(v => {
        return v.idDish != id;
      }),
    );
  };

  const openDeleteMenu = id => {
    props?.setDeleteDishModal(true);
    props?.setMenuId(id);
    props?.setDeleteType('menu');
  };
  // const dishesLength = newDishes.length;
  const validator = () => {
    dishes.find(v => {
      if (!v.name || !v.description || !v.price) {
        setDisable(true);
      } else {
        setDisable(false);
      }
    });
  };

  useEffect(() => {
    validator();
  }, [props?.dishess, dishes]);

  const [saveChanges, { isLoading: publishMenuLoading }] = useMutation(
    SAVE_CHANGES,
  );

  const resolvedDishes = dishes => {
    const result = dishes.map(({ idDish, updatedAt, ...rest }) => ({
      ...rest,
    }));
    return result;
  };

  const saveMenu = async () => {
    const { Currency } = await getAsyncStorageValues();
    let currencySign = JSON.parse(Currency);
    await saveChanges(
      {
        category: props?.category || '',
        menu_id: props?.id || '',
        user_id: props?.user_id || '',
        place_id: props?.place_id || '',
        dishes: resolvedDishes(props?.dishes) || [],
        currency: currencySign?.currency.split(' ').join('') || '',
      },
      {
        onSuccess: async res => {
          await props?.refetchMenus();
          alert('The menu has been updated successfully!');
        },
        onError: e => {
          alert('Something went wrong!');
        },
      },
    );
  };

  return (
    <KeyboardAwareScrollView
      bounces={false}
      enableOnAndroid={true}
      extraScrollHeight={Platform.OS === 'ios' ? -75 : 10}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      scrollToOverflowEnabled={true}
      enableAutomaticScroll={Platform.OS === 'ios' ? true : false}
      resetScrollToCoords={{ x: 0, y: 0 }}
      style={{ marginTop: 10 }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Text style={styles.mainHeading}>{props?.category}</Text>
        <TouchableOpacity
          onPress={() => openDeleteMenu(props?.id || props?.idMenu)}
          activeOpacity={0.3}
        >
          <Image
            source={require('../../assets/images/minus.png')}
            style={{ resizeMode: 'contain', width: 22, height: 22 }}
          />
        </TouchableOpacity>
      </View>

      {dishes ? (
        <>
          {dishes &&
            dishes.map((v, i) => {
              return (
                <View key={i}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                      marginTop: 20,
                    }}
                  >
                    <View style={(styles.input_box, { width: '65%' })}>
                      <TextInput
                        style={[
                          styles.inputsTopTow,
                          { fontWeight: 'bold', color: 'black' },
                        ]}
                        onChangeText={name =>
                          handleInputChange(name, i, 'name')
                        }
                        value={v.name}
                        placeholder={localizationContext.t('dish_name')}
                        placeholderTextColor={'#707375'}
                      />
                    </View>
                    <View
                      style={
                        (styles.input_box,
                        {
                          ...styles.input_box,
                          width: '35%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        })
                      }
                    >
                      <NumberFormat
                        value={v.price}
                        thousandSeparator={true}
                        prefix={
                          currency
                            ? currency.currency.split(' ').join('') + ' '
                            : ''
                        }
                        renderText={formattedValue => (
                          <TextInput
                            style={
                              (styles.inputsTopTow,
                              {
                                ...styles.inputsTopTow,
                                width: 80,
                                marginLeft: 10,
                                fontWeight: 'bold',
                                color: 'black',
                              })
                            }
                            onChangeText={value =>
                              handleInputChange(
                                value.replace(/[^0-9]/g, ''),
                                i,
                                'price',
                              )
                            }
                            value={formattedValue}
                            placeholder={localizationContext.t('price')}
                            keyboardType={'numeric'}
                            placeholderTextColor={'#707375'}
                          />
                        )}
                        displayType={'text'}
                      />
                      <TouchableOpacity
                        onPress={() =>
                          !v.idDish
                            ? openDeleteDish(v._id)
                            : deleteDish(v.idDish)
                        } //openDeleteDish(v._id ? v.id : v.idDish)
                        style={{
                          justifyContent: 'center',
                          alignSelf: 'center',
                        }}
                        activeOpacity={0.3}
                      >
                        <Image
                          source={require('../../assets/images/minus.png')}
                          style={{
                            resizeMode: 'contain',
                            width: 22,
                            height: 22,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={(styles.input_box, { width: '100%' })}>
                    <TextInput
                      style={styles.inputsTopTow}
                      onChangeText={name =>
                        handleInputChange(name, i, 'description')
                      }
                      value={v.description}
                      placeholder={'Description'}
                      placeholderTextColor={'#707375'}
                    />
                  </View>
                </View>
              );
            })}
        </>
      ) : (
        <Text>Loading..</Text>
      )}

      <View
        style={{
          marginHorizontal: 18,
          marginTop: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AddBtn title={localizationContext.t('add_dish')} onPress={() => addDish()} />
      </View>
      {props?.dishes && props?.dishes.length ? (
        <View style={{ marginVertical: 14 }}>
          <CommonButton
            loading={publishMenuLoading}
            onPress={saveMenu}
            title={localizationContext.t('save_changes')}
            disable={disable}
          />
        </View>
      ) : null}
    </KeyboardAwareScrollView>
  );
};

export default Categories;
