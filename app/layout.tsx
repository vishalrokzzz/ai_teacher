import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mentra",
  description: "Your learning ally",
  icons: {
    icon: "/favicon.webp", // or .png/.svg if you're using those
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} antialiased`}>
        <ClerkProvider appearance={{variables : {colorPrimary: '#2d5cf2'}}}>
          <Navbar/>
          <div className={"py-10"}>
            {children}
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
