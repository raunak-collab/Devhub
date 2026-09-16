import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/Navbar";
import { AuthProvider } from "@/app/context/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "DevHub",
  description: "All Developer Tools in One Place",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
