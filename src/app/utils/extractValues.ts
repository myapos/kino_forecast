export default ar => {
  let result = [];
  ar.map( item => {
      Array.isArray(item) && item.map(i => {
      // debugger;
      i.results.map( el => {
        result.push(el);
      })
    })
  });
  return result;
}