import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Queryprovider from "@/providers/QueryProvider";
import NavBar from "@/components/navigation/navbar";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CookPe",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Queryprovider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NavBar />
            {children}
            <Toaster closeButton={true} duration={900} />
          </ThemeProvider>
        </Queryprovider>
      </body>
    </html>
  );
}
