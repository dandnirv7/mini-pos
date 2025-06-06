"use client";

import { useState, useEffect } from "react";

export const useRemainingTime = (
  estimatedDelivery: Date,
  currentTime: Date
) => {
  const [, setRemainingTime] = useState(0);
  const [remainingHours, setRemainingHours] = useState(0);
  const [remainingMinutes, setRemainingMinutes] = useState(0);

  useEffect(() => {
    const remaining = Math.max(
      0,
      estimatedDelivery.getTime() - currentTime.getTime()
    );
    setRemainingTime(remaining);
    setRemainingHours(Math.floor(remaining / (1000 * 60 * 60)));
    setRemainingMinutes(
      Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
    );
  }, [estimatedDelivery, currentTime]);

  return { remainingHours, remainingMinutes };
};
