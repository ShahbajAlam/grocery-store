import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ProductsProvider } from "@/contexts/ProductsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Grocery Store",
    description: "Get a wide range of fresh groceries at your fingertips",
};

export const revalidate = 0;

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ProductsProvider>
                    <Navbar />
                    {children}
                </ProductsProvider>
            </body>
        </html>
    );
}
