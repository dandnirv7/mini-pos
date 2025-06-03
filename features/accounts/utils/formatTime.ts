export const formatToWIB = (utcString: string = "") => {
  const date = new Date(utcString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
    hour12: false,
  };

  return date.toLocaleDateString("en-US", options).replace(",", "");
};
