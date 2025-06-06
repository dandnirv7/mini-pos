"use client";

import { useParams } from "next/navigation";
import { Suspense } from "react";
import TrackingPageSkeleton from "./components/tracking-skeleton";
import TrackingView from "./components/tracking-view";
import order from "./data/order";
import { useCurrentTime } from "./hooks/useCurrentTime";
import { useProgress } from "./hooks/useProgress";
import { useRemainingTime } from "./hooks/useRemainingTime";
import { useTracking } from "./lib/queries/useTracking";

export default function OrderTrackingPage() {
  const { orderId } = useParams();
  const {
    data: trackingOrder,
    isLoading,
    isRefetching,
    refetch,
  } = useTracking(orderId as string);

  const currentTime = useCurrentTime();

  const progress = useProgress(trackingOrder, order);

  const { remainingHours, remainingMinutes } = useRemainingTime(
    order.shipping.estimatedDelivery,
    currentTime
  );

  if (isLoading || isRefetching) {
    return <TrackingPageSkeleton />;
  }

  return (
    <Suspense fallback={<TrackingPageSkeleton />}>
      <TrackingView
        trackingOrder={trackingOrder!}
        fallbackOrder={order}
        orderId={orderId}
        progress={progress}
        remainingHours={remainingHours}
        remainingMinutes={remainingMinutes}
        refetch={refetch}
      />
    </Suspense>
  );
}
