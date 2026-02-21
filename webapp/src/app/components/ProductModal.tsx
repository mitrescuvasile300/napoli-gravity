import { X, Plus, Minus, AlertTriangle, ChevronDown, Check, ShoppingCart } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useCart } from "./CartContext";

interface Addon {
    id: string;
    name: string;
    price: number;
}

interface Nutrient {
    type: string;
    name: string;
    per100g: number;
    unit: string;
    order: number;
}

interface ProductModalProps {
    product: any;
    isOpen: boolean;
    onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
    const [isVisible, setIsVisible] = useState(false);
    const { addItem, items, updateQuantity } = useCart();
    const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>({});
    const [specialNotes, setSpecialNotes] = useState("");
    const [openSection, setOpenSection] = useState<string | null>(null);
    const [imgLoaded, setImgLoaded] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setSelectedAddons({});
            setSpecialNotes("");
            setOpenSection(null);
            setImgLoaded(false);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen && !isVisible) return null;

    const cartItem = items.find((item: any) => item.id === product?.id);
    const quantity = cartItem?.quantity || 0;

    const addons: Addon[] = product?.addons || [];
    const nutrients: Nutrient[] = product?.nutrients || [];
    const allergens: string[] = product?.allergens || [];
    const ingredients: string = product?.ingredients || "";
    const ingredientsDetailed: string = product?.ingredientsDetailed || "";

    const addonTotal = Object.entries(selectedAddons)
        .filter(([, v]) => v)
        .reduce((sum, [id]) => {
            const addon = addons.find(a => a.id === id);
            return sum + (addon?.price || 0);
        }, 0);

    const totalPrice = (product?.price || 0) + addonTotal;

    const toggleAddon = (id: string) => {
        setSelectedAddons(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleSection = (section: string) => {
        const next = openSection === section ? null : section;
        setOpenSection(next);
        if (next) {
            setTimeout(() => {
                const el = document.getElementById(`modal-section-${section}`);
                el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 80);
        }
    };

    const nutrientLabels: Record<string, string> = {
        ENERGY: 'Energie',
        FAT: 'Grăsimi',
        SATURATED_FAT: 'din care saturate',
        CARBS: 'Glucide',
        SUGARS: 'din care zaharuri',
        PROTEIN: 'Proteine',
        FIBER: 'Fibre',
        SALT: 'Sare'
    };

    const nutrientUnit = (type: string) => type === 'ENERGY' ? 'kcal' : 'g';

    const imgSrc = product?.image
        ? (product.image.startsWith('http') || product.image.startsWith('/') ? product.image : `/images/${product.image}`)
        : '';

    const selectedCount = Object.values(selectedAddons).filter(Boolean).length;

    return (
        <div className={`fixed inset-0 z-[100] flex items-end md:items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" onClick={onClose} />

            {/* ═══ Modal Shell ═══ */}
            <div
                className={`relative w-full max-w-[1060px] md:mx-5 bg-[#FAF7F2] md:rounded-3xl rounded-t-3xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'translate-y-0 scale-100' : 'translate-y-8 scale-[0.97]'}`}
                style={{
                    maxHeight: 'min(94vh, 800px)',
                    boxShadow: '0 40px 100px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)'
                }}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3.5 right-3.5 z-30 w-9 h-9 bg-black/30 backdrop-blur-xl rounded-full flex items-center justify-center text-white/80 hover:bg-black/50 hover:text-white transition-all group"
                    aria-label="Închide"
                >
                    <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {/* Two columns */}
                <div className="flex flex-col md:flex-row" style={{ height: 'min(94vh, 800px)' }}>

                    {/* ═══ LEFT: Hero Image ═══ */}
                    <div className="md:w-[42%] relative h-52 md:h-full shrink-0 overflow-hidden">
                        {imgSrc ? (
                            <>
                                {/* Loading shimmer */}
                                {!imgLoaded && (
                                    <div className="absolute inset-0 overflow-hidden">
                                        <div className="absolute inset-0 bg-[#e0dbd3]" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-[shimmer_1.5s_infinite]" style={{ animationName: 'shimmer' }} />
                                    </div>
                                )}
                                <img
                                    src={imgSrc}
                                    onLoad={() => setImgLoaded(true)}
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop";
                                        setImgLoaded(true);
                                    }}
                                    alt={product?.name}
                                    className={`w-full h-full object-cover transition-all duration-1000 ${imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]'}`}
                                />
                                {/* Cinematic overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-black/15 pointer-events-none" />
                                {/* Bottom info on mobile */}
                                <div className="absolute bottom-0 inset-x-0 p-5 md:hidden">
                                    <h2 className="text-white text-2xl font-bold drop-shadow-xl mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                        {product?.name}
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        {product?.gramaj > 0 && <span className="text-white/50 text-xs font-medium">{product.gramaj}g</span>}
                                        <span className="text-white font-bold text-lg">{product?.price?.toFixed(2)} RON</span>
                                    </div>
                                </div>
                                {/* Desktop: Bottom-left badge */}
                                <div className="absolute bottom-4 left-4 hidden md:block">
                                    <div className="bg-white/15 backdrop-blur-xl rounded-xl px-4 py-2.5 border border-white/10">
                                        <span className="text-white font-extrabold text-xl tracking-tight">{product?.price?.toFixed(2)} <span className="text-sm font-medium text-white/60">RON</span></span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#e8e3db] to-[#ddd7cd] min-h-[200px] md:min-h-full">
                                <div className="w-16 h-16 rounded-2xl bg-white/40 flex items-center justify-center mb-3 backdrop-blur-sm">
                                    <span className="text-3xl">🍽️</span>
                                </div>
                                <span className="text-[#1A3C34]/20 font-serif text-sm italic">Napoli Centrale</span>
                            </div>
                        )}
                    </div>

                    {/* ═══ RIGHT: Content ═══ */}
                    <div ref={scrollRef} className="md:w-[58%] flex flex-col overflow-y-auto overscroll-contain scrollbar-thin">

                        <div className="flex-1 p-5 md:p-7 lg:p-8">

                            {/* ── Name + Meta ── */}
                            <div className="hidden md:block mb-5">
                                <h2 className="text-[1.65rem] lg:text-[1.9rem] text-[#1A3C34] font-bold leading-[1.12] mb-2.5" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                    {product?.name}
                                </h2>
                                {product?.gramaj > 0 && (
                                    <span className="inline-block text-[10px] font-bold text-[#1A3C34]/30 uppercase tracking-[0.2em] border border-[#1A3C34]/[0.07] px-2.5 py-1 rounded-md">{product.gramaj}g</span>
                                )}
                            </div>

                            {/* ── Description ── */}
                            {product?.description && (
                                <div className="mb-5 flex gap-3">
                                    <div className="w-[3px] shrink-0 rounded-full bg-gradient-to-b from-[#C5A47E] via-[#C5A47E]/40 to-transparent mt-1" />
                                    <p className="text-[#1A3C34]/55 text-[13px] leading-[1.8] font-light">
                                        {product.description}
                                    </p>
                                </div>
                            )}

                            {/* ── Divider ── */}
                            <div className="h-px bg-gradient-to-r from-[#1A3C34]/[0.06] via-[#1A3C34]/[0.04] to-transparent mb-5" />

                            {/* ── Add-ons ── */}
                            {addons.length > 0 && (
                                <div className="mb-5">
                                    <div className="flex items-baseline justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-[11px] font-extrabold text-[#1A3C34] uppercase tracking-[0.14em]">Extra</h4>
                                            {selectedCount > 0 && (
                                                <span className="bg-[#C5A47E] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{selectedCount}</span>
                                            )}
                                        </div>
                                        <span className="text-[9px] text-[#1A3C34]/25 font-medium uppercase tracking-wider">opțional</span>
                                    </div>
                                    <div className="grid gap-1.5">
                                        {addons.map((addon) => {
                                            const selected = !!selectedAddons[addon.id];
                                            return (
                                                <button
                                                    key={addon.id}
                                                    onClick={() => toggleAddon(addon.id)}
                                                    className={`group flex items-center justify-between w-full px-4 py-3 rounded-[14px] text-left transition-all duration-250 ${selected
                                                            ? 'bg-[#1A3C34] shadow-lg shadow-[#1A3C34]/15 scale-[1.01]'
                                                            : 'bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:scale-[1.005]'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-[18px] h-[18px] rounded-[5px] border-[1.5px] flex items-center justify-center transition-all duration-200 ${selected ? 'bg-[#C5A47E] border-[#C5A47E] shadow-sm shadow-[#C5A47E]/30' : 'border-[#1A3C34]/12 group-hover:border-[#C5A47E]/40'
                                                            }`}>
                                                            <Check size={9} className={`text-white transition-all duration-200 ${selected ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} strokeWidth={4} />
                                                        </div>
                                                        <span className={`text-[13px] font-medium transition-colors ${selected ? 'text-white' : 'text-[#1A3C34]/70'}`}>{addon.name}</span>
                                                    </div>
                                                    <span className={`text-[12px] font-bold tabular-nums transition-colors ${selected ? 'text-[#C5A47E]' : 'text-[#C5A47E]/60'}`}>+{addon.price.toFixed(0)} lei</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* ── Notes ── */}
                            <div className="mb-5">
                                <label className="block text-[10px] font-bold text-[#1A3C34]/30 uppercase tracking-[0.14em] mb-1.5">Mențiuni</label>
                                <textarea
                                    value={specialNotes}
                                    onChange={(e) => setSpecialNotes(e.target.value)}
                                    placeholder="Ex: fără ceapă, extra picant..."
                                    rows={2}
                                    className="w-full bg-white rounded-[14px] p-3.5 text-[13px] text-[#1A3C34] placeholder:text-[#1A3C34]/18 focus:outline-none focus:ring-2 focus:ring-[#C5A47E]/15 resize-none transition-all shadow-[0_1px_2px_rgba(0,0,0,0.03)] focus:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
                                />
                            </div>

                            {/* ── Allergens ── */}
                            {allergens.length > 0 && (
                                <div className="mb-5 flex gap-3 bg-gradient-to-r from-amber-50/80 to-orange-50/40 rounded-[14px] p-3.5 border border-amber-200/30">
                                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200/60 flex items-center justify-center shrink-0">
                                        <AlertTriangle size={13} className="text-amber-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[9px] font-extrabold text-amber-700/60 uppercase tracking-[0.14em] mb-1.5">Alergeni</p>
                                        <div className="flex flex-wrap gap-1">
                                            {allergens.map((a: string, i: number) => (
                                                <span key={a} className="text-[10px] font-semibold text-amber-700/65">
                                                    {a}{i < allergens.length - 1 ? <span className="text-amber-300 mx-0.5">·</span> : ''}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ── Accordion: Ingrediente ── */}
                            {(ingredients || ingredientsDetailed) && (
                                <div id="modal-section-ingredients" className="border-t border-[#1A3C34]/[0.05]">
                                    <button
                                        onClick={() => toggleSection('ingredients')}
                                        className="flex items-center justify-between w-full py-3.5 group"
                                    >
                                        <span className="text-[10px] font-extrabold text-[#1A3C34]/50 uppercase tracking-[0.18em] group-hover:text-[#1A3C34]/80 transition-colors">
                                            Ingrediente
                                        </span>
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${openSection === 'ingredients' ? 'rotate-180 bg-[#C5A47E]/10' : 'bg-transparent'}`}>
                                            <ChevronDown size={13} className={`transition-colors ${openSection === 'ingredients' ? 'text-[#C5A47E]' : 'text-[#1A3C34]/20 group-hover:text-[#1A3C34]/40'}`} />
                                        </div>
                                    </button>
                                    {openSection === 'ingredients' && (
                                        <div className="pb-4 space-y-3">
                                            {ingredients && (
                                                <div className="flex flex-wrap gap-1.5">
                                                    {ingredients.split(',').map((ing: string, i: number) => (
                                                        <span key={i} className="inline-flex items-center px-2.5 py-1 bg-white rounded-lg text-[11px] font-medium text-[#1A3C34]/55 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                                                            {ing.trim()}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            {ingredientsDetailed && (
                                                <details className="group/details">
                                                    <summary className="text-[10px] font-semibold text-[#1A3C34]/25 uppercase tracking-wider cursor-pointer hover:text-[#1A3C34]/40 transition-colors list-none flex items-center gap-1.5">
                                                        <ChevronDown size={10} className="transition-transform group-open/details:rotate-180" />
                                                        Detalii complete
                                                    </summary>
                                                    <p className="mt-2 text-[10px] text-[#1A3C34]/30 leading-[1.7] bg-[#1A3C34]/[0.015] p-3 rounded-xl">
                                                        {ingredientsDetailed}
                                                    </p>
                                                </details>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* ── Accordion: Valori Nutriționale ── */}
                            {nutrients.length > 0 && (
                                <div id="modal-section-nutrients" className="border-t border-[#1A3C34]/[0.05]">
                                    <button
                                        onClick={() => toggleSection('nutrients')}
                                        className="flex items-center justify-between w-full py-3.5 group"
                                    >
                                        <span className="text-[10px] font-extrabold text-[#1A3C34]/50 uppercase tracking-[0.18em] group-hover:text-[#1A3C34]/80 transition-colors">
                                            Valori nutriționale
                                        </span>
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${openSection === 'nutrients' ? 'rotate-180 bg-[#C5A47E]/10' : 'bg-transparent'}`}>
                                            <ChevronDown size={13} className={`transition-colors ${openSection === 'nutrients' ? 'text-[#C5A47E]' : 'text-[#1A3C34]/20 group-hover:text-[#1A3C34]/40'}`} />
                                        </div>
                                    </button>
                                    {openSection === 'nutrients' && (
                                        <div className="pb-4">
                                            <div className="rounded-xl overflow-hidden bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                                                {/* Header */}
                                                <div className="flex px-4 py-2 bg-[#1A3C34]/[0.02] border-b border-[#1A3C34]/[0.04]">
                                                    <span className="flex-1" />
                                                    <span className="text-[9px] font-bold text-[#1A3C34]/35 uppercase tracking-wider w-16 text-right">100g</span>
                                                    {product?.gramaj > 0 && (
                                                        <span className="text-[9px] font-bold text-[#1A3C34]/35 uppercase tracking-wider w-16 text-right">Porție</span>
                                                    )}
                                                </div>
                                                {nutrients.map((n, i) => {
                                                    const isChild = n.type === 'SATURATED_FAT' || n.type === 'SUGARS';
                                                    const per = product?.gramaj > 0 ? (n.per100g * product.gramaj / 100) : null;
                                                    const isLast = i === nutrients.length - 1;
                                                    return (
                                                        <div key={n.type} className={`flex items-center px-4 py-[7px] ${!isLast ? 'border-b border-[#1A3C34]/[0.03]' : ''}`}>
                                                            <span className={`flex-1 text-[11px] ${isChild ? 'pl-3 text-[#1A3C34]/30 italic font-normal' : 'text-[#1A3C34]/55 font-medium'}`}>
                                                                {nutrientLabels[n.type] || n.name}
                                                            </span>
                                                            <span className={`text-[11px] w-16 text-right tabular-nums ${isChild ? 'text-[#1A3C34]/30' : 'text-[#1A3C34]/50'}`}>
                                                                {n.per100g.toFixed(1)}<span className="text-[9px] ml-0.5 text-[#1A3C34]/25">{nutrientUnit(n.type)}</span>
                                                            </span>
                                                            {product?.gramaj > 0 && per !== null && (
                                                                <span className={`text-[11px] w-16 text-right tabular-nums ${isChild ? 'text-[#1A3C34]/30' : 'text-[#1A3C34]/50'}`}>
                                                                    {per.toFixed(1)}<span className="text-[9px] ml-0.5 text-[#1A3C34]/25">{nutrientUnit(n.type)}</span>
                                                                </span>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>

                        {/* ═══ Sticky CTA ═══ */}
                        <div className="sticky bottom-0 z-10 shrink-0">
                            {/* Fade gradient */}
                            <div className="h-6 bg-gradient-to-t from-[#FAF7F2] to-transparent pointer-events-none -mt-6 relative z-[1]" />
                            <div className="bg-[#FAF7F2] px-5 md:px-7 lg:px-8 pb-5 pt-2">
                                <div className="flex items-center gap-2">
                                    {quantity > 0 && (
                                        <div className="flex items-center bg-white rounded-full px-0.5 py-0.5 shrink-0 shadow-sm border border-[#1A3C34]/[0.05]">
                                            <button
                                                onClick={() => updateQuantity(product?.id, quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center rounded-full text-[#1A3C34]/40 hover:text-[#1A3C34] hover:bg-[#FAF7F2] transition-colors active:scale-90"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="font-bold text-[#1A3C34] text-sm w-5 text-center tabular-nums">{quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(product?.id, quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center rounded-full text-[#C5A47E] hover:bg-[#C5A47E]/10 transition-colors active:scale-90"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    )}
                                    <button
                                        onClick={() => {
                                            const sel = addons.filter(a => selectedAddons[a.id]);
                                            addItem({ ...product, quantity: 1, selectedAddons: sel, specialNotes, totalPrice });
                                        }}
                                        className="flex-1 relative overflow-hidden bg-[#1A3C34] text-white py-3.5 px-5 rounded-[14px] font-bold text-[12px] uppercase tracking-[0.12em] transition-all duration-200 flex items-center justify-center gap-2.5 hover:shadow-xl hover:shadow-[#1A3C34]/20 active:scale-[0.98] group"
                                    >
                                        {/* Shine effect on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                        <ShoppingCart size={15} strokeWidth={2.5} className="relative z-[1]" />
                                        <span className="relative z-[1]">Adaugă · {totalPrice.toFixed(2)} RON</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
