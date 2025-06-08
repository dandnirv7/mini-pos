"use client";

import { useTimer } from "react-timer-hook";
import { getExpiryTimestamp } from "../utils/getExpiryTimestamp";

export default function CountdownTimer() {
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp: getExpiryTimestamp(),
    onExpire: () => console.warn("Time's up!"),
  });

  const formatTime = (value: number) => {
    return value.toString().padStart(2, "0");
  };

  return (
    <div className="flex items-center space-x-2 font-mono">
      <div className="bg-gray-800 text-white px-2 py-1 rounded">
        {formatTime(hours)}
      </div>
      <span className="text-gray-800">:</span>
      <div className="bg-gray-800 text-white px-2 py-1 rounded">
        {formatTime(minutes)}
      </div>
      <span className="text-gray-800">:</span>
      <div className="bg-gray-800 text-white px-2 py-1 rounded">
        {formatTime(seconds)}
      </div>
    </div>
  );
}
