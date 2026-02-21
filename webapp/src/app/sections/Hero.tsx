import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-restaurant.png"
          alt="Napoli Centrale — Originalitatea gustului italian"
          fill
          priority
          className="object-cover scale-105 animate-[kenburns_25s_ease-in-out_infinite_alternate]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20 z-10"></div>

      {/* Hero Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <p className="text-[#C5A47E] text-sm md:text-base font-semibold tracking-[0.3em] uppercase mb-6 animate-fade-up">
          Pizzeria & Spaghetteria
        </p>
        <h1 className="text-white text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tight animate-fade-up delay-200" style={{ fontFamily: "Cormorant Garamond, serif" }}>
          Napoli Centrale
        </h1>
        <p className="text-white/80 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto animate-fade-up delay-300">
          Originalitatea gustului bucătăriei Italiene — din 1998, în inima Clujului.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-400">
          <Link href="/meniu" className="btn-primary w-full sm:w-auto !px-12 !py-4 !text-base">
            Comandă în Cluj-Napoca
          </Link>
          <Link href="/meniu" className="btn-outline w-full sm:w-auto !px-12 !py-4 !text-base backdrop-blur-sm">
            Comandă în Florești
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-fade-up delay-500">
        <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase mb-3">Descoperă</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-[#C5A47E] to-transparent"></div>
      </div>
    </section>
  );
}
