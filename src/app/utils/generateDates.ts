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
  } else if (mode === 'currentDate') {
    // debugger;
    let date = new Date();
    dt = new Date(); // new Date(date.setDate(date.getDate() - 1))
    end = new Date();
  }


  while (dt <= end) {
    arr.push(new Date(dt));
    dt.setDate(dt.getDate() + 1);
  }
  // debugger;  
  return arr;
};
