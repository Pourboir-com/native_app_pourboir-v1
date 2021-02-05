export let filteredRestaurant = (state, place_id) =>
  state?.restaurantsDetails.map(obj =>
    obj.place_id === place_id ? { ...obj, servers: obj.servers + 1 } : obj,
  );
