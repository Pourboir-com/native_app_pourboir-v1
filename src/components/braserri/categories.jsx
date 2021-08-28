import React, { useEffect, useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native';
import { TextInput } from 'react-native';
import styles from '../../screens/braserri/styles';
import AddBtn from '../add-common-btn';
import i18n from '../../li8n';
import uuid from 'react-native-uuid';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Categories = props => {
  const [categ, setCateg] = useState();
  const [menuId, setMenuId] = useState();
  useEffect(() => {
    setCateg(props.categArr);
    setMenuId(props.menu_id);
    props.setDishess(props.dishes);
    console.log(props.dishes, ' s');
  }, [props.dishess]);
  const addDish = async () => {
    const list = await props.dishes.push({
      id: uuid.v4(),
      dishName: '',
      price: '',
      description: '',
    });
    props.setDishess(list);
    console.log(props.dishess, ' ssssss');
  };

  const handleInputChange = (value, index, name) => {
    props.dishes[index][name] = value;
    props.setDishess((props.dishes[index][name] = value));
    console.log(props.categArr);
  };

  async function deleteCategory(id) {
    await props.setCategArr(
      props.categArr.filter(item => {
        return item.menu_id != id;
      }),
    );
  }

  const openDeleteModal = id => {
    props.setDishId(id);
    props.setDeleteDishModal(true);
    props.setDishess(props.dishes);
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
          onPress={() => deleteCategory(menuId)}
          activeOpacity={0.3}
        >
          <Image
            source={require('../../assets/images/minus.png')}
            style={{ resizeMode: 'contain', width: 22, height: 22 }}
          />
        </TouchableOpacity>
      </View>

      {props.dishes ? (
        <>
          {props.dishes &&
            props.dishes.map((v, i) => {
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
                        style={styles.inputsTopTow}
                        onChangeText={name =>
                          handleInputChange(name, i, 'dishName')
                        }
                        value={v.dishName}
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
                          })
                        }
                        onChangeText={name =>
                          handleInputChange(name, i, 'price')
                        }
                        value={v.price}
                        placeholder={i18n.t('price')}
                        placeholderTextColor={'#707375'}
                      />
                      <TouchableOpacity
                        onPress={() => openDeleteModal(v.id)}
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
    </KeyboardAwareScrollView>
  );
};

export default Categories;
