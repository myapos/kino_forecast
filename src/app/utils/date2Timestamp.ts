export default ar => {
  const formatDateToTimestamp = d => {
    //convert time to timestamp
    const matches = d.split(/-|T/);
    const reversed = `${matches[2]}-${matches[1]}-${matches[0]}T${matches[3]}`;
    const date = new Date(reversed);
    const timestamp = Math.floor(date.getTime());
    return timestamp;
  };

  const result = ar.map(item => {
    const res = item.map(i => {
      //
      const time = formatDateToTimestamp(i.drawTime);
      //
      let newRes = [...i.results];
      newRes.push(time);
      // console.log('log:', time);
      return {
        time,
        results: newRes
      };
    });
    return res;
  });

  return result;
};
