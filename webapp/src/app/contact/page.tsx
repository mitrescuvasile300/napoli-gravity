import { MapPin, Phone, Clock, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2D2D] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl text-[#1A3C34] font-bold mb-4 italic" style={{ fontFamily: "Cormorant Garamond, serif" }}>Contact & Rezervări</h1>
          <div className="w-24 h-0.5 bg-[#C5A47E] mx-auto mb-6"></div>
          <p className="text-[#1A3C34]/60 text-lg font-light max-w-xl mx-auto">Suntem aici pentru experiența dumneavoastră culinară perfectă.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {[
            { name: "Cluj-Napoca", address: "Str. Dobrogeanu Gherea Nr. 17, Cluj-Napoca 400117", phone: "+40 264 450 500", hours: "Luni - Duminică: 10:30 - 23:00" },
            { name: "Florești", address: "Strada Florilor 325 N, Florești 407280", phone: "0364 715 555", hours: "Luni - Duminică: 11:00 - 23:00" },
          ].map(loc => (
            <div key={loc.name} className="bg-white p-10 rounded-xl shadow-sm border border-[#1A3C34]/5 hover:border-[#C5A47E] transition-colors">
              <h3 className="text-3xl font-bold mb-6 text-[#1A3C34]" style={{ fontFamily: "Cormorant Garamond, serif" }}>{loc.name}</h3>
              <div className="space-y-6 text-sm">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#C5A47E] mt-0.5 shrink-0" />
                  <p className="text-[#2D2D2D]/80">{loc.address}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-[#C5A47E] shrink-0" />
                  <a href={`tel:${loc.phone}`} className="font-bold hover:text-[#C5A47E] transition-colors">{loc.phone}</a>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-[#C5A47E] mt-0.5 shrink-0" />
                  <p className="text-[#2D2D2D]/80">{loc.hours}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="bg-white p-12 md:p-16 rounded-xl shadow-sm border border-[#1A3C34]/5 text-center">
          <Mail className="w-8 h-8 text-[#C5A47E] mx-auto mb-6" />
          <h3 className="text-3xl font-bold mb-4 text-[#1A3C34]" style={{ fontFamily: "Cormorant Garamond, serif" }}>Evenimente & Colaborări</h3>
          <p className="text-[#2D2D2D]/60 text-sm font-light leading-relaxed max-w-lg mx-auto mb-8">
            Pentru organizarea de evenimente private, rezervări de grup sau propuneri de afaceri, scrieți-ne direct.
          </p>
          <a href="mailto:contact@napolicentrale.ro" className="text-[#1A3C34] font-bold border-b-2 border-[#C5A47E] pb-1 hover:text-[#C5A47E] transition-colors">
            contact@napolicentrale.ro
          </a>
        </div>
      </div>
    </div>
  );
}
