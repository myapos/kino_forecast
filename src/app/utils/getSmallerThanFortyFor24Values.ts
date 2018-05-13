export default ar => {
  let result = [];
  ar.map( (item, index) => {

    if(index < 24 && item[0] <= 40) {
      // console.log('item:', item);
      result.push(item);
    }
  });

  return result;
}