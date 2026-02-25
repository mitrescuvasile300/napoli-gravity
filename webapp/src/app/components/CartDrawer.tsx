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
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
                        onClick={() => setIsCartOpen(false)}
                    />
                    <motion.div
                        variants={drawerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/5 shadow-2xl z-[70] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#0a0a0a]">
                            <h2 className="text-2xl text-white tracking-wide" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                                Coșul Dumneavoastră
                            </h2>
                            <button onClick={() => setIsCartOpen(false)} className="text-white/50 hover:text-[#C5A47E] transition-colors p-1 rounded-full hover:bg-white/5">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Order Type Toggle */}
                        <div className="p-6 border-b border-white/10 bg-[#0a0a0a]">
                            <div className="bg-white/5 p-1 rounded-full flex gap-1 border border-white/5">
                                <button
                                    onClick={() => setOrderType("delivery")}
                                    className={`flex-1 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${orderType === "delivery" ? "bg-[#C5A47E] text-black shadow-[0_0_15px_rgba(197,164,126,0.3)]" : "text-white/50 hover:text-white"}`}
                                >
                                    Livrare
                                </button>
                                <button
                                    onClick={() => setOrderType("pickup")}
                                    className={`flex-1 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${orderType === "pickup" ? "bg-[#C5A47E] text-black shadow-[0_0_15px_rgba(197,164,126,0.3)]" : "text-white/50 hover:text-white"}`}
                                >
                                    Ridicare
                                </button>
                            </div>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 no-scrollbar relative">
                            {items.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="h-full flex flex-col items-center justify-center text-center space-y-4"
                                >
                                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/20 border border-white/10">
                                        <ShoppingBag className="w-6 h-6" />
                                    </div>
                                    <p className="text-white/40 font-light text-sm uppercase tracking-widest">Coșul este gol</p>
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
                                                className="flex gap-4 group bg-white/5 hover:bg-white/[0.07] transition-colors p-3 rounded-xl border border-white/5"
                                            >
                                                <div className="w-20 h-24 rounded-lg overflow-hidden bg-black/50 shrink-0 relative border border-white/10">
                                                    {item.image ? (
                                                        <Image src={item.image} alt={item.name} width={80} height={96} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-[10px] text-white/20 uppercase font-light">Img</div>
                                                    )}
                                                </div>
                                                <div className="flex-1 flex flex-col justify-between py-1">
                                                    <div className="flex justify-between items-start gap-2">
                                                        <h3 className="text-lg text-white leading-tight" style={{ fontFamily: "Cormorant Garamond, serif" }}>{item.name}</h3>
                                                        <span className="text-sm font-semibold text-[#C5A47E]">{(item.price * item.quantity).toFixed(0)} lei</span>
                                                    </div>
                                                    <div className="flex items-center justify-between mt-3">
                                                        <div className="flex items-center gap-4 bg-black/50 border border-white/10 rounded-full px-3 py-1.5">
                                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-white/50 hover:text-white transition-colors"><Minus className="w-3 h-3" /></button>
                                                            <span className="w-4 text-center text-xs font-semibold text-white">{item.quantity}</span>
                                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-white/50 hover:text-white transition-colors"><Plus className="w-3 h-3" /></button>
                                                        </div>
                                                        <button onClick={() => removeItem(item.id)} className="text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-all p-1.5 rounded-full">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}

                            {/* Fade out gradient at bottom of scroll */}
                            {items.length > 0 && (
                                <div className="sticky bottom-0 left-0 w-full h-6 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-6 bg-[#0a0a0a] border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]"
                            >
                                <div className="space-y-3 mb-6 text-sm">
                                    <div className="flex justify-between items-center"><span className="text-white/60 font-light tracking-wide">Subtotal</span><span className="text-white">{(totalPrice).toFixed(0)} lei</span></div>
                                    {orderType === "delivery" && (
                                        <div className="flex justify-between items-center"><span className="text-white/60 font-light tracking-wide">Livrare</span><span className="text-white">{deliveryFee === 0 ? "Gratuit" : `${deliveryFee} lei`}</span></div>
                                    )}
                                </div>
                                <div className="flex justify-between items-end mb-6 pt-4 border-t border-white/10">
                                    <span className="text-[10px] tracking-[0.2em] uppercase text-white/50">Total</span>
                                    <span className="text-3xl text-[#C5A47E]" style={{ fontFamily: "Cormorant Garamond, serif" }}>{total.toFixed(0)} lei</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <Link href="/cos" onClick={() => setIsCartOpen(false)} className="flex items-center justify-center border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 rounded-lg !py-3 text-xs uppercase tracking-[0.15em] font-medium">
                                        Inspecție
                                    </Link>
                                    <button onClick={handleCheckout} className="flex items-center justify-center bg-[#C5A47E] text-black hover:bg-[#d6b793] shadow-[0_0_20px_rgba(197,164,126,0.2)] hover:shadow-[0_0_25px_rgba(197,164,126,0.4)] transition-all duration-300 rounded-lg !py-3 text-xs uppercase tracking-[0.15em] font-bold gap-2 group">
                                        Finalizare <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
