"use client";
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

const initialState = {
  from: undefined,
  to: undefined,
};

function ReservationPrivider({ children }) {
  const [range, setrange] = useState(initialState);

  const resetRange = () => setrange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setrange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }
  return context;
}

export { ReservationPrivider, useReservation };
