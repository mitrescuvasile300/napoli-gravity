"use client";
import { useCart } from "./CartContext";
import { X, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function CartDrawer() {
    const { isCartOpen, setIsCartOpen, items, updateQuantity, removeItem, totalPrice, orderType, setOrderType } = useCart();
    const router = useRouter();

    useEffect(() => {
        if (isCartOpen) { document.body.style.overflow = "hidden"; }
        else { document.body.style.overflow = "unset"; }
        return () => { document.body.style.overflow = "unset"; };
    }, [isCartOpen]);

    if (!isCartOpen) return null;

    const handleCheckout = () => { setIsCartOpen(false); router.push("/checkout"); };
    const deliveryFee = orderType === "delivery" ? (totalPrice >= 100 ? 0 : 10) : 0;
    const total = totalPrice + deliveryFee;

    return (
        <>
            <div className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] transition-opacity duration-500 ${isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setIsCartOpen(false)} />
            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#FAF7F2] border-l border-[#1A3C34]/10 shadow-2xl z-[70] flex flex-col transition-transform duration-500 ease-out ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>

                <div className="flex items-center justify-between p-6 border-b border-[#1A3C34]/10 bg-white">
                    <h2 className="text-2xl font-bold text-[#1A3C34]" style={{ fontFamily: "Cormorant Garamond, serif" }}>Coșul Dumneavoastră</h2>
                    <button onClick={() => setIsCartOpen(false)} className="text-[#2D2D2D]/50 hover:text-[#1A3C34] transition-colors p-1 rounded-full hover:bg-[#1A3C34]/5">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 border-b border-[#1A3C34]/10 bg-white">
                    <div className="bg-[#1A3C34]/5 p-1 rounded-full flex gap-1">
                        <button onClick={() => setOrderType("delivery")} className={`flex-1 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all ${orderType === "delivery" ? "bg-[#1A3C34] text-white shadow-md" : "text-[#1A3C34]/60"}`}>Livrare</button>
                        <button onClick={() => setOrderType("pickup")} className={`flex-1 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all ${orderType === "pickup" ? "bg-[#1A3C34] text-white shadow-md" : "text-[#1A3C34]/60"}`}>Ridicare</button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                            <p className="text-[#2D2D2D]/40 font-light text-sm">Adăugați un preparat pentru a continua.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 group bg-white p-4 rounded-xl border border-[#1A3C34]/5">
                                    <div className="w-16 h-20 rounded-lg overflow-hidden bg-[#1A3C34]/5 shrink-0">
                                        {item.image ? (
                                            <Image src={item.image} alt={item.name} width={64} height={80} className="object-cover w-full h-full" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[8px] text-[#1A3C34]/30 uppercase">Img</div>
                                        )}
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between items-start gap-2">
                                            <h3 className="text-sm font-bold text-[#1A3C34] leading-tight" style={{ fontFamily: "Cormorant Garamond, serif" }}>{item.name}</h3>
                                            <span className="text-sm font-bold text-[#1A3C34]">{(item.price * item.quantity).toFixed(0)} lei</span>
                                        </div>
                                        <div className="flex items-center justify-between mt-3">
                                            <div className="flex items-center gap-3 bg-[#1A3C34]/5 rounded-full px-3 py-1">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-[#1A3C34]/60 hover:text-[#C5A47E]"><Minus className="w-3 h-3" /></button>
                                                <span className="w-4 text-center text-xs font-bold text-[#1A3C34]">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-[#1A3C34]/60 hover:text-[#C5A47E]"><Plus className="w-3 h-3" /></button>
                                            </div>
                                            <button onClick={() => removeItem(item.id)} className="text-[#2D2D2D]/30 hover:text-red-500 transition-colors p-1"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="p-6 border-t border-[#1A3C34]/10 bg-white">
                        <div className="space-y-2 mb-6 text-sm">
                            <div className="flex justify-between"><span className="text-[#2D2D2D]/60">Subtotal</span><span className="font-bold">{totalPrice.toFixed(0)} lei</span></div>
                            {orderType === "delivery" && <div className="flex justify-between"><span className="text-[#2D2D2D]/60">Livrare</span><span className="font-bold">{deliveryFee === 0 ? "Gratuit" : `${deliveryFee} lei`}</span></div>}
                        </div>
                        <div className="flex justify-between items-baseline mb-6 pt-4 border-t border-[#1A3C34]/10">
                            <span className="text-xs tracking-widest uppercase font-bold text-[#C5A47E]">Total</span>
                            <span className="text-2xl font-bold text-[#1A3C34]" style={{ fontFamily: "Cormorant Garamond, serif" }}>{total.toFixed(0)} lei</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <Link href="/cos" onClick={() => setIsCartOpen(false)} className="btn-outline !py-3 text-center text-xs">Inspecție</Link>
                            <button onClick={handleCheckout} className="btn-primary !py-3 text-xs flex items-center justify-center gap-1">Finalizare <ArrowRight className="w-3 h-3" /></button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
