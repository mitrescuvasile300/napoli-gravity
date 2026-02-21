import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./components/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";

export const metadata: Metadata = {
  title: "Napoli Centrale — Pizza & Paste Autentice Italienești | Cluj-Napoca",
  description:
    "Pioniera bucătăriei cu specific italianesc din Cluj Napoca, din 1998. Pizza napoletană coaptă în cuptor cu lemne, paste proaspete făcute în casă și deserturi autentice. Comandă online cu livrare sau ridicare.",
  keywords: "pizza cluj, paste italiene, restaurant italian cluj, napoli centrale, pizza delivery cluj, pizza napoletana",
  openGraph: {
    title: "Napoli Centrale — Pizza & Paste Autentice Italienești",
    description: "Savoarea autentică a Italiei, din 1998 în Cluj-Napoca. Comandă online!",
    type: "website",
    locale: "ro_RO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
