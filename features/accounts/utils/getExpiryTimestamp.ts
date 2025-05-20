export const getExpiryTimestamp = () => {
  const expiry = new Date();
  expiry.setHours(23, 59, 59, 999);
  return expiry;
};
