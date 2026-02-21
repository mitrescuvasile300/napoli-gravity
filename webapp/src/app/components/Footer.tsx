import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#FAF7F2] py-12 px-6 lg:px-20 border-t border-[#1A3C34]/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg text-[#1A3C34]" style={{ fontFamily: "Cormorant Garamond, serif" }}>Napoli Centrale</span>
        </div>
        <div className="flex gap-8 text-sm font-medium text-[#2D2D2D]/50">
          <a className="hover:text-[#1A3C34] transition-colors flex items-center gap-1" href="#"><Instagram className="w-4 h-4" /> Instagram</a>
          <a className="hover:text-[#1A3C34] transition-colors flex items-center gap-1" href="#"><Facebook className="w-4 h-4" /> Facebook</a>
          <a className="hover:text-[#1A3C34] transition-colors" href="https://anpc.ro" target="_blank" rel="noopener noreferrer">A.N.P.C.</a>
        </div>
        <p className="text-sm text-[#2D2D2D]/40">© {new Date().getFullYear()} Napoli Centrale. Toate drepturile rezervate.</p>
      </div>
    </footer>
  );
}
