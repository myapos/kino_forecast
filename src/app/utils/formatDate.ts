// export const formatDate = value =>
//   `${value.getDate()}-${value.getMonth() + 1}-${value.getFullYear()}`;

const decimalDate = num => (num < 10 ? `0${num}` : num);

export const formatDate = (date, order = "default") => {
  let formattedString = "";

  if (order === "default") {
    formattedString = `${decimalDate(date.getDate())}-${decimalDate(
      date.getMonth() + 1
    )}-${date.getFullYear()}`;
  } else {
    formattedString = `${date.getFullYear()}-${decimalDate(
      date.getMonth() + 1
    )}-${decimalDate(date.getDate())}`;
  }

  return formattedString;
};
