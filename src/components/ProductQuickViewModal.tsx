import React, { useState } from 'react';
import { X, Star, ShieldCheck, Truck, RotateCcw, Check, ShoppingBag, Sparkles, Heart } from 'lucide-react';
import { Product, ColorVariant, CurrencyCode } from '../types';
import { CURRENCIES } from '../data/straps';
import { WatchStrapAssembly } from './WatchDialSVGs';
import { WATCH_MODELS } from '../data/watches';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, variant: ColorVariant, lugWidth: string) => void;
  onOpenVisualizer: (watchId?: string, strapId?: string, variant?: ColorVariant) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  currentCurrency: CurrencyCode;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenVisualizer,
  isWishlisted,
  onToggleWishlist,
  currentCurrency,
}) => {
  if (!product) return null;

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(product.defaultVariantIndex || 0);
  const [selectedLugWidth, setSelectedLugWidth] = useState(product.compatibleLugWidths[0]);
  const [selectedWatchPreviewIndex, setSelectedWatchPreviewIndex] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const selectedVariant = product.variants[selectedVariantIndex] || product.variants[0];
  const rate = CURRENCIES[currentCurrency].rate;
  const symbol = CURRENCIES[currentCurrency].symbol;

  const formattedPrice = Math.round(product.priceINR * rate);
  const formattedOriginalPrice = product.originalPriceINR ? Math.round(product.originalPriceINR * rate) : null;

  const handleAdd = () => {
    onAddToCart(product, selectedVariant, selectedLugWidth);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FAF9F6] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-stone-900 bg-white/80 hover:bg-white rounded-full border border-stone-200 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Left Column: Interactive Watch preview with the chosen strap variant */}
          <div className="md:col-span-6 bg-[#F4F3EE] p-6 sm:p-8 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-stone-200">
            <div className="w-full flex items-center justify-between text-xs text-stone-500 mb-2">
              <span className="font-semibold uppercase tracking-wider text-stone-900">
                {product.categoryLabel}
              </span>
              <button
                onClick={() => onToggleWishlist(product)}
                className="flex items-center gap-1 text-stone-700 hover:text-red-600 transition-colors"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                <span>{isWishlisted ? 'Wishlisted' : 'Save'}</span>
              </button>
            </div>

            {/* Dial Switcher Pill */}
            <div className="flex items-center gap-1.5 p-1 bg-white rounded-lg border border-stone-200 text-xs mb-4">
              <span className="text-[10px] text-stone-400 uppercase font-mono px-2">Preview On:</span>
              {WATCH_MODELS.slice(0, 3).map((w, idx) => (
                <button
                  key={w.id}
                  onClick={() => setSelectedWatchPreviewIndex(idx)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    selectedWatchPreviewIndex === idx
                      ? 'bg-[#111827] text-white shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {w.brand}
                </button>
              ))}
            </div>

            {/* Rendered Live Assembly */}
            <div className="w-56 h-80 flex items-center justify-center py-2">
              <WatchStrapAssembly
                watch={WATCH_MODELS[selectedWatchPreviewIndex]}
                strapVariant={selectedVariant}
                strapCategory={product.category}
                showQuickReleasePin={true}
                scale={0.92}
              />
            </div>

            {/* Visualizer Trigger Button */}
            <button
              onClick={() => {
                onClose();
                onOpenVisualizer(WATCH_MODELS[selectedWatchPreviewIndex].id, product.id, selectedVariant);
              }}
              className="mt-4 w-full py-2 bg-white text-stone-900 border border-stone-300 rounded-lg text-xs font-semibold hover:bg-stone-50 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Open in Full 3D/2D Visualizer Studio</span>
            </button>
          </div>

          {/* Right Column: PDP Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                  <div className="flex items-center text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold ml-1 text-stone-900">{product.rating}</span>
                  </div>
                  <span>·</span>
                  <span>{product.reviewsCount} verified reviews</span>
                </div>
                <h3 className="text-2xl font-bold text-[#111827] font-display">{product.title}</h3>
                <p className="text-xs text-stone-500 mt-1">{product.subtitle}</p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold font-mono text-stone-900">
                  {symbol}{formattedPrice}
                </span>
                {formattedOriginalPrice && (
                  <span className="text-sm font-mono text-stone-400 line-through">
                    {symbol}{formattedOriginalPrice}
                  </span>
                )}
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  In Stock · Ready to Ship
                </span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">{product.description}</p>

              {/* Color Swatches */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-stone-900">Color Variant:</span>
                  <span className="text-stone-600 font-medium">{selectedVariant.name}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.variants.map((v, i) => (
                    <button
                      key={v.name}
                      onClick={() => setSelectedVariantIndex(i)}
                      className={`relative w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${
                        selectedVariantIndex === i
                          ? 'border-stone-900 scale-110 shadow-sm'
                          : 'border-transparent hover:scale-105'
                      }`}
                      title={v.name}
                    >
                      <span
                        className="absolute inset-0.5 rounded-full border border-stone-300"
                        style={{ backgroundColor: v.colorHex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Lug Width Selector */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-stone-900">Lug Width / Compatibility:</span>
                  <span className="text-[11px] text-amber-800 font-medium">Toolless Quick-Release</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {product.compatibleLugWidths.map((width) => (
                    <button
                      key={width}
                      onClick={() => setSelectedLugWidth(width)}
                      className={`px-3 py-2 text-xs font-semibold rounded-lg border text-left transition-all cursor-pointer ${
                        selectedLugWidth === width
                          ? 'bg-[#111827] text-white border-[#111827] shadow-xs'
                          : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {width}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material specifications bullet list */}
              <div className="p-3 bg-stone-100 rounded-lg text-[11px] space-y-1.5 text-stone-700">
                <p><strong>Material:</strong> {product.material}</p>
                <p><strong>Hardware:</strong> {product.hardware}</p>
                <p><strong>Water Resistance:</strong> {product.waterproof ? '100% Salt & Sweat Waterproof' : 'Splash & Rain Resistant'}</p>
              </div>
            </div>

            {/* Actions: Add to Bag (OWN IT) */}
            <div className="pt-4 border-t border-stone-200 space-y-2.5">
              <button
                onClick={handleAdd}
                className={`w-full py-3 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#111827] hover:bg-stone-800 text-white'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>OWN IT — {symbol}{formattedPrice}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 pt-1">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-stone-400" /> Free Dispatch
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-400" /> 12-Mo Warranty
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-stone-400" /> 30-Day Returns
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
