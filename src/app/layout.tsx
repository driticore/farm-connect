import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import FloatingFruits from "@/components/FloatingFruits";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FarmConnect",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn("bg-background relative h-full w-full antialiased", inter.className)}>
        <main className="absolute w-full z-50">
          <Providers>
            <Navbar />
            
            <div className="flex-row flex-1">
              {children}
            </div>
          </Providers>
          
        </main>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
