/**
 * Converts a number to the Indonesian Rupiah (IDR) currency format.
 * @param {number} price - The price to be formatted
 * @returns {string | undefined} - The price in IDR format or undefined if the price is invalid
 */
const toRupiahs = (price: number): string | undefined => {
  // Check if the price is valid (not null or undefined)
  if (price == null || price === 0) return undefined;

  // Format the number into IDR currency format with no decimal places
  const formattedPrice = price.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0, // No decimals
  });

  return formattedPrice;
};

export default toRupiahs;
