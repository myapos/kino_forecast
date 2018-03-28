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
    let date1 = new Date();
    let date2 = new Date();
    // dt = new Date(date1.setDate(date1.getDate() - 1));
    // end = new Date(date2.setDate(date2.getDate() - 1)); //new Date(date.setDate(date.getDate() - 1));
    dt = new Date();
    end = new Date();
  }


  while (dt <= end) {
    arr.push(new Date(dt));
    dt.setDate(dt.getDate() + 1);
  }
  // debugger;  
  return arr;
};
