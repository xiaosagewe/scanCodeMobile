import moment from 'moment';

export const getInitDateRange = () => {
  const initStartDate = moment().date(1).subtract(1, 'year').format('YYYY-MM-DD');
  const initEndDate = moment().format('YYYY-MM-DD');

  return [initStartDate, initEndDate];
};


export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
