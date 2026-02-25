"use client";
import { useCart } from "../components/CartContext";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, orderType, setOrderType } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-6">
        <div className="text-center max-w-lg mt-20">
          <h1 className="text-4xl font-bold text-[#1A3C34] mb-6" style={{ fontFamily: "Cormorant Garamond, serif" }}>Coșul este gol</h1>
          <p className="text-[#2D2D2D]/60 font-light mb-10">Începeți călătoria culinară prin selecția noastră de preparate artizanale.</p>
          <Link href="/meniu" className="btn-primary">Explorați Meniul</Link>
        </div>
      </div>
    );
  }

  const deliveryFee = orderType === "delivery" ? (totalPrice >= 100 ? 0 : 10) : 0;
  const total = totalPrice + deliveryFee;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2D2D] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A3C34] mb-4 italic" style={{ fontFamily: "Cormorant Garamond, serif" }}>Coșul Dumneavoastră</h1>
          <div className="w-20 h-1 bg-[#C5A47E]"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <div className="divide-y divide-[#1A3C34]/10">
              {items.map((item) => (
                <div key={item.id} className="py-8 flex flex-col sm:flex-row gap-6 group">
                  <div className="w-28 h-36 rounded-xl overflow-hidden bg-[#1A3C34]/5 shrink-0">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} width={112} height={144} className="object-cover w-full h-full" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-[#1A3C34]/30 uppercase tracking-widest">Img</div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 pr-4">
                        <h3 className="text-2xl font-bold text-[#1A3C34] mb-2" style={{ fontFamily: "Cormorant Garamond, serif" }}>{item.name}</h3>
                        {item.description && (
                          <p className="text-sm text-[#1A3C34]/60 leading-relaxed max-w-xl mb-2">{item.description}</p>
                        )}
                        {item.gramaj && (
                          <p className="text-xs text-[#C5A47E] font-bold tracking-[0.2em] uppercase">{item.gramaj}g</p>
                        )}
                      </div>
                      <span className="font-bold text-xl text-[#1A3C34] whitespace-nowrap mt-1">{(item.price * item.quantity).toFixed(0)} lei</span>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-4 bg-white border border-[#1A3C34]/10 rounded-full px-4 py-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-[#1A3C34]/60 hover:text-[#C5A47E] transition-colors"><Minus className="w-4 h-4" /></button>
                        <span className="w-6 text-center font-bold text-[#1A3C34]">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-[#1A3C34]/60 hover:text-[#C5A47E] transition-colors"><Plus className="w-4 h-4" /></button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-[#2D2D2D]/40 hover:text-red-500 transition-colors"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-[#1A3C34]/5 sticky top-32">
              <h2 className="text-xl font-bold mb-6 text-[#1A3C34]" style={{ fontFamily: "Cormorant Garamond, serif" }}>Rezumat</h2>
              <div className="flex gap-2 mb-6 bg-[#1A3C34]/5 p-1 rounded-full">
                <button onClick={() => setOrderType("delivery")} className={`flex-1 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-colors ${orderType === "delivery" ? "bg-[#1A3C34] text-white" : "text-[#1A3C34]/60"}`}>Livrare</button>
                <button onClick={() => setOrderType("pickup")} className={`flex-1 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-colors ${orderType === "pickup" ? "bg-[#1A3C34] text-white" : "text-[#1A3C34]/60"}`}>Ridicare</button>
              </div>
              <div className="space-y-3 text-sm border-b border-[#1A3C34]/10 pb-6 mb-6">
                <div className="flex justify-between"><span className="text-[#2D2D2D]/60">Subtotal</span><span className="font-bold">{totalPrice.toFixed(0)} lei</span></div>
                {orderType === "delivery" && <div className="flex justify-between"><span className="text-[#2D2D2D]/60">Livrare</span><span className="font-bold">{deliveryFee === 0 ? "Gratuit" : `${deliveryFee} lei`}</span></div>}
              </div>
              <div className="flex justify-between items-baseline mb-8">
                <span className="text-xs tracking-widest uppercase font-bold text-[#C5A47E]">Total</span>
                <span className="text-3xl font-bold text-[#1A3C34]" style={{ fontFamily: "Cormorant Garamond, serif" }}>{total.toFixed(0)} lei</span>
              </div>
              <button onClick={() => router.push("/checkout")} className="btn-primary w-full flex items-center justify-center gap-2">
                Finalizare <ArrowRight className="w-4 h-4" />
              </button>
              <div className="mt-4 text-center">
                <Link href="/meniu" className="text-xs text-[#2D2D2D]/50 hover:text-[#C5A47E] transition-colors">← Înapoi la meniu</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
