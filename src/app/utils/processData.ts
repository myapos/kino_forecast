import occurences from './occurences';
import extractValues from './extractValues';
import formatUnplugData from './formatUnplugData';
import formatData from './formatData';
import date2Timestamp from './date2Timestamp';
import timeseries from 'timeseries-analysis';
import smr from 'smr';
import MLR from 'ml-regression-multivariate-linear';

export default data => {
  
  // extract results from all arrays to export histogram data

  // extract all values to an array

  const result = extractValues(data);

  // console.log('result:', result);

  //calculate occurences of values

  const counts = occurences(result);

  // console.log('counts:', counts);

  const sortableCounts = [];

  for (let c in counts) {
    if(counts.hasOwnProperty(c)) {
      sortableCounts.push({
        label: c, 
        value: counts[c]
      });
    }
  }

  sortableCounts.sort(function(a, b) {
      return b.value - a.value;
  });

  const sortableCountsAr = sortableCounts.map(i => {
    const temp = [];
    for(let key in i) {
      if(i.hasOwnProperty(key)) {
        temp.push(parseInt(i[key]));
      }
    }
    return temp;
  });

  // console.log('sorted counts:', sortableCounts);

  // console.log('sorted counts ar:', sortableCountsAr);

  return({
    result,
    counts,
    sortableCounts,
    sortableCountsAr
  });
}
