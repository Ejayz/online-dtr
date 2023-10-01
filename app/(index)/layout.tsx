"use client";
import "../css/globals.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarForLoggedout from "../components/navbar_not_loggedin";
import { Montserrat } from "next/font/google";
const MontserratFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`h-screen w-screen flex flex-col overflow-x-hidden ${MontserratFont.variable}`}
      >
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <NavbarForLoggedout />
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
