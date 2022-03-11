import _get from 'lodash/get';
function compareDistance(a, b) {
  // a should come before b in the sorted order
  if (restaurantCompareDistance(a) < restaurantCompareDistance(b)) {
    return -1;
    // a should come after b in the sorted order
  } else if (restaurantCompareDistance(a) > restaurantCompareDistance(b)) {
    return 1;
    // a and b are the same
  } else {
    return 0;
  }
}
export const distributeInArray = restaurants => {
  let sortedRestaurants = restaurants;
  sortedRestaurants.sort(compareDistance);
  const arrayLength = sortedRestaurants.length;
  let firstArray = [];
  let secondArray = [];
  for (let i = 0; i < arrayLength; i++) {
    if (sortedRestaurants[i]) {
      firstArray = [...firstArray, sortedRestaurants[i] || {}];
    }
    if (sortedRestaurants[i + 1]) {
      secondArray = [...secondArray, sortedRestaurants[i + 1] || {}];
    }
  }
  return {
    firstArray,
    secondArray,
    all: sortedRestaurants,
  };
};

export const sortRestaurant = res => {
  return res.sort((a, b) => {
    return (
      _get(a, 'distance.rows[0].elements[0].distance.value') -
      _get(b, 'distance.rows[0].elements[0].distance.value', '')
    );
  });
};

export const restaurantCompareDistance = item => {
  return _get(
    item,
    'item?.distance?.rows[0]?.elements[0]?.distance?.value',
    '',
  );
};

export const restaurantDistance = item => {
  return _get(item, 'item.distance.rows[0].elements[0].distance.value', '');
};

export const singleRestDistance = data => {
  return _get(data, 'distance.rows[0].elements[0].distance.value', '');
};

export const calculateDistanceInKm = distance => {
  return Number(distance) > 2000
    ? Math.round(Number(distance) / 1000) + 'km'
    : distance
    ? distance + 'm'
    : '';
};
export const isSearch = (searchVal, searchEnter) => {
  if (!searchVal) {
    return '';
  }
  if (searchEnter.trim().length >= 3) {
    return searchEnter;
  }
  return '';
};
