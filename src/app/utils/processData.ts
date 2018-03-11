export default data => {
  // debugger;
  console.log('data:', data);

  //extract results from all arrays to export histogram data

  let result = [];
  let output = [];

  data.map( item => {
    item.map(i => {
      // output = results.push(i.results);
      // debugger;
      i.results.map( el => {
        result.push(el);
      })
    })
  });

  console.log('result:', result);

  const counts = {};
  // result = [1, 1, 5, 10, 6, 8, 3, 1, 4, 2];
  for (let i = 0; i < result.length; i++) {
    const num = result[i];
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }

  console.log('counts:', counts);
}
