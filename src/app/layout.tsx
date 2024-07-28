import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";

const inter = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maxwell Malamut",
  description: "Personal Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
