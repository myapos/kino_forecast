export default ar => {
  const counts = {};
  // result = [1, 1, 5, 10, 6, 8, 3, 1, 4, 2];
  for (let i = 0; i < ar.length; i++) {
    const num = ar[i];
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }
  return counts;
}
