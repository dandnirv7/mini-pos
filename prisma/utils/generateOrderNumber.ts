import padNumber from "./padNumber";

export default function generateOrderNumber(date: Date, index: number): string {
  const yy = date.getFullYear().toString().slice(-2);
  const mm = (date.getMonth() + 1).toString().padStart(2, "0");
  const dd = date.getDate().toString().padStart(2, "0");
  const paddedIndex = padNumber(index, 4);
  return `NOKU${yy}${mm}${dd}${paddedIndex}`;
}
