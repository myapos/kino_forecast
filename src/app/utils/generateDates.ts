import { startDate, endDate } from '../constants';

export const generateDates = (mode, payload) => {
  let arr = new Array();
  let dt, start, end;
  // debugger;
  if(mode === 'init') {
    dt = new Date(startDate);
    end = endDate;
  } else if (mode === 'range') {
    // debugger;
    dt = new Date(payload.start);
    end = new Date(payload.end);
  }


  while (dt <= end) {
    arr.push(new Date(dt));
    dt.setDate(dt.getDate() + 1);
  }
  return arr;
};
