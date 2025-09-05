import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";
import SessionWrapper from "./_components/SessionWrapper";

export const metadata = {
  title: {
    default: "Welcome | The Wild Oasis",
    template: "%s | The Wild Oasis",
  },
  description: "The Wild Oasis is a place to relax and enjoy nature.",
};

const josefin = Josefin_Sans({ subsets: ["latin"], display: "swap" });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col`}
      >
        <SessionWrapper>
          <Header />

          <div className="flex-1 px-8 py-12 grid">
            <main className="max-w-7xl mx-auto w-full ">
              <ReservationProvider>{children}</ReservationProvider>
            </main>
          </div>
        </SessionWrapper>
      </body>
    </html>
  );
}
