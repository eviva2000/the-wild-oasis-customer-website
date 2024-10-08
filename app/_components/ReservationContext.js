"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

const ReservationContext = createContext();

const initialState = {
  from: undefined,
  to: undefined,
};

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);

  const resetRange = useCallback(() => setRange(initialState), [setRange]);

  const value = useMemo(
    () => ({ range, setRange, resetRange }),
    [range, setRange, resetRange]
  );

  return (
    <ReservationContext.Provider value={value}>
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

export { ReservationProvider, useReservation };
