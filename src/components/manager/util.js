import moment from 'moment';
export const TotalExp = experience => {
  let totalExp = 0;
  experience.forEach(item => {
    let start_date = moment(item?.start_date).year();
    let end_date;
    if (item?.end_date) {
      end_date = moment('04/20/2021').year();
      console.log(moment('04/20/2021'));
    } else {
      end_date = new Date().getFullYear();
    }
    let diff = end_date - start_date;
    totalExp += diff;
  });
  return totalExp;
};
