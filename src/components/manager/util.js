import moment from 'moment';
export const TotalExp = experience => {
  let totalExp = 0;
  let calcExp = experience.map(item => {
    let start_date;
    let date1 = moment(item?.start_date);
    start_date = new Date(date1);

    let end_date;
    if (item?.end_date) {
      let date2 = moment(item?.end_date);
      end_date = new Date(date2);
    } else {
      end_date = new Date();
    }
    let diff = (end_date.getTime() - start_date.getTime()) / 1000;
    diff /= 60 * 60 * 24;
    totalExp += Math.abs(Math.round(diff / 365.25));
  });
  return totalExp;
};
