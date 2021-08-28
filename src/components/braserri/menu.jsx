import React, { useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import i18n from '../../li8n';
import AddBtn from '../add-common-btn';
import CommonButton from '../common-button';
import AddCategoryModal from '../modals/AddCategoryModal';
import DeleteDishModal from '../modals/DeleteDishModal';
import Categories from './categories';

const Menu = ({
  currentTab,
  dishName,
  setDishName,
  price,
  setPrice,
  description,
  setDescription,
}) => {
  const [categModal, setCategModal] = useState(false);
  const [deleteDishModal, setDeleteDishModal] = useState(false);
  const [categArr, setCategArr] = useState([]);
  const [dishState, setDishState] = useState([]);
  const [dishId, setDishId] = useState();
  const [dishes, setDishes] = useState([]);
  let ScreenHeight = Dimensions.get('window').height / 1.5;

  const submitCategory = () => {
    console.log(categArr);
    setCategArr([]);
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginHorizontal: 0,
          marginTop: 20,
          marginBottom: 60,
          height: ScreenHeight,
        }}
      >
        <View>
          {categArr &&
            categArr.map((v, i) => {
              return (
                <Categories
                  key={i}
                  categArr={categArr}
                  setCategArr={setCategArr}
                  description={description}
                  setDescription={setDescription}
                  dishName={dishName}
                  setDishName={setDishName}
                  setPrice={setPrice}
                  price={price}
                  category={v.category}
                  dishes={v.dishes}
                  menu_id={v.menu_id}
                  deleteDishModal={deleteDishModal}
                  setDeleteDishModal={setDeleteDishModal}
                  dishState={dishState}
                  setDishState={setDishState}
                  dishId={dishId}
                  setDishId={setDishId}
                  dishess={dishes}
                  setDishess={setDishes}
                />
              );
            })}
        </View>
        <View
          style={{
            marginTop: 24,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 18,
          }}
        >
          <AddBtn
            title={i18n.t('add_categ')}
            onPress={() => setCategModal(true)}
          />
        </View>
        <AddCategoryModal
          categModal={categModal}
          setCategModal={setCategModal}
          categArr={categArr}
          setCategArr={setCategArr}
        />
        <DeleteDishModal
          deleteDishModal={deleteDishModal}
          setDeleteDishModal={setDeleteDishModal}
          dishId={dishId}
          setDishId={setDishId}
          dishes={dishes}
          setDishes={setDishes}
        />
      </ScrollView>
      {currentTab == 'menu' && categArr.length ? (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CommonButton onPress={submitCategory} title="Publish your menu" />
        </View>
      ) : null}
    </>
  );
};

export default Menu;
