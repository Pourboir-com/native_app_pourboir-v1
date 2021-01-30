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
export const restaurantCompareDistance = item => {
  return item?.distance?.rows[0]?.elements[0]?.distance?.value;
};
export const restaurantDistance = item => {
  return item?.item?.distance?.rows[0]?.elements[0]?.distance?.value;
};