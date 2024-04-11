import { createContext, useEffect, useState } from "react";

/**
 * Generate a random ID between 100000 and 999999.
 */
const randomSessionId = () => Math.floor(Math.random() * 900000) + 100000;

/**
 * Get session from local storage.
 * If no session exists, create a new session and store it in local storage.
 */
const getSessionFromLocalStorage = () => {
  const session = localStorage.getItem("session");
  if (!session) {
    // Create a new session object.
    const newSession = {
      sessionId: randomSessionId(),
      bookingId: null,
      paymentId: null,
    };

    // Store the new session object in local storage.
    localStorage.setItem("session", JSON.stringify(newSession));

    return newSession;
  }

  return JSON.parse(session);
};

/**
 * Interface
 */
interface Session {
  sessionId: null | number;
  setSessionId: (sessionId: number) => void;
  bookingId: null | number;
  setBookingId: (bookingId: number) => void;
  paymentId: null | number;
  setPaymentId: (paymentId: number) => void;
}

interface ComponentInterface {
  children: React.ReactNode;
}

export const SessionContext = createContext<Session>({
  sessionId: null,
  setSessionId: () => {},
  bookingId: null,
  setBookingId: () => {},
  paymentId: null,
  setPaymentId: () => {},
});

export default function WithSessionContext({ children }: ComponentInterface) {
  const [sessionId, setSessionId] = useState<null | number>(null);
  const [bookingId, setBookingId] = useState<null | number>(null);
  const [paymentId, setPaymentId] = useState<null | number>(null);

  useEffect(() => {
    const getSession = getSessionFromLocalStorage();
    setSessionId(getSession.sessionId);
    console.log(": ");
  }, []);

  console.log("sessionId: ", sessionId);

  return (
    <SessionContext.Provider
      value={{
        sessionId,
        setSessionId,
        bookingId,
        setBookingId,
        paymentId,
        setPaymentId,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
