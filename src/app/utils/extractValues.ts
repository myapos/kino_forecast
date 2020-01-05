export default ar => {
  let result = [];
  ar &&
    ar.map &&
    ar.map(item => {
      Array.isArray(item) &&
        item.map(i => {
          //
          i &&
            i.winningNumbers.list.map(el => {
              result.push(el);
            });
        });

      // case of custom selection of draws
      if (!Array.isArray(item)) {
        item &&
          item.winningNumbers.list.map(el => {
            result.push(el);
          });
      }
    });
  return result;
};
