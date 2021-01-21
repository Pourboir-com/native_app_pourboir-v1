export const distributeInArray = restaurants => {
  const arrayLength = restaurants.length;
  const firstArray = restaurants.slice(0, Math.round(arrayLength / 2));
  const secondArray = restaurants.slice(Math.round(arrayLength / 2), arrayLength);
  return {
	  firstArray,
	  secondArray,
  };
};

export const restaurantDistance = item => {
  return item?.item?.distance?.rows[0]?.elements[0]?.distance?.value;
};