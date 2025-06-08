interface DeliveryPrefences {
  preferredTime: string;
  address: string;
  instructions: string;
}

export const deliveryPreferences: DeliveryPrefences = {
  preferredTime: "Morning (9AM - 12PM)",
  address: "Jl. Sudirman No. 123, Jakarta Pusat",
  instructions: "Leave at front door if not home",
};
