"use client";

import React, { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";

export function ReservationList({ bookings }) {
  useOptimistic();

  return (
    <ul className="space-y-6">
      {bookings.map((booking) => (
        <ReservationCard booking={booking} key={booking.id} />
      ))}
    </ul>
  );
}
