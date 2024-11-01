import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import AuthState from "@/context/AuthContext";
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/toaster"
 
export const metadata: Metadata = {
  title: "Automotion",
  description: "Automotion",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (


    <AuthState>

      <html lang="en">
        <body className={inter.className}>
          <SessionProvider session={session}>
            {children}
          </SessionProvider>
          <Toaster/>
        </body>
      </html>
    </AuthState>

  );
}
