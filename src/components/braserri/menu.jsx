import React, { useState } from 'react';
import { Text, View } from 'react-native';
import i18n from '../../li8n';
import styles from '../../screens/braserri/styles';
import AddBtn from '../add-common-btn';
import CommonButton from '../common-button';
import AddCategoryModal from '../modals/AddCategoryModal';
import DeleteDishModal from '../modals/DeleteDishModal';
import Categories from './categories';

// {
//     category: "Starter",
//     menu_id: Math.floor(Math.random() * 100),
//     dishes:[{name: 'Starter', description: 'Description of dish', price: '230'}]
// }

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
  console.log(deleteDishModal, ' ss');
  const [categArr, setCategArr] = useState([]);
  const [dishState, setDishState] = useState([]);
  const [dishId, setDishId] = useState()
  const [dishes, setDishes] = useState()
  console.log(dishes, " dishes")
  return (
    <>
      <View style={{ marginHorizontal: 0, marginTop: 20 }}>
        <View>
          {categArr.map((v, i) => {
            return (
              <Categories
                key={i}
                category={v}
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
      </View>
      {currentTab == 'menu' && categArr.length ? (
        <View
          style={{
            marginTop: 150,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CommonButton title="Publish your menu" />
        </View>
      ) : null}
    </>
  );
};

export default Menu;
