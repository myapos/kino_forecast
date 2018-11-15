export default ar => {
  let result = [];

  const formatObjects = (el, t)=> {
    //convert time to timestamp
    const matches = t.split(/-|T/);
    const reversed = `${matches[2]}-${matches[1]}-${matches[0]}T${matches[3]}`;
    // console.log('reversed:', reversed);
    const date = new Date(reversed);
    const timestamp = Math.floor(date.getTime() / 1000);
    const obj = [
      timestamp,
      el,
    ];
    result.push (obj);
  };

  ar.map( item => {
    const res = item.map (i => {
      const time = i.drawTime;
      const r = i.results.map ( el => formatObjects(el, time));
    });

  });
  return result;
}