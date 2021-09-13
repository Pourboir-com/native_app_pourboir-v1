import React, { useState, useContext, useEffect } from 'react';
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
  restaurant_id,
}) => {
  const { state } = useContext(Context);
  let ScreenHeight = Dimensions.get('window').height;
  const [categModal, setCategModal] = useState(false);
  const [deleteDishModal, setDeleteDishModal] = useState(false);
  const [categArr, setCategArr] = useState([]);
  const [dishState, setDishState] = useState([]);
  const [dishId, setDishId] = useState('');
  const [menuId, setMenuId] = useState('');
  const [dishes, setDishes] = useState([]);
  const [deleteType, setDeleteType] = useState();
  const [deleteMenu, { isLoading: deleteMenuLoading }] = useMutation(
    DELETE_MENU,
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
    onSuccess: async res => {
      setCategArr(res.data);
    },
    onError: e => {
      alert(e?.response?.data?.message);
    },
  });

  const newCategories = categArr.filter(v => {
    return !v._id;
  });

  const DeleteMenu = async id => {
    if (id.charAt(0) == 'x') {
      setCategArr(
        categArr.filter(v => {
          return v.idMenu !== id;
        }),
      );
      setDeleteDishModal(false);
    } else {
      await deleteMenu(
        //body
        { menu_ids: [id] },
        //api response below
        {
          onSuccess: () => {
            refetchMenus();
            setDeleteDishModal(false);
          },
          onError: e => {
            alert(e.response?.data?.message);
          },
        },
      );
      // setCategArr([]);
    }
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginHorizontal: 0,
          marginTop: 20,
          marginBottom: 0,
          height: ScreenHeight,
          // backgroundColor:''
        }}
      >
        <View>
          {categArr.length
            ? categArr.map((v, i) => {
                return (
                  <Categories
                    key={i}
                    category={v.category}
                    id={v._id}
                    place_id={restaurant_id}
                    user_id={state.userDetails.user_id}
                    refetchMenus={refetchMenus}
                    categArr={categArr}
                    setCategArr={setCategArr}
                    description={description}
                    setDescription={setDescription}
                    dishName={dishName}
                    setDishName={setDishName}
                    setPrice={setPrice}
                    price={price}
                    dishes={v.dishes}
                    menu_id={v.menu_id}
                    deleteDishModal={deleteDishModal}
                    setDeleteDishModal={setDeleteDishModal}
                    dishState={dishState}
                    setDishState={setDishState}
                    menuId={menuId}
                    setMenuId={setMenuId}
                    dishId={dishId}
                    setDishId={setDishId}
                    dishess={dishes}
                    setDishess={setDishes}
                    deleteDish={deleteDish}
                    deleteMenu={DeleteMenu}
                    deleteType={deleteType}
                    setDeleteType={setDeleteType}
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
          refetchMenus={refetchMenus}
          restaurant_id={restaurant_id}
        />
        <DeleteDishModal
          deleteDishModal={deleteDishModal}
          setDeleteDishModal={setDeleteDishModal}
          dishId={dishId}
          setDishId={setDishId}
          dishes={dishes}
          setDishes={setDishes}
          menuId={menuId}
          setMenuId={setMenuId}
          deleteMenu={DeleteMenu}
          deleteType={deleteType}
          setDeleteType={setDeleteType}
          refetchMenus={refetchMenus}
        />
      </ScrollView>
    </>
  );
};

export default Menu;
