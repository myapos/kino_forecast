import occurences from './occurences';
import extractValues from './extractValues';
import formatUnplugData from './formatUnplugData';

export default data => {
  // console.log('data:', data);

  // extract results from all arrays to export histogram data

  // extract all values to an array

  const result = extractValues(data);

  // console.log('result:', result);

  //calculate occurences of values

  const counts = occurences(result);

  // console.log('counts:', counts);

  //format data top feed unplug api

  const unplugData = formatUnplugData(data);

  console.log('unplugData:', unplugData);
}
