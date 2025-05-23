import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/services/api/react";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/services/auth/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chat Online",
  description: "Generated by Sebastián Contreras",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <ReactQueryProvider>
          <AuthProvider>
            <div className="fixed inset-0 -z-10 animate-gradient bg-gradient-to-br from-gradient-1 via-gradient-2 to-gradient-3 bg-[size:200%]" />
            <main>{children}</main>
            <Toaster richColors />
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
