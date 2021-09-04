import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Image } from 'react-native';
import { TextInput } from 'react-native';
import styles from '../../screens/braserri/styles';
import AddBtn from '../add-common-btn';
import i18n from '../../li8n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import uuid from 'react-native-uuid';
import CommonButton from '../common-button';
import { SAVE_CHANGES } from '../../queries';
import { useMutation } from 'react-query';

const Categories = props => {
  const [categ, setCateg] = useState();
  const [dishes, setDishes] = useState([]);
  const [disable, setDisable] = useState(true);
  const [newDishes, setNewDishes] = useState([]);
  console.log(dishes);
  useEffect(() => {
    if (props.dishes) {
      setDishes(props.dishes);
    }
  }, [props.dishes]);


  const addDish =  () => {
    const list =  dishes.push({
      idDish: 'y' + uuid.v4(),
      name: '',
      price: Number(''),
      description: '',
    });
    setDishes([...dishes]);
    props.setDishess(list);
    // setDishes([...di])
    // console.log(newDishes, ' ssssss');
  };

  const handleInputChange = (value, index, name) => {
    props.dishes[index][name] = value;
    props.setDishess((dishes[index][name] = value));
  };

  const openDeleteDish = id => {
    props.setDishId(id);
    props.setDeleteDishModal(true);
    props.setDishess(props.dishes);
    props.setMenuId(props.id ? props.id : props.idMenu);
    props.setDeleteType('dish');
  };

  const deleteDish = id => {
    setDishes(
      dishes.filter(v => {
        return v.idDish != id;
      }),
    );
  };

  const openDeleteMenu = id => {
    props.setDeleteDishModal(true);
    props.setMenuId(id);
    props.setDeleteType('menu');
  };
  // const dishesLength = newDishes.length;
  console.log(newDishes.length, ' length');
  const validator = () => {
    if (newDishes.length) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  };

  useEffect(() => {
    validator();
  }, [newDishes]);
  console.log(disable, ' btn');

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
    await saveChanges(
      {
        category: props.category || '',
        menu_id: props.id || '',
        user_id: props.user_id || '',
        place_id: props.place_id || '',
        dishes: resolvedDishes(props.dishes) || [],
      },
      {
        onSuccess: async res => {
          // alert('Changes saved successfully');
          // setCategModal(false)
          await props.refetchMenus();
          // setDishes([...props.dishes])
          setNewDishes([]);
        },
        onError: e => {
          alert('error save changes');
        },
      },
    );
  };

  return (
    <KeyboardAwareScrollView
      bounces={false}
      enableOnAndroid={true}
      extraScrollHeight={10}
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
        <Text style={styles.mainHeading}>{props.category}</Text>
        <TouchableOpacity
          onPress={() => openDeleteMenu(props.id || props.idMenu)}
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
                    <View style={(styles.input_box, { width: '60%' })}>
                      <TextInput
                        style={[
                          styles.inputsTopTow,
                          { fontWeight: 'bold', color: 'black' },
                        ]}
                        onChangeText={name =>
                          handleInputChange(name, i, 'name')
                        }
                        value={v.name}
                        placeholder={i18n.t('dish_name')}
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
                        })
                      }
                    >
                      <TextInput
                        style={
                          (styles.inputsTopTow,
                          {
                            ...styles.inputsTopTow,
                            width: 80,
                            marginRight: 10,
                            fontWeight: 'bold',
                            color: 'black',
                          })
                        }
                        onChangeText={name =>
                          handleInputChange(name, i, 'price')
                        }
                        value={v.price}
                        placeholder={i18n.t('price')}
                        keyboardType={'numeric'}
                        placeholderTextColor={'#707375'}
                      />
                      <TouchableOpacity
                        onPress={() =>
                          !v.idDish
                            ? openDeleteDish(v._id)
                            : deleteDish(v.idDish)
                        } //openDeleteDish(v._id ? v.id : v.idDish)
                        style={{ justifyContent: 'center' }}
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
        <AddBtn title={i18n.t('add_dish')} onPress={() => addDish()} />
      </View>
      {props.dishes && props.dishes.length ? (
        <View style={{ marginVertical: 14 }}>
          <CommonButton
            loading={publishMenuLoading}
            onPress={saveMenu}
            title={i18n.t('save_changes')}
            disable={disable}
            // validation={validation}
          />
        </View>
      ) : null}
    </KeyboardAwareScrollView>
  );
};

export default Categories;
