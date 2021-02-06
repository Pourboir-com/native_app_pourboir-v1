export let yourfilteredRestaurant = (state, place_id) => {
  return state?.yourRestaurants.map(obj =>
    obj.place_id === place_id ? { ...obj, servers: obj.servers + 1 } : obj,
  );
};
