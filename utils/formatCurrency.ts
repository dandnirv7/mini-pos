/**
 * Converts a number to the Indonesian Rupiah (IDR) currency format.
 * @param {number} price - The price to be formatted
 * @returns {string | undefined} - The price in IDR format or undefined if the price is invalid
 */
const toRupiahs = (price: number = 0): string | undefined => {
  if (price == null || price === 0) return undefined;

  const formattedPrice = price.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  return formattedPrice;
};

export default toRupiahs;
