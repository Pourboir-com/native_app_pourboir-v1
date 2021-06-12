import moment from 'moment';

export const validateAddForm = (data, restaurant, start_date, end_date) => {
  let validateRestaurant = data?.filter(
    item => item.restaurant_id === restaurant?.restaurant_id,
  );
  if (validateRestaurant.length) {
    for (const rest of validateRestaurant) {
      const isBetween = moment(moment(start_date)).isBetween(
        moment(rest.start_date),
        moment(rest.end_date),
      );
      if (isBetween) return !isBetween;
      let isSame = moment(moment(start_date)).isSame(moment(rest.start_date));
      if (isSame) return !isSame;
      isSame = moment(moment(start_date)).isSame(moment(rest.end_date));
      if (isSame) return !isSame;
      if (end_date) {
        const isBetweenEnd = moment(moment(end_date)).isBetween(
          moment(rest.start_date),
          moment(rest.end_date),
        );
        if (isBetweenEnd) return !isBetweenEnd;
        let isSameEnd = moment(moment(end_date)).isSame(
          moment(rest.start_date),
        );
        if (isSameEnd) return !isSameEnd;
        isSameEnd = moment(moment(end_date)).isSame(moment(rest.end_date));
        if (isSameEnd) return !isSameEnd;
      }
    }
  }
  return true;
};
