import { startDate, endDate } from '../server_constants';

export const generateDates = () => {
  let
    arr = new Array(),
    dt = new Date(startDate);

  while (dt <= endDate) {
    arr.push(new Date(dt));
    dt.setDate(dt.getDate() + 1);
  }

  return arr;

}