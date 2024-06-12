import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { WishlistProvider } from "@/contexts/WishlistContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Grocery Store",
    description: "Get a wide range of fresh groceries at your fingertips",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <WishlistProvider>
                    <Toaster />
                    <Navbar />
                    {children}
                </WishlistProvider>
            </body>
        </html>
    );
}
