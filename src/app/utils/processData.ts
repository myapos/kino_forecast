import occurences from './occurences';
import extractValues from './extractValues';
import formatUnplugData from './formatUnplugData';
import formatData from './formatData';
import date2Timestamp from './date2Timestamp';
import timeseries from 'timeseries-analysis';
import smr from 'smr';
import MLR from 'ml-regression-multivariate-linear';

// export default data => {

// console.log('data:', data);

// const dataWithTimestamp = date2Timestamp(data);

// console.log('dataWithTimestamp:', dataWithTimestamp);

// let timeStamps = [];

// dataWithTimestamp.forEach(dt => {
//   const stamps = dt.map(i => [i.time]);
//   if(!stamps.length) timeStamps = [...stamps];
//     else {
//       stamps.map(i => {
//         timeStamps.push(i);
//       });
//     }
  
// });

// let results = [];
// let index = 0;


// dataWithTimestamp.forEach(dt => { 
//   const res = dt.map(i => i.results);
//   // debugger;
//   if(!index) {
//     results = [...res];
//   } else {
//     // debugger;
//     res.map( i => {
//       results.push(i);
//     })
//   }

//   index++;
// });

// console.log('timeStamps:', timeStamps);

// console.log('results:', results);

// const x = timeStamps;

// const y = results; //outputs

// const mlr = new MLR(x, y);

// console.log(mlr.predict([timeStamps[timeStamps.length - 1][0] + 30000]));

// }
// debugger;

// export default data => {
//   console.log('data:', data);

//   const dataWithTimestamp = date2Timestamp(data);

//   console.log('dataWithTimestamp:', dataWithTimestamp);

//   console.log('smr', smr);

//   var regression = new smr.Regression({ numX: 1, numY: 20 })

//   // use smr for a single date

//   const testD = dataWithTimestamp[0];

//   dataWithTimestamp.forEach(dayRes => {
//     dayRes.forEach(i => {
//       regression.push({ x: [i.time], y: i.results  })
//     })
//   });

//   regression.calculateCoefficients(); // Returns [[4.29], [5.29]]

//   // get last available result and add to timestamp 300 ms

//   const lastDaysRes = dataWithTimestamp[dataWithTimestamp.length - 1];

//   const getLastDrawOfLastDay = lastDaysRes[lastDaysRes.length - 1];

//   const lastTimeStamp = getLastDrawOfLastDay.time;

//   const stepTime = 300; //secs

//   const nextTimeStamp = lastTimeStamp + stepTime;

//   // predict next value

//   const prediction = regression.hypothesize({ x: [nextTimeStamp] }); // Returns [20.93]

//   console.log('prediction:', prediction);


//   return({
//     // result,
//     // counts,
//     // unplugData
//   });
// }

// export default data => {
//   // console.log('data:', data);

//   // extract results from all arrays to export histogram data

//   // extract all values to an array

//   const result = extractValues(data);

//   // console.log('result:', result);

//   //calculate occurences of values

//   const counts = occurences(result);

//   // console.log('counts:', counts);

//   //format data top feed unplug api

//   const unplugData = formatUnplugData(data);

//   console.log('unplugData:', unplugData);

//   // debugger;

//   const formattedData = formatData(data);

//   console.log('formattedData:', formattedData);
//   // Load the data
//   const t     = new timeseries.main(formattedData);

//   const chart_url = t.ma({period: 14}).chart({main:true});

//   // console.log('chart_url:', chart_url);

//   // const tt       = new timeseries.main(timeseries.adapter.sin({cycles:4}));

//   // const coeffs = tt.ARMaxEntropy({
//   //   degree: 3,
//   //   data:   tt.data.slice(0, 10)
//   // });

//   // The sin wave
// const tt       = new timeseries.main(timeseries.adapter.sin({cycles:4}));

// // We're going to forecast the 11th datapoint
// const forecastDatapoint  = 20;  

// // We calculate the AR coefficients of the 10 previous points
// const coeffs = t.ARMaxEntropy({
//   degree: 3,
//   data:  t.data.slice(0,10000)
// });

// // Output the coefficients to the console
// console.log(coeffs);

// // Now, we calculate the forecasted value of that 11th datapoint using the AR coefficients:
// var forecast  = 0;  // Init the value at 0.
// for (var i=0;i<coeffs.length;i++) {  // Loop through the coefficients
//   forecast -= t.data[10-i][1]*coeffs[i];
//   // Explanation for that line:
//   // t.data contains the current dataset, which is in the format [ [date, value], [date,value], ... ]
//   // For each coefficient, we substract from "forecast" the value of the "N - x" datapoint's value, multiplicated by the coefficient, where N is the last known datapoint value, and x is the coefficient's index.
// }
// console.log("forecast",forecast);

//   // debugger;

//   return({
//     result,
//     counts,
//     unplugData
//   });
// }

export default data => {
  // console.log('data:', data);

  // extract results from all arrays to export histogram data

  // extract all values to an array

  const result = extractValues(data);

  // console.log('result:', result);

  //calculate occurences of values

  const counts = occurences(result);

  console.log('counts:', counts);

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

  console.log('sorted counts:', sortableCounts);

  return({
    result,
    counts,
    sortableCounts
  });
}
