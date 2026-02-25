"use client";
import { useCart } from "./CartContext";
import { X, Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function CartDrawer() {
    const { isCartOpen, setIsCartOpen, items, updateQuantity, removeItem, totalPrice, orderType, setOrderType } = useCart();
    const router = useRouter();

    useEffect(() => {
        if (isCartOpen) { document.body.style.overflow = "hidden"; }
        else { document.body.style.overflow = "unset"; }
        return () => { document.body.style.overflow = "unset"; };
    }, [isCartOpen]);

    const handleCheckout = () => { setIsCartOpen(false); router.push("/checkout"); };
    const deliveryFee = orderType === "delivery" ? (totalPrice >= 100 ? 0 : 10) : 0;
    const total = totalPrice + deliveryFee;

    const drawerVariants = {
        hidden: { x: "100%", opacity: 0.5 },
        visible: { x: "0%", opacity: 1, transition: { type: "spring" as const, stiffness: 300, damping: 30 } },
        exit: { x: "100%", opacity: 0.5, transition: { duration: 0.4, ease: "easeInOut" as const } }
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.3 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 25 } },
        exit: { opacity: 0, x: -20, scale: 0.95, transition: { duration: 0.2 } }
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    <motion.div
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-0 bg-[#1A3C34]/40 backdrop-blur-md z-[60]"
                        onClick={() => setIsCartOpen(false)}
                    />
                    <motion.div
                        variants={drawerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#FAF7F2] shadow-[0_0_50px_rgba(26,60,52,0.2)] z-[70] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-7 border-b border-[#1A3C34]/10 bg-[#FAF7F2] relative z-10">
                            <h2 className="text-3xl text-[#1A3C34] tracking-wide font-bold" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                                Coșul Dumneavoastră
                            </h2>
                            <button onClick={() => setIsCartOpen(false)} className="text-[#1A3C34]/50 hover:text-[#1A3C34] bg-white hover:bg-white border border-[#1A3C34]/10 transition-all shadow-sm p-2 rounded-full">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Order Type Toggle */}
                        <div className="px-7 pt-5 pb-2 bg-[#FAF7F2] relative z-10">
                            <div className="bg-white p-1.5 rounded-full flex gap-1 border border-[#1A3C34]/10 shadow-[inset_0_2px_4px_rgba(26,60,52,0.02)]">
                                <button
                                    onClick={() => setOrderType("delivery")}
                                    className={`flex-1 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${orderType === "delivery" ? "bg-[#1A3C34] text-white shadow-md" : "text-[#1A3C34]/50 hover:text-[#1A3C34]"}`}
                                >
                                    Livrare
                                </button>
                                <button
                                    onClick={() => setOrderType("pickup")}
                                    className={`flex-1 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${orderType === "pickup" ? "bg-[#1A3C34] text-white shadow-md" : "text-[#1A3C34]/50 hover:text-[#1A3C34]"}`}
                                >
                                    Ridicare
                                </button>
                            </div>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto px-7 py-5 no-scrollbar relative z-0">
                            {items.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="h-full flex flex-col items-center justify-center text-center space-y-5"
                                >
                                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-[#1A3C34]/20 border border-[#1A3C34]/10 shadow-sm">
                                        <ShoppingBag className="w-8 h-8" />
                                    </div>
                                    <p className="text-[#1A3C34]/40 font-semibold text-sm uppercase tracking-widest">Coșul este gol</p>
                                    <button onClick={() => setIsCartOpen(false)} className="text-[#C5A47E] font-semibold text-sm border-b border-[#C5A47E] pb-0.5 hover:text-[#1A3C34] hover:border-[#1A3C34] transition-colors">
                                        Explorează Meniul
                                    </button>
                                </motion.div>
                            ) : (
                                <div className="space-y-4">
                                    <AnimatePresence mode="popLayout">
                                        {items.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                layout
                                                variants={itemVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                className="flex gap-5 group bg-white hover:shadow-md transition-shadow duration-300 p-3.5 rounded-2xl border border-[#1A3C34]/5"
                                            >
                                                <div className="w-24 h-28 rounded-xl overflow-hidden bg-[#FAF7F2] shrink-0 relative border border-[#1A3C34]/5">
                                                    {item.image ? (
                                                        <Image src={item.image} alt={item.name} width={96} height={112} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-[10px] text-[#1A3C34]/20 uppercase font-light">Img</div>
                                                    )}
                                                </div>
                                                <div className="flex-1 flex flex-col justify-between py-1">
                                                    <div className="flex justify-between items-start gap-3">
                                                        <h3 className="text-xl font-bold text-[#1A3C34] leading-tight" style={{ fontFamily: "Cormorant Garamond, serif" }}>{item.name}</h3>
                                                        <span className="text-base font-bold text-[#1A3C34]">{(item.price * item.quantity).toFixed(0)} lei</span>
                                                    </div>
                                                    <div className="flex items-center justify-between mt-4">
                                                        <div className="flex items-center gap-4 bg-[#FAF7F2] border border-[#1A3C34]/10 rounded-full px-3 py-1.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
                                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-[#1A3C34]/50 hover:text-[#C5A47E] transition-colors"><Minus className="w-3.5 h-3.5" /></button>
                                                            <span className="w-4 text-center text-sm font-bold text-[#1A3C34]">{item.quantity}</span>
                                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-[#1A3C34]/50 hover:text-[#C5A47E] transition-colors"><Plus className="w-3.5 h-3.5" /></button>
                                                        </div>
                                                        <button onClick={() => removeItem(item.id)} className="text-[#1A3C34]/30 hover:text-red-600 hover:bg-red-50 transition-all p-2 rounded-full">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>

                        {/* Fade out gradient at bottom of scroll */}
                        {items.length > 0 && (
                            <div className="absolute bottom-[240px] left-0 w-full h-10 bg-gradient-to-t from-[#FAF7F2] to-transparent pointer-events-none z-10" />
                        )}

                        {/* Footer */}
                        {items.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-7 bg-white rounded-t-3xl border-t border-[#1A3C34]/5 shadow-[0_-10px_40px_rgba(26,60,52,0.06)] relative z-20"
                            >
                                <div className="space-y-3 mb-6 text-sm">
                                    <div className="flex justify-between items-center"><span className="text-[#1A3C34]/60 font-medium tracking-wide">Subtotal</span><span className="text-[#1A3C34] font-bold">{(totalPrice).toFixed(0)} lei</span></div>
                                    {orderType === "delivery" && (
                                        <div className="flex justify-between items-center"><span className="text-[#1A3C34]/60 font-medium tracking-wide">Livrare</span><span className="text-[#1A3C34] font-bold">{deliveryFee === 0 ? "Gratuit" : `${deliveryFee} lei`}</span></div>
                                    )}
                                </div>
                                <div className="flex justify-between items-end mb-6 pt-5 border-t border-[#1A3C34]/10">
                                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#1A3C34]/50">Total</span>
                                    <span className="text-4xl font-bold text-[#1A3C34]" style={{ fontFamily: "Cormorant Garamond, serif" }}>{total.toFixed(0)} lei</span>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <button onClick={handleCheckout} className="w-full flex items-center justify-center bg-[#1A3C34] text-white hover:bg-[#214b41] shadow-[0_8px_20px_rgba(26,60,52,0.2)] hover:shadow-[0_10px_25px_rgba(26,60,52,0.3)] transition-all duration-300 rounded-xl py-4 text-[13px] uppercase tracking-[0.15em] font-bold gap-2 group">
                                        Finalizează Comanda <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    <Link href="/cos" onClick={() => setIsCartOpen(false)} className="w-full flex items-center justify-center bg-white border border-[#1A3C34]/20 text-[#1A3C34] hover:bg-[#FAF7F2] transition-all duration-300 rounded-xl py-3.5 text-[11px] uppercase tracking-[0.15em] font-bold">
                                        Vezi tot coșul
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
