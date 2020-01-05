export default ar => {
  let result = [];
  ar.map(item => {
    Array.isArray(item) &&
      item.map(i => {
        //
        i &&
          i.results.map(el => {
            result.push(el);
          });
      });

    // case of custom selection of draws
    if (!Array.isArray(item)) {
      item &&
        item.results.map(el => {
          result.push(el);
        });
    }
  });
  return result;
};
