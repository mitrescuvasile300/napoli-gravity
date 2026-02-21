import Image from "next/image";
import Link from "next/link";

export default function DesprePage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2D2D] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl text-[#1A3C34] font-bold mb-4 italic" style={{ fontFamily: "Cormorant Garamond, serif" }}>Povestea Noastră</h1>
          <div className="w-24 h-0.5 bg-[#C5A47E] mx-auto mb-6"></div>
          <p className="text-[#1A3C34]/60 text-lg font-light max-w-xl mx-auto">O tradiție culinară care transcende timpul și definește gustul autentic italian.</p>
        </div>

        {/* Story Block 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
          <div className="relative group">
            <div className="absolute -inset-4 border-2 border-[#C5A47E] rounded-lg translate-x-4 translate-y-4 -z-10 opacity-30 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
            <div className="relative rounded-lg overflow-hidden border-4 border-white shadow-2xl">
              <Image src="/images/hero-pizza.png" alt="Prepararea blatului" width={600} height={500} className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-[#1A3C34] text-3xl md:text-4xl font-bold leading-tight" style={{ fontFamily: "Cormorant Garamond, serif" }}>Arta Răbdării</h2>
            <div className="w-16 h-1 bg-[#C5A47E]"></div>
            <p className="text-lg leading-relaxed text-[#2D2D2D]/80">Totul începe cu apa, sarea, făina tip "00" și drojdia. Însă magia adevărată se întâmplă atunci când intervenim cel mai puțin: în timpul celor 48 de ore de dospire lentă la temperatură controlată.</p>
            <p className="text-lg leading-relaxed text-[#2D2D2D]/80">Acest proces transformă aluatul într-o operă de digerabilitate și savoare, o pânză perfectă pentru ingredientele excepționale ce vor urma.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="py-16 border-y border-[#1A3C34]/10 my-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { value: "1998", label: "Anul Fondării" },
              { value: "48h", label: "Fermentare" },
              { value: "400°", label: "Temperatură Cuptor" },
              { value: "100%", label: "Ingrediente DOP" },
            ].map(stat => (
              <div key={stat.label}>
                <span className="block text-5xl md:text-6xl font-bold text-[#1A3C34] mb-2" style={{ fontFamily: "Cormorant Garamond, serif" }}>{stat.value}</span>
                <span className="text-xs tracking-[0.2em] uppercase text-[#C5A47E] font-semibold">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Story Block 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-6 order-2 lg:order-1">
            <h2 className="text-[#1A3C34] text-3xl md:text-4xl font-bold leading-tight" style={{ fontFamily: "Cormorant Garamond, serif" }}>Respect pentru Tradiție</h2>
            <div className="w-16 h-1 bg-[#C5A47E]"></div>
            <p className="text-lg leading-relaxed text-[#2D2D2D]/80">Nu facem compromisuri. Roșiile San Marzano sunt recoltate manual de pe pantele vulcanului Vezuviu, iar mozzarella fior di latte ajunge proaspătă din regiunea Campania.</p>
            <p className="text-lg leading-relaxed text-[#2D2D2D]/80">Fiecare pizza, fiecare farfurie de paste este un omagiu adus meșteșugarilor italieni care și-au dedicat viața perfecționării acestor rețete nemuritoare.</p>
            <Link href="/meniu" className="inline-flex items-center gap-2 text-[#1A3C34] font-bold border-b-2 border-[#1A3C34] pb-1 hover:text-[#C5A47E] hover:border-[#C5A47E] transition-all">
              Descoperiți colecția noastră →
            </Link>
          </div>
          <div className="relative group order-1 lg:order-2">
            <div className="absolute -inset-4 border-2 border-[#C5A47E] rounded-lg -translate-x-4 translate-y-4 -z-10 opacity-30 group-hover:-translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
            <div className="relative rounded-lg overflow-hidden border-4 border-white shadow-2xl">
              <Image src="/images/hero-restaurant.png" alt="Interior restaurant" width={600} height={500} className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
