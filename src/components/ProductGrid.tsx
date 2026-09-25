import React, { useState } from 'react';
import { Sparkles, Heart, Eye, ArrowUpDown, Check, Filter } from 'lucide-react';
import { Product, ColorVariant, CurrencyCode } from '../types';
import { CURRENCIES } from '../data/straps';
import { WatchStrapAssembly } from './WatchDialSVGs';
import { WATCH_MODELS } from '../data/watches';

interface ProductGridProps {
  products: Product[];
  currentCurrency: CurrencyCode;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onQuickView: (product: Product) => void;
  onOpenVisualizer: (watchId?: string, strapId?: string, variant?: ColorVariant) => void;
  onAddToCart: (product: Product, variant: ColorVariant, lugWidth: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  currentCurrency,
  selectedCategory,
  onSelectCategory,
  onQuickView,
  onOpenVisualizer,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
}) => {
  // Sort state
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  // Track selected swatch per product card: { [productId]: number }
  const [productSwatches, setProductSwatches] = useState<Record<string, number>>({});
  // Track added animation per product card
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const filterTabs = [
    { id: 'all', label: 'All Straps' },
    { id: 'silicone', label: 'Active Silicone' },
    { id: 'leather', label: 'Timeless Leather' },
    { id: 'nato', label: 'Rugged NATO' },
    { id: 'charms', label: 'Slide-On Mini Charms' },
  ];

  // Filtering
  const filteredProducts = products.filter((p) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'apple') {
      return p.compatibleLugWidths.some((l) => l.toLowerCase().includes('apple'));
    }
    if (selectedCategory === 'samsung') {
      return p.compatibleLugWidths.some((l) => l.toLowerCase().includes('samsung') || l.includes('20mm'));
    }
    return p.category === selectedCategory;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.priceINR - b.priceINR;
    if (sortBy === 'price-high') return b.priceINR - a.priceINR;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
  });

  const rate = CURRENCIES[currentCurrency].rate;
  const symbol = CURRENCIES[currentCurrency].symbol;

  const handleOwnIt = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const activeIndex = productSwatches[product.id] ?? product.defaultVariantIndex ?? 0;
    const selectedVariant = product.variants[activeIndex] || product.variants[0];
    const defaultLug = product.compatibleLugWidths[0] || '20mm';

    onAddToCart(product, selectedVariant, defaultLug);

    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  return (
    <section id="collection-grid" className="py-16 bg-[#FAF9F6] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-stone-200 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800">
              CURATED INTERCHANGEABLE COLLECTION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] font-display tracking-tight mt-1">
              Shop Straps for Popular Brands
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Hand-finished straps engineered for Apple Watch, Rolex, Omega, Seiko, Samsung, and universal horology.
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-start md:self-auto text-xs">
            <span className="text-stone-500 font-medium flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
              <span>SORT BY:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer"
            >
              <option value="featured">Featured / Best Sellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Filter Bar (Segmented Interactive Controls as required by Frontend Constitution) */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-10">
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl overflow-x-auto max-w-full">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onSelectCategory(tab.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-[#111827] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-stone-500 font-mono">
            Showing <strong>{sortedProducts.length}</strong> styles
          </div>
        </div>

        {/* Dynamic Product Cards Grid (3 Columns on Desktop, 2 on Tablet, 1 on Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sortedProducts.map((product) => {
            const activeVariantIndex = productSwatches[product.id] ?? product.defaultVariantIndex ?? 0;
            const activeVariant = product.variants[activeVariantIndex] || product.variants[0];
            const isWishlisted = wishlistIds.includes(product.id);
            const isAdded = addedIds[product.id];

            const formattedPrice = Math.round(product.priceINR * rate);
            const formattedOriginalPrice = product.originalPriceINR
              ? Math.round(product.originalPriceINR * rate)
              : null;

            // Pick a matching preview watch based on category
            const previewWatch =
              product.category === 'silicone'
                ? WATCH_MODELS[0] // Apple Watch Ultra
                : product.category === 'nato'
                ? WATCH_MODELS[3] // Diver
                : WATCH_MODELS[2]; // Speedmaster Moonwatch

            return (
              <div
                key={product.id}
                className="group relative bg-[#F4F3EE] rounded-2xl border border-stone-200/90 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-stone-400"
              >
                {/* Top Card Image & Live Watch Assembly Container */}
                <div
                  onClick={() => onQuickView(product)}
                  className="relative h-72 sm:h-80 bg-gradient-to-b from-[#EFEFEA] to-[#E9E8E2] flex items-center justify-center p-4 cursor-pointer overflow-hidden"
                >
                  {/* Subtle Badge Tag */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
                    {product.isBestSeller && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#111827] text-white rounded">
                        Best Seller
                      </span>
                    )}
                    {product.isNew && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-amber-700 text-white rounded">
                        New Edition
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-stone-700 hover:text-red-500 shadow-xs transition-colors cursor-pointer"
                    aria-label="Toggle Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>

                  {/* Live Rendered Assembly with dynamic swatch response */}
                  <div className="w-48 h-72 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                    <WatchStrapAssembly
                      watch={previewWatch}
                      strapVariant={activeVariant}
                      strapCategory={product.category}
                      showQuickReleasePin={true}
                      scale={0.88}
                    />
                  </div>

                  {/* "Try on Dial" Visualizer Floating Chip (Requested in brief) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenVisualizer(previewWatch.id, product.id, activeVariant);
                    }}
                    className="absolute bottom-3 left-3 z-10 px-2.5 py-1 bg-white/95 backdrop-blur-xs hover:bg-[#111827] text-stone-800 hover:text-white rounded-md text-[11px] font-semibold border border-stone-300 shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    <span>Try on Dial</span>
                  </button>

                  {/* Quick View Button overlay */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickView(product);
                    }}
                    className="absolute bottom-3 right-3 z-10 px-2.5 py-1 bg-white/95 backdrop-blur-xs hover:bg-[#111827] text-stone-800 hover:text-white rounded-md text-[11px] font-semibold border border-stone-300 shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Quick View</span>
                  </button>
                </div>

                {/* Bottom Card Content: Swatches, Title, Pricing & "OWN IT" button (Matching Screenshot 2) */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-white">
                  <div>
                    {/* Swatch dots (Clickable on card to immediately preview color) */}
                    <div className="flex items-center gap-1.5 mb-2.5">
                      {product.variants.map((v, i) => (
                        <button
                          key={v.name}
                          onClick={(e) => {
                            e.stopPropagation();
                            setProductSwatches((prev) => ({ ...prev, [product.id]: i }));
                          }}
                          className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                            activeVariantIndex === i
                              ? 'border-stone-900 scale-125 ring-1 ring-stone-900 shadow-xs'
                              : 'border-stone-300 opacity-80 hover:opacity-100 hover:scale-110'
                          }`}
                          title={v.name}
                          style={{ backgroundColor: v.colorHex }}
                        />
                      ))}
                      <span className="text-[10px] text-stone-400 ml-1 font-mono">
                        {activeVariant.name.split(' ')[0]}
                      </span>
                    </div>

                    {/* Category tag */}
                    <p className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">
                      {product.categoryLabel}
                    </p>

                    {/* Title */}
                    <h3
                      onClick={() => onQuickView(product)}
                      className="text-base font-bold text-[#111827] font-display hover:text-amber-800 transition-colors cursor-pointer mt-0.5 line-clamp-1"
                    >
                      {product.title}
                    </h3>

                    {/* Compatibility hint */}
                    <div className="mt-1 flex flex-wrap gap-1 text-[10px] text-stone-500">
                      <span>Apple</span>
                      <span>·</span>
                      <span>Samsung</span>
                      <span>·</span>
                      <span>20mm / 22mm</span>
                    </div>
                  </div>

                  {/* Price and "OWN IT" action (Matching Screenshot 2 styling: bold, clean borders, minimal) */}
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-bold font-mono text-stone-900">
                          {symbol}{formattedPrice}
                        </span>
                        {formattedOriginalPrice && (
                          <span className="text-xs font-mono text-stone-400 line-through">
                            {symbol}{formattedOriginalPrice}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-emerald-700 font-medium">
                        5-Sec Quick Release
                      </span>
                    </div>

                    {/* OWN IT Button */}
                    <button
                      onClick={(e) => handleOwnIt(product, e)}
                      className={`px-5 py-2 text-xs font-bold uppercase tracking-widest border transition-all cursor-pointer shadow-xs ${
                        isAdded
                          ? 'bg-emerald-700 text-white border-emerald-700'
                          : 'bg-white hover:bg-[#111827] text-[#111827] hover:text-white border-[#111827]'
                      }`}
                    >
                      {isAdded ? (
                        <span className="flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>ADDED</span>
                        </span>
                      ) : (
                        <span>OWN IT</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
