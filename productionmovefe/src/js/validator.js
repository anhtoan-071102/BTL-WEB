export const isPhoneNumber = function (str) {
  if (
    str.length === 10 &&
    str.startsWith('0') &&
    typeof Number(str) === 'number'
  ) {
    return true;
  }
  return false;
};

export const isEmail = function (str) {
  const strs = str.split('@');
  if (strs.length === 2 && strs[1]?.split('.').length === 2) {
    return true;
  }
  return false;
};
