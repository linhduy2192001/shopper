export const currency = (num) => {
  return new Intl.NumberFormat().format(num);
};
