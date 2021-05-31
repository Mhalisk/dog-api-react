import isEmpty from "lodash/isEmpty";

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const isValidResponse = (response) => {
  if (isEmpty(response)) return false;
  if (response?.status !== 200) return false;
  if (response?.data?.status !== "success") return false;
  if (isEmpty(response?.data?.message)) return false;
  return true;
};
