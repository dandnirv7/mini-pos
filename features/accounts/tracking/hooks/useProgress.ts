"use client";

import { useState, useEffect } from "react";
import { FallbackTrackingItem, TrackingOrderItem } from "../types";

export const useProgress = (
  trackingOrder: TrackingOrderItem | undefined,
  fallbackOrder: FallbackTrackingItem
) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeline = trackingOrder?.timeline?.length
      ? trackingOrder.timeline
      : fallbackOrder?.timeline;

    if (timeline?.length) {
      const completed = timeline.filter((item) => item.date).length;
      const percentage = Math.round((completed / timeline.length) * 100);
      setProgress(percentage);
    }
  }, [trackingOrder, fallbackOrder]);

  return progress;
};
