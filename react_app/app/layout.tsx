import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
    <html lang="en">
      <body className={inter.className}>
        <nav>
          {/* <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/upload-view">Upload and View</a></li>
          </ul> */}
        </nav>
        {children}
      </body>
    </html>
  )
}
