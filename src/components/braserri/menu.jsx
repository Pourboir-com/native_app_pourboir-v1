import React, { useState, useContext } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import i18n from '../../li8n';
import AddBtn from '../add-common-btn';
import CommonButton from '../common-button';
import AddCategoryModal from '../modals/AddCategoryModal';
import DeleteDishModal from '../modals/DeleteDishModal';
import Categories from './categories';
import { useQuery, useMutation } from 'react-query';
import {
  PUBLISH_MENU,
  DELETE_DISH,
  GET_MENU,
  DELETE_MENU,
} from '../../queries';
import { reactQueryConfig } from '../../constants';
import Context from '../../contextApi/context';

const Menu = ({
  currentTab,
  dishName,
  setDishName,
  price,
  setPrice,
  description,
  setDescription,
  route,
}) => {
  const { state } = useContext(Context);
  const { restaurant_id } = route?.params || {};
  let ScreenHeight = Dimensions.get('window').height / 1.5;
  const [categModal, setCategModal] = useState(false);
  const [deleteDishModal, setDeleteDishModal] = useState(false);
  const [categArr, setCategArr] = useState([]);
  const [dishState, setDishState] = useState([]);
  const [dishId, setDishId] = useState();
  const [dishes, setDishes] = useState([]);
  const [deleteMenu, { isLoading: deleteMenuLoading }] = useMutation(
    DELETE_MENU,
  );
  const [publishMenu, { isLoading: publishMenuLoading }] = useMutation(
    PUBLISH_MENU,
  );
  const [deleteDish, { isLoading: deleteDishLoading }] = useMutation(
    DELETE_DISH,
  );

  const {
    data: menus,
    isLoading: menusLoading,
    isFetching: menusIsFetching,
    refetch: refetchMenus,
  } = useQuery(['GET_MENU', { place_id: restaurant_id }], GET_MENU, {
    ...reactQueryConfig,
    onError: e => {
      alert(e?.response?.data?.message);
    },
  });
  // console.log("start ", menus.data[0], " end");
  // console.log(state.userDetails.user_id);

  const submitCategory = async () => {
    await publishMenu(categArr, {
      onSuccess: () => {},
      onError: () => {},
    });
    // setCategArr([]);
  };

  const DeleteMenu = async id => {
    await deleteMenu(
      //body
      { menu_ids: [id] },
      //api response below
      {
        onSuccess: () => {
          refetchMenus();
        },
        onError: e => {
          alert(e.response?.data?.message);
        },
      },
    );
    // setCategArr([]);
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
          {!menusLoading
            ? menus.data.map((v, i) => {
                return (
                  <Categories
                    key={i}
                    id={v._id}
                    categArr={menus.data}
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
                    deleteDish={deleteDish}
                    deleteMenu={DeleteMenu}
                  />
                );
              })
            : null}
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
