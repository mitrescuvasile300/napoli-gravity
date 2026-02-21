import Hero from "./sections/Hero";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-[#FAF7F2] text-[#2D2D2D]">
      <Hero />

      {/* ═══ Dual Location Picker ═══ */}
      <section className="py-20 px-6 lg:px-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C5A47E]/30 to-transparent"></div>
        <div className="max-w-6xl mx-auto text-center mb-14">
          <p className="text-[#C5A47E] font-semibold tracking-[0.25em] uppercase text-xs mb-3">Două Locații, Aceeași Pasiune</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A3C34]" style={{ fontFamily: "Cormorant Garamond, serif" }}>
            Te așteptăm în Cluj-Napoca sau Florești
          </h2>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { name: "Napoli Centrale Cluj", address: "Str. Dobrogeanu Gherea Nr. 17", hours: "L-V: 10:30-23:00 | S-D: 11:00-23:00", phone: "+40 264 450 500", img: "/images/interior-blue-wall.webp" },
            { name: "Napoli Centrale Florești", address: "Strada Florilor 325 N", hours: "L-D: 11:00-23:00", phone: "0364 715 555", img: "/images/interior-terrace1.webp" },
          ].map((loc) => (
            <Link href="/meniu" key={loc.name} className="group relative rounded-2xl overflow-hidden h-[320px] flex items-end">
              <Image src={loc.img} alt={loc.name} fill className="object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="relative z-10 p-8 w-full">
                <h3 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: "Cormorant Garamond, serif" }}>{loc.name}</h3>
                <p className="text-white/70 text-sm mb-1">{loc.address}</p>
                <p className="text-white/50 text-xs mb-4">{loc.hours}</p>
                <div className="flex items-center justify-between">
                  <span
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = `tel:${loc.phone}`; }}
                    className="text-[#C5A47E] text-sm font-semibold hover:text-white transition-colors cursor-pointer"
                  >📞 {loc.phone}</span>
                  <span className="text-white/80 text-xs font-semibold uppercase tracking-wider group-hover:text-[#C5A47E] transition-colors flex items-center gap-1">
                    Vezi Meniul <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ Despre Noi — Story Section ═══ */}
      <section className="py-24 px-6 lg:px-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-6">
            <p className="text-[#C5A47E] font-semibold tracking-[0.25em] uppercase text-xs">Tradiție Napoletană din 1998</p>
            <h2 className="text-[#1A3C34] text-4xl md:text-5xl font-bold leading-tight" style={{ fontFamily: "Cormorant Garamond, serif" }}>
              Despre noi
            </h2>
            <div className="w-16 h-1 bg-[#C5A47E]"></div>
            <p className="text-lg leading-relaxed text-[#2D2D2D]/80">
              Pizzeria Spaghetteria Napoli Centrale este <strong>pioniera bucătăriei italianești</strong> din Cluj-Napoca, încă din anul 1998. Originalitatea gustului bucătăriei Italiene este succesul nostru — fiecare produs poartă savoarea autentică a unei plimbări pe străzile din minunatul oraș Napoli.
            </p>
            <p className="text-lg leading-relaxed text-[#2D2D2D]/80">
              Puteți savura o pizza pe minunata noastră terasă, oază de liniște în centrul Clujului, înconjurați de o grădină plină de verdeață. <strong>Conducerea familială</strong> conferă restaurantului o atmosferă primitoare care te face să te simți ca și acasă.
            </p>
            <Link href="/despre" className="inline-flex items-center gap-2 text-[#1A3C34] font-bold text-sm border-b-2 border-[#1A3C34] pb-1 hover:text-[#C5A47E] hover:border-[#C5A47E] transition-all uppercase tracking-wider">
              Află mai multe →
            </Link>
          </div>
          <div className="relative group">
            <div className="absolute -inset-3 border-2 border-[#C5A47E] rounded-2xl translate-x-4 translate-y-4 -z-10 opacity-25 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-700"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/images/interior-04.webp" alt="Interiorul restaurantului Napoli Centrale Cluj" width={700} height={550} className="w-full h-[480px] object-cover group-hover:scale-105 transition-transform duration-[1.5s]" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Interior Gallery ═══ */}
      <section className="py-20 px-6 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#C5A47E] font-semibold tracking-[0.25em] uppercase text-xs mb-3">Atmosfera Noastră</p>
            <h2 className="text-[#1A3C34] text-4xl md:text-5xl font-bold" style={{ fontFamily: "Cormorant Garamond, serif" }}>Un loc ca acasă</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden h-[400px] group">
              <Image src="/images/interior-modern-seating.jpg" alt="Zona de dining modern Napoli Centrale" fill className="object-cover group-hover:scale-105 transition-transform duration-[1.5s]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-[195px] group">
              <Image src="/images/interior-terrace2.webp" alt="Terasa restaurantului Napoli Centrale" fill className="object-cover group-hover:scale-105 transition-transform duration-[1.5s]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-[195px] group">
              <Image src="/images/interior-bar-area.jpg" alt="Barul Napoli Centrale" fill className="object-cover group-hover:scale-105 transition-transform duration-[1.5s]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-[195px] group">
              <Image src="/images/interior-terrace3.webp" alt="Terasa verde Napoli Centrale" fill className="object-cover group-hover:scale-105 transition-transform duration-[1.5s]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-[195px] group">
              <Image src="/images/interior-rustic-stone.jpg" alt="Zona rustică Napoli Centrale" fill className="object-cover group-hover:scale-105 transition-transform duration-[1.5s]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Paste Fatte in Casa — Parallax Banner ═══ */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero-pasta.png" alt="Paste fatte in casa" fill className="object-cover" style={{ objectPosition: "center 30%" }} />
        </div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h2 className="text-white text-5xl md:text-6xl font-bold mb-4 italic" style={{ fontFamily: "Cormorant Garamond, serif" }}>
            Paste "fatte in casa"
          </h2>
          <p className="text-white/80 text-xl font-light italic mb-2">O savoare autentică</p>
          <p className="text-white/60 text-base max-w-xl mx-auto mt-6 leading-relaxed">
            Lasagne, Ravioli, Tortelloni, Tagliatelle, Rigatoni, Pappardelle, Fagottini…
          </p>
          <p className="text-[#C5A47E] text-2xl mt-6 italic" style={{ fontFamily: "Cormorant Garamond, serif" }}>Che buone !!!</p>
        </div>
      </section>

      {/* ═══ Stats Section ═══ */}
      <section className="py-20 px-6 lg:px-20 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { value: "din 1998", label: "Peste 25 de ani de tradiție Napoletană" },
            { value: "300", label: "de procese chimice care creează cel mai bun aluat" },
            { value: "100%", label: "Pasiune pentru pizza Napoletană" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-5xl md:text-6xl font-bold text-[#1A3C34] mb-3" style={{ fontFamily: "Cormorant Garamond, serif" }}>{stat.value}</span>
              <p className="text-[#2D2D2D]/60 text-sm leading-relaxed max-w-[200px]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Pizza Delivery Section ═══ */}
      <section className="py-24 px-6 lg:px-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative group order-2 lg:order-1">
            <div className="absolute -inset-3 border-2 border-[#C5A47E] rounded-2xl -translate-x-4 translate-y-4 -z-10 opacity-25 group-hover:-translate-x-2 group-hover:translate-y-2 transition-transform duration-700"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/images/interior-03.webp" alt="Livrare pizza Cluj - Napoli Centrale" width={700} height={550} className="w-full h-[480px] object-cover group-hover:scale-105 transition-transform duration-[1.5s]" />
            </div>
          </div>
          <div className="space-y-6 order-1 lg:order-2">
            <p className="text-[#C5A47E] font-semibold tracking-[0.25em] uppercase text-xs">Pizza Delivery</p>
            <h2 className="text-[#1A3C34] text-4xl md:text-5xl font-bold leading-tight" style={{ fontFamily: "Cormorant Garamond, serif" }}>
              Livrări la domiciliu
            </h2>
            <div className="w-16 h-1 bg-[#C5A47E]"></div>
            <p className="text-lg leading-relaxed text-[#2D2D2D]/80">
              Ți-e poftă de o mâncare bună dar nu vrei să ieși din casă? <strong>Nici o problemă!</strong> Pizza delicioasă sau paste făcute în casă, livrate direct la ușa ta. Comandă online și bucură-te de o experiență cu totul deosebită.
            </p>
            <Link href="/meniu" className="btn-primary inline-flex mt-4">
              Comandă Online
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ Specialties Grid ═══ */}
      <section className="py-24 px-6 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-14">
          <p className="text-[#C5A47E] font-semibold tracking-[0.25em] uppercase text-xs mb-3">Din Bucătăria Noastră</p>
          <h2 className="text-[#1A3C34] text-4xl md:text-5xl font-bold" style={{ fontFamily: "Cormorant Garamond, serif" }}>Specialități</h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { img: "/images/hero-pizza.png", title: "Pizza", desc: "Pizza napoletană într-o varietate de gusturi, cu ingrediente proaspete din Campania.", alt: "Pizza napoletană" },
            { img: "/images/hero-pasta.png", title: "Paste", desc: "Cele mai bune paste \"fatte in casa\". O savoare autentică gătită cu pasiune.", alt: "Paste fatte in casa" },
            { img: "/images/food-dessert.png", title: "Deserturi", desc: "O dulce tentație italiană. De la Tiramisu clasic la Panna Cotta rafinată.", alt: "Deserturi italiene" },
          ].map((item) => (
            <Link href="/meniu" key={item.title} className="group cursor-pointer bg-[#FAF7F2] rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-500">
              <div className="aspect-[4/3] overflow-hidden relative">
                <Image src={item.img} alt={item.alt} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-[#1A3C34] group-hover:text-[#C5A47E] transition-colors" style={{ fontFamily: "Cormorant Garamond, serif" }}>{item.title}</h3>
                <p className="text-[#2D2D2D]/60 text-sm line-clamp-2 mb-4">{item.desc}</p>
                <span className="flex items-center gap-2 font-bold text-sm tracking-wider uppercase text-[#1A3C34] group-hover:text-[#C5A47E] transition-colors">
                  Vezi Meniul <span className="transition-transform group-hover:translate-x-1 inline-block">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ How to Order ═══ */}
      <section className="py-20 px-6 lg:px-20 bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto text-center mb-14">
          <p className="text-[#C5A47E] font-semibold tracking-[0.25em] uppercase text-xs mb-3">Comandă Online</p>
          <h2 className="text-[#1A3C34] text-3xl md:text-4xl font-bold" style={{ fontFamily: "Cormorant Garamond, serif" }}>
            Cea mai ușoară metodă de a comanda mâncare
          </h2>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { step: "1", title: "Alegi preparatele", desc: "Adaugi produsele preferate în coș din meniul nostru generos." },
            { step: "2", title: "Configurezi comanda", desc: "Alegi tipul serviciului (livrare sau ridicare), metoda de plată și ora dorită." },
            { step: "3", title: "Trimiți comanda", desc: "Confirmă și te relaxezi! Noi ne ocupăm de restul." },
          ].map((item) => (
            <div key={item.step} className="text-center group">
              <div className="w-16 h-16 rounded-full bg-[#1A3C34] text-white flex items-center justify-center mx-auto mb-6 text-2xl font-bold group-hover:bg-[#C5A47E] transition-colors duration-500" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                {item.step}
              </div>
              <h3 className="text-lg font-bold text-[#1A3C34] mb-2">{item.title}</h3>
              <p className="text-[#2D2D2D]/60 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-14">
          <Link href="/meniu" className="btn-primary">
            Începe Comanda
          </Link>
        </div>
      </section>

      {/* ═══ Reservations CTA ═══ */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#1A3C34]"></div>
        <div className="absolute inset-0 opacity-10">
          <Image src="/images/hero-restaurant.png" alt="" fill className="object-cover mix-blend-overlay" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-[#C5A47E] font-semibold tracking-[0.25em] uppercase text-xs mb-4">Rezervări</p>
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Cormorant Garamond, serif" }}>
            Vino să savurezi gustul autentic
          </h2>
          <p className="text-white/70 text-lg mb-4 max-w-2xl mx-auto">
            Pentru rezervări sau mese festive, ne poți contacta zilnic.
          </p>
          <a href="tel:+40264450500" className="text-[#C5A47E] text-3xl md:text-4xl font-bold hover:text-white transition-colors" style={{ fontFamily: "Cormorant Garamond, serif" }}>
            +40 264 450 500
          </a>
          <div className="flex flex-wrap justify-center gap-8 mt-10 text-white/60 text-sm">
            <div>
              <p className="text-white font-semibold mb-1">Program</p>
              <p>L-V: 10:30 - 23:00</p>
              <p>S-D: 11:00 - 23:00</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-1">Orar Livrări</p>
              <p>L-V: 10:30 - 22:30</p>
              <p>S-D: 11:00 - 22:30</p>
            </div>
          </div>
          <div className="mt-12">
            <Link href="/meniu" className="btn-gold">
              Comandă Online
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
