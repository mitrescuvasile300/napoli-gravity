"use client";
import { useState, useEffect } from "react";
import { useCart, PICKUP_LOCATIONS } from "../components/CartContext";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart, orderType, setOrderType, pickupLocation, setPickupLocation } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", street: "", number: "", city: "Cluj-Napoca", notes: "",
    paymentMethod: "cash" as "cash" | "card", pickupTime: "",
  });

  const deliveryFee = orderType === "delivery" ? (totalPrice >= 100 ? 0 : 10) : 0;
  const total = totalPrice + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    setOrderId(`NC${Date.now().toString(36).toUpperCase()}`);
    setIsSuccess(true);
    clearCart();
  };

  useEffect(() => {
    if (items.length === 0 && !isSuccess) { router.push("/meniu"); }
  }, [items.length, isSuccess, router]);

  if (items.length === 0 && !isSuccess) return null;

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] pt-32 pb-24 flex items-center justify-center">
        <div className="max-w-xl mx-auto px-6 text-center bg-white p-16 rounded-xl shadow-sm border border-[#1A3C34]/5">
          <h1 className="text-5xl font-bold text-[#1A3C34] mb-6" style={{ fontFamily: "Cormorant Garamond, serif" }}>Mulțumim!</h1>
          <div className="w-16 h-1 bg-[#C5A47E] mx-auto mb-8"></div>
          <p className="text-xs text-[#2D2D2D]/50 uppercase tracking-widest mb-2">Număr Comandă</p>
          <p className="text-2xl font-bold text-[#C5A47E] tracking-wider mb-8">{orderId}</p>
          <p className="text-[#2D2D2D]/80 mb-4">
            {orderType === "delivery" ? "Preparatele vor fi livrate în 45-60 de minute." : `Comanda va fi gata la ${pickupLocation.name}.`}
          </p>
          <p className="text-[#2D2D2D]/50 text-xs uppercase tracking-widest mb-10">Veți fi contactat pentru confirmare.</p>
          <Link href="/" className="btn-primary">Înapoi Acasă</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2D2D] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A3C34] mb-4 italic" style={{ fontFamily: "Cormorant Garamond, serif" }}>Finalizare Comandă</h1>
          <div className="w-20 h-1 bg-[#C5A47E]"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Service Type */}
              <section className="bg-white p-8 rounded-xl border border-[#1A3C34]/5">
                <h2 className="text-sm font-bold tracking-widest uppercase text-[#C5A47E] mb-6">Tip Serviciu</h2>
                <div className="flex gap-6 mb-6">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="orderType" checked={orderType === "delivery"} onChange={() => setOrderType("delivery")} className="accent-[#1A3C34] w-4 h-4" />
                    <span className={`text-sm font-semibold ${orderType === "delivery" ? "text-[#1A3C34]" : "text-[#2D2D2D]/50"}`}>Livrare</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="orderType" checked={orderType === "pickup"} onChange={() => setOrderType("pickup")} className="accent-[#1A3C34] w-4 h-4" />
                    <span className={`text-sm font-semibold ${orderType === "pickup" ? "text-[#1A3C34]" : "text-[#2D2D2D]/50"}`}>Ridicare</span>
                  </label>
                </div>
                {orderType === "pickup" && (
                  <div className="space-y-4 pt-4 border-t border-[#1A3C34]/10">
                    {PICKUP_LOCATIONS.map((loc) => (
                      <label key={loc.id} className="flex flex-col cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <input type="radio" name="loc" checked={pickupLocation.id === loc.id} onChange={() => setPickupLocation(loc)} className="accent-[#1A3C34]" />
                          <span className={`text-sm font-semibold ${pickupLocation.id === loc.id ? "text-[#1A3C34]" : "text-[#2D2D2D]/50"}`}>{loc.name}</span>
                        </div>
                        <span className="text-xs text-[#2D2D2D]/40 pl-7 mt-1">{loc.address}</span>
                      </label>
                    ))}
                  </div>
                )}
              </section>

              {/* Personal Details */}
              <section className="bg-white p-8 rounded-xl border border-[#1A3C34]/5">
                <h2 className="text-sm font-bold tracking-widest uppercase text-[#C5A47E] mb-6">Date Personale</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" required placeholder="Nume Complet *" value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} className="input-minimal md:col-span-2" />
                  <input type="tel" required placeholder="Telefon *" value={formData.phone} onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))} className="input-minimal" />
                  <input type="email" placeholder="Email (opțional)" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} className="input-minimal" />
                </div>
              </section>

              {/* Delivery Address */}
              {orderType === "delivery" && (
                <section className="bg-white p-8 rounded-xl border border-[#1A3C34]/5">
                  <h2 className="text-sm font-bold tracking-widest uppercase text-[#C5A47E] mb-6">Adresă Livrare</h2>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <input type="text" required placeholder="Stradă *" value={formData.street} onChange={(e) => setFormData(p => ({ ...p, street: e.target.value }))} className="input-minimal md:col-span-9" />
                    <input type="text" required placeholder="Nr. *" value={formData.number} onChange={(e) => setFormData(p => ({ ...p, number: e.target.value }))} className="input-minimal md:col-span-3" />
                    <input type="text" required placeholder="Oraș *" value={formData.city} onChange={(e) => setFormData(p => ({ ...p, city: e.target.value }))} className="input-minimal md:col-span-12" />
                    <textarea rows={2} placeholder="Note livrare" value={formData.notes} onChange={(e) => setFormData(p => ({ ...p, notes: e.target.value }))} className="input-minimal md:col-span-12 !rounded-xl resize-none" />
                  </div>
                </section>
              )}

              {/* Payment */}
              <section className="bg-white p-8 rounded-xl border border-[#1A3C34]/5">
                <h2 className="text-sm font-bold tracking-widest uppercase text-[#C5A47E] mb-6">Metodă de Plată</h2>
                <div className="flex gap-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" value="cash" checked={formData.paymentMethod === "cash"} onChange={() => setFormData(p => ({ ...p, paymentMethod: "cash" }))} className="accent-[#1A3C34]" />
                    <span className={`text-sm font-semibold ${formData.paymentMethod === "cash" ? "text-[#1A3C34]" : "text-[#2D2D2D]/50"}`}>Numerar</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" value="card" checked={formData.paymentMethod === "card"} onChange={() => setFormData(p => ({ ...p, paymentMethod: "card" }))} className="accent-[#1A3C34]" />
                    <span className={`text-sm font-semibold ${formData.paymentMethod === "card" ? "text-[#1A3C34]" : "text-[#2D2D2D]/50"}`}>Card la livrare</span>
                  </label>
                </div>
              </section>

              <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Procesare...</> : `Confirmă Comanda — ${total.toFixed(0)} lei`}
              </button>
            </form>
          </div>

          {/* Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-[#1A3C34]/5 sticky top-32">
              <h3 className="text-xl font-bold mb-6 text-[#1A3C34]" style={{ fontFamily: "Cormorant Garamond, serif" }}>Rezumat</h3>
              <ul className="space-y-4 mb-8 text-sm">
                {items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span className="text-[#2D2D2D]/70">{item.quantity} × {item.name}</span>
                    <span className="font-bold">{(item.price * item.quantity).toFixed(0)} lei</span>
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-[#1A3C34]/10 space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-[#2D2D2D]/60">Subtotal</span><span className="font-bold">{totalPrice.toFixed(0)} lei</span></div>
                {orderType === "delivery" && <div className="flex justify-between"><span className="text-[#2D2D2D]/60">Livrare</span><span className="font-bold">{deliveryFee === 0 ? "Gratuit" : `${deliveryFee} lei`}</span></div>}
                <div className="pt-6 border-t border-[#1A3C34]/10 flex justify-between items-baseline">
                  <span className="text-xs tracking-widest uppercase font-bold text-[#C5A47E]">Total</span>
                  <span className="text-3xl font-bold text-[#1A3C34]" style={{ fontFamily: "Cormorant Garamond, serif" }}>{total.toFixed(0)} lei</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
