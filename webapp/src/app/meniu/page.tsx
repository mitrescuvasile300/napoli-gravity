"use client";
import { useState, useMemo } from "react";
import menuData from "../../data/products.json";
import { Search, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "../components/CartContext";
import { ProductModal } from "../components/ProductModal";
import Image from "next/image";

export default function MeniuPage() {
  const categoryNames = menuData.categories.map((c) => c.name);
  const [activeCategory, setActiveCategory] = useState(categoryNames[0] || "");
  const [searchQuery, setSearchQuery] = useState("");
  const { setOrderType, orderType, items: cartItems, addItem } = useCart();

  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const activeCategoryData = menuData.categories.find(
    (c) => c.name === activeCategory
  );

  const activeProducts = useMemo(() => {
    return (activeCategoryData?.products as any[])?.filter((p: any) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];
  }, [activeCategoryData, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A3C34] selection:bg-[#C5A47E]/30 pb-24">

      <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-32">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <p className="text-[#C5A47E] font-bold tracking-[0.3em] uppercase text-xs mb-4">Autentic Italian</p>
          <h2 className="text-5xl md:text-6xl font-bold text-[#1A3C34] mb-6 italic" style={{ fontFamily: "Cormorant Garamond, serif" }}>
            La Nostra Collezione
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#C5A47E] to-transparent mx-auto mb-6"></div>
          <p className="text-[#1A3C34]/60 text-lg font-light max-w-xl mx-auto leading-relaxed">
            Descoperă selecția noastră de preparate artizanale, pregătite cu pasiune și ingrediente autentice italiene.
          </p>
        </div>

        {/* Service Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1.5 rounded-full flex gap-1 border border-[#1A3C34]/10 shadow-[inset_0_2px_4px_rgba(26,60,52,0.02)] relative z-10 w-full max-w-xs">
            <button
              onClick={() => setOrderType("delivery")}
              className={`flex-1 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${orderType === "delivery" ? "bg-[#1A3C34] text-white shadow-lg shadow-[#1A3C34]/20" : "text-[#1A3C34]/50 hover:text-[#1A3C34]"}`}
            >
              Livrare
            </button>
            <button
              onClick={() => setOrderType("pickup")}
              className={`flex-1 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${orderType === "pickup" ? "bg-[#1A3C34] text-white shadow-lg shadow-[#1A3C34]/20" : "text-[#1A3C34]/50 hover:text-[#1A3C34]"}`}
            >
              Ridicare
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-10 group">
          <input
            type="text"
            placeholder="Caută în meniu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#1A3C34]/10 rounded-2xl py-3.5 pl-12 pr-5 text-sm text-[#1A3C34] font-medium focus:outline-none focus:ring-2 focus:ring-[#C5A47E]/30 focus:border-[#C5A47E]/50 placeholder:text-[#1A3C34]/30 transition-all shadow-sm hover:shadow-md"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1A3C34]/40 group-focus-within:text-[#C5A47E] transition-colors" />
        </div>

        {/* Category Pills */}
        <nav className="mb-14 overflow-x-auto no-scrollbar pb-2">
          <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 px-2 min-w-max md:min-w-0">
            {categoryNames.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setSearchQuery(""); }}
                className={`px-5 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-[0.1em] transition-all duration-300 whitespace-nowrap ${activeCategory === cat
                  ? "bg-[#1A3C34] text-white shadow-lg shadow-[#1A3C34]/20 scale-105"
                  : "bg-white text-[#1A3C34]/60 hover:text-[#1A3C34] hover:bg-white hover:shadow-md border border-[#1A3C34]/10"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </nav>

        {/* Product Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
          {activeProducts.map((product: any, idx: number) => {
            return (
              <div
                key={product.id}
                className="group flex flex-col h-full cursor-pointer animate-fade-up bg-white p-4 rounded-3xl border border-[#1A3C34]/5 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                style={{ animationDelay: `${idx * 50}ms` }}
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative aspect-[4/5] mb-5 overflow-hidden rounded-2xl bg-[#FAF7F2] border border-[#1A3C34]/5 isolate">
                  {product.image ? (
                    <img
                      src={product.image.startsWith('http') || product.image.startsWith('/') ? product.image : `/images/${product.image}`}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=400&auto=format&fit=crop";
                      }}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#1A3C34]/20 text-[10px] uppercase tracking-[0.2em] font-medium">
                      Imagine în curând
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                  <button
                    className="absolute bottom-4 right-4 size-12 bg-white/90 backdrop-blur-sm text-[#1A3C34] hover:text-white rounded-full flex items-center justify-center opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 shadow-lg hover:bg-[#1A3C34] z-20 border border-white/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      addItem({ ...product, quantity: 1 });
                    }}
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2 gap-3">
                    <h3 className="font-bold text-2xl text-[#1A3C34] leading-tight" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                      {product.name}
                    </h3>
                    <div className="flex flex-col items-end shrink-0 mt-1">
                      <span className="font-bold text-[#1A3C34] text-lg leading-none">{product.price} lei</span>
                      {product.gramaj && (
                        <span className="text-[10px] text-[#C5A47E] font-bold uppercase tracking-[0.1em] mt-1">{product.gramaj}g</span>
                      )}
                    </div>
                  </div>

                  {product.description && (
                    <p className="text-[#1A3C34]/60 text-sm leading-relaxed font-light line-clamp-2 mt-auto pt-2">
                      {product.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}

          {activeProducts.length === 0 && (
            <div className="col-span-full py-24 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-[#1A3C34]/20 border border-[#1A3C34]/10 shadow-sm mb-6">
                <Search className="w-8 h-8" />
              </div>
              <p className="text-2xl font-bold text-[#1A3C34] mb-2" style={{ fontFamily: "Cormorant Garamond, serif" }}>Nu am găsit rezultate</p>
              <p className="text-[#1A3C34]/50">Încearcă să cauți altceva sau alege o altă categorie.</p>
            </div>
          )}
        </section>
      </main>

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
