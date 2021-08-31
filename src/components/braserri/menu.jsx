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
  let ScreenHeight = Dimensions.get('window').height / 1.5;
  const [categModal, setCategModal] = useState(false);
  const [deleteDishModal, setDeleteDishModal] = useState(false);
  const [categArr, setCategArr] = useState([]);
  const [dishState, setDishState] = useState([]);
  const [dishId, setDishId] = useState();
  const [menuId, setMenuId] = useState();
  const [dishes, setDishes] = useState([]);
  const [deleteType, setDeleteType] = useState();
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
    onSuccess: res => {
      //  setCategArr(res.data);
      console.log(restaurant_id);
    },
    onError: e => {
      alert(e?.response?.data?.message);
    },
  });
  // console.log(menus);
  // console.log("start ", menus.data[0], " end");
  // console.log(state.userDetails.user_id);

  // useEffect(() => {
  //   if (!menusLoading) {
  //     setCategArr(menus.data ? menus.data : []);
  //   }
  // }, []);
  console.log(categArr, ' categarr');

  const newCategories = categArr.filter(v => {
    return !v._id;
  });
  // const all_categories = set
  console.log('new ', newCategories);
  const submitCategory = async () => {
    console.log(newCategories);
    await publishMenu(
      {
        data: newCategories || [],
        user_id: state.userDetails.user_id || '',
        place_id: restaurant_id || '',
      },
      {
        onSuccess: () => {
          alert('added new category successfully');
          refetchMenus();
        },
        onError: e => {
          alert('err new categ');
        },
      },
    );
    // setCategArr([]);
  };

  const DeleteMenu = async id => {
    console.log(id);
    if(id.charAt(0) == 'x'){
     setCategArr( categArr.filter((v) => {
      return v.idMenu !== id
    }))
    setDeleteDishModal(false)
    }else{
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
    }
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
          {categArr.length
            ? categArr.map((v, i) => {
                return (
                  <Categories
                    key={i}
                    id={v._id}
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
                    idMenu={v.idMenu}
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
          menuId={menuId}
          setMenuId={setMenuId}
          deleteMenu={DeleteMenu}
          deleteType={deleteType}
          setDeleteType={setDeleteType}
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
