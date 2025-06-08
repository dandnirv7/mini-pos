import { AlertCircle, CheckCircle, Clock, Truck } from "lucide-react";
import { createElement } from "react";

/**
 * Returns a JSX icon component representing the given order status.
 *
 * @param status - The status of the order (e.g. "delivered", "shipped", etc.)
 * @returns A JSX element from lucide-react representing the status icon.
 */
export const getStatusIcon = (status: string) => {
  switch (status) {
    case "delivered":
      return createElement(CheckCircle, {
        className: "w-4 h-4 text-green-500",
      });
    case "shipped":
      return createElement(Truck, { className: "w-4 h-4 text-blue-500" });
    case "processing":
      return createElement(Clock, { className: "w-4 h-4 text-orange-500" });
    default:
      return createElement(AlertCircle, { className: "w-4 h-4 text-gray-500" });
  }
};

/**
 * Returns Tailwind CSS class names that correspond to the given order status.
 *
 * @param status - The status of the order (e.g. "delivered", "shipped", etc.)
 * @returns A string containing Tailwind CSS classes for background and text color.
 */
export const getStatusColor = (status: string): string => {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-800";
    case "shipped":
      return "bg-blue-100 text-blue-800";
    case "processing":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
