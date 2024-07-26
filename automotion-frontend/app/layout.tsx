import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthState from "@/context/AuthContext";
import MobileNavigation from "@/components/web/navigation/mobile_navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <AuthState>

    <html lang="en">
      <body className={inter.className}>
      <MobileNavigation/>
        {children}</body>
    </html>
    </AuthState>
  );
}
