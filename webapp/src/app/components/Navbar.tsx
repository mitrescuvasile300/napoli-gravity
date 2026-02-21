"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { Menu, X, ShoppingBag } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";

  const navBg = isScrolled
    ? "bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#1A3C34]/10 py-4 shadow-sm"
    : isHome
      ? "bg-transparent py-6 border-b border-transparent"
      : "bg-[#FAF7F2] py-5 border-b border-[#1A3C34]/10";

  const textColor = isScrolled || !isHome ? "text-[#1A3C34]" : "text-white";

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-50">
            <img
              src="/images/napoli-centrale-logo.webp"
              alt="Napoli Centrale"
              className={`h-10 transition-all duration-500 ${!isScrolled && isHome ? 'brightness-0 invert' : ''}`}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {[
              { href: "/", label: "Acasă" },
              { href: "/meniu", label: "Meniu" },
              { href: "/despre", label: "Povestea Noastră" },
              { href: "/contact", label: "Contact" },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold tracking-wide transition-colors hover:text-[#C5A47E] ${pathname === link.href ? "text-[#C5A47E]" : textColor}`}
                style={!isScrolled && isHome ? { textShadow: '0 1px 8px rgba(0,0,0,0.5)' } : {}}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4 z-50">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-[#1A3C34] text-white rounded-full p-2.5 flex items-center justify-center hover:bg-[#153029] transition-all shadow-lg shadow-[#1A3C34]/20"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C5A47E] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-[#FAF7F2]">
                  {totalItems}
                </span>
              )}
            </button>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className={`w-6 h-6 ${textColor}`} /> : <Menu className={`w-6 h-6 ${textColor}`} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Mobile Menu */}
      <div className={`fixed inset-0 bg-[#FAF7F2] z-40 transition-transform duration-500 ease-out flex flex-col justify-center items-center ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <nav className="flex flex-col items-center gap-8 w-full max-w-sm">
          {[
            { href: "/", label: "Acasă" },
            { href: "/meniu", label: "Meniul Nostru" },
            { href: "/despre", label: "Povestea Noastră" },
            { href: "/contact", label: "Contact & Rezervări" },
          ].map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`text-3xl font-bold transition-colors hover:text-[#C5A47E] ${pathname === link.href ? "text-[#C5A47E]" : "text-[#1A3C34]"
                }`}
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-16 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-[#C5A47E] mb-4 font-semibold">Comenzi Rapide</p>
          <a href="tel:+40264450500" className="text-xl text-[#1A3C34] hover:text-[#C5A47E] transition-colors" style={{ fontFamily: "Cormorant Garamond, serif" }}>
            +40 264 450 500
          </a>
        </div>
      </div>
    </>
  );
}
