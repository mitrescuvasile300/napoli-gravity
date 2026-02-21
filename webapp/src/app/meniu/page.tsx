"use client";
import { useState, useMemo } from "react";
import menuData from "../../data/products.json"; // Changed to use the new products.json
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
    <div className="min-h-screen bg-[#FAF7F2] text-slate-900 selection:bg-[#C5A47E]/30">

      <main className="max-w-7xl mx-auto px-6 md:px-20 pt-32 pb-24">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl text-[#1a3c34] mb-4 italic animate-fade-up">
            La Nostra Collezione
          </h2>
          <div className="w-24 h-0.5 bg-[#C5A47E] mx-auto mb-6"></div>
          <p className="text-[#1a3c34]/60 text-lg font-light max-w-xl mx-auto">
            Descoperă selecția noastră de preparate artizanale, pregătite cu pasiune și ingrediente autentice italiene.
          </p>
        </div>

        {/* Service Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#1a3c34]/5 p-1.5 rounded-full flex gap-1 border border-[#1a3c34]/10">
            <button
              onClick={() => setOrderType("delivery")}
              className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all ${orderType === "delivery"
                ? "bg-[#1a3c34] text-white shadow-md"
                : "text-[#1a3c34]/60 hover:text-[#1a3c34]"
                }`}
            >
              Livrare
            </button>
            <button
              onClick={() => setOrderType("pickup")}
              className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all ${orderType === "pickup"
                ? "bg-[#1a3c34] text-white shadow-md"
                : "text-[#1a3c34]/60 hover:text-[#1a3c34]"
                }`}
            >
              Ridicare
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Caută în meniu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#1a3c34]/[0.06] rounded-2xl py-3 pl-12 pr-5 text-sm text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#C5A47E]/25 focus:border-[#C5A47E]/30 placeholder:text-[#1A3C34]/30 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#1A3C34]/30" />
        </div>

        {/* Category Pills */}
        <nav className="mb-10">
          <div className="flex flex-wrap justify-center gap-2">
            {categoryNames.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setSearchQuery(""); }}
                className={`px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-[0.08em] transition-all duration-200 whitespace-nowrap ${activeCategory === cat
                  ? "bg-[#1a3c34] text-white shadow-md shadow-[#1a3c34]/15"
                  : "bg-white text-[#1a3c34]/55 hover:text-[#1a3c34] hover:bg-white hover:shadow-md border border-[#1a3c34]/[0.05] shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </nav>

        {/* Product Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {activeProducts.map((product: any, idx: number) => {
            return (
              <div
                key={product.id}
                className="group flex flex-col h-full cursor-pointer animate-fade-up"
                style={{ animationDelay: `${idx * 100}ms` }}
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative aspect-[4/5] mb-6 overflow-hidden rounded-xl bg-[#1a3c34]/5">
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
                    <div className="w-full h-full flex items-center justify-center text-[#1A3C34]/30 text-xs uppercase tracking-widest">
                      Imagine în curând
                    </div>
                  )}

                  <button
                    className="absolute bottom-4 right-4 size-12 bg-[#1a3c34] text-white rounded-full flex items-center justify-center opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 shadow-xl shadow-[#1a3c34]/30 hover:bg-[#C5A47E]"
                    onClick={(e) => {
                      e.stopPropagation();
                      addItem({ ...product, quantity: 1 });
                    }}
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif text-2xl text-[#1a3c34] group-hover:text-[#C5A47E] transition-colors leading-tight">
                    {product.name}
                  </h3>
                  <div className="flex flex-col items-end shrink-0 ml-4">
                    <span className="font-bold text-[#1a3c34] text-lg">{product.price} RON</span>
                    <span className="text-[10px] text-[#1a3c34]/40 uppercase tracking-widest whitespace-nowrap">{product.gramaj}g</span>
                  </div>
                </div>

                {product.description && (
                  <p className="text-[#1a3c34]/60 text-sm leading-relaxed font-light line-clamp-2">
                    {product.description}
                  </p>
                )}
              </div>
            );
          })}

          {activeProducts.length === 0 && (
            <div className="col-span-full py-20 text-center text-[#1A3C34]/50">
              <p className="text-xl font-serif">Nu am găsit niciun preparat.</p>
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
