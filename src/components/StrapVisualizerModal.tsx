import React, { useState } from 'react';
import { X, Sparkles, Check, ShoppingBag, RotateCcw, Share2, Layers, Sliders } from 'lucide-react';
import { WatchModel, Product, ColorVariant, Charm, CurrencyCode } from '../types';
import { WATCH_MODELS } from '../data/watches';
import { PRODUCTS, CHARMS_CATALOG, CURRENCIES } from '../data/straps';
import { WatchStrapAssembly } from './WatchDialSVGs';

interface StrapVisualizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialWatchId?: string;
  initialStrapId?: string;
  initialVariant?: ColorVariant;
  initialCharms?: Charm[];
  onAddToCart: (product: Product, variant: ColorVariant, lugWidth: string, charms?: Charm[]) => void;
  currentCurrency: CurrencyCode;
}

export const StrapVisualizerModal: React.FC<StrapVisualizerModalProps> = ({
  isOpen,
  onClose,
  initialWatchId,
  initialStrapId,
  initialVariant,
  initialCharms,
  onAddToCart,
  currentCurrency,
}) => {
  if (!isOpen) return null;

  // Selected watch dial
  const [selectedWatch, setSelectedWatch] = useState<WatchModel>(
    WATCH_MODELS.find((w) => w.id === initialWatchId) || WATCH_MODELS[0]
  );

  // Selected strap
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    PRODUCTS.find((p) => p.id === initialStrapId) || PRODUCTS[0]
  );

  // Selected strap variant
  const [selectedVariant, setSelectedVariant] = useState<ColorVariant>(
    initialVariant || selectedProduct.variants[0]
  );

  // Slotted charms
  const [attachedCharms, setAttachedCharms] = useState<Charm[]>(initialCharms || []);

  // Quick release toggle
  const [showQuickRelease, setShowQuickRelease] = useState(true);

  // Added notification
  const [isAdded, setIsAdded] = useState(false);

  const rate = CURRENCIES[currentCurrency].rate;
  const symbol = CURRENCIES[currentCurrency].symbol;

  const totalCharmsPrice = attachedCharms.reduce((acc, c) => acc + c.priceINR, 0);
  const totalPriceINR = selectedProduct.priceINR + totalCharmsPrice;
  const formattedTotalPrice = Math.round(totalPriceINR * rate);

  const handleSelectProduct = (p: Product) => {
    setSelectedProduct(p);
    setSelectedVariant(p.variants[0]);
  };

  const handleToggleCharm = (charm: Charm) => {
    if (attachedCharms.some((c) => c.id === charm.id)) {
      setAttachedCharms(attachedCharms.filter((c) => c.id !== charm.id));
    } else {
      if (attachedCharms.length < 4) {
        setAttachedCharms([...attachedCharms, charm]);
      }
    }
  };

  const handleAddToCart = () => {
    onAddToCart(selectedProduct, selectedVariant, selectedWatch.lugWidth, attachedCharms);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-900/70 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#FAF9F6] rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-4 max-h-[95vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-amber-100 text-amber-900 rounded-lg">
              <Sparkles className="w-4 h-4 text-amber-800" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 font-display">
                Strapify 3D / Live Strap Visualizer Studio
              </h2>
              <p className="text-[11px] text-stone-500">
                Match dials, rotate interchangeable textures, and slot custom charms in real time.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left Canvas: Live Watch Assembly Render */}
          <div className="lg:col-span-6 bg-gradient-to-b from-[#F2F1EC] to-[#E9E8E1] p-6 sm:p-10 flex flex-col items-center justify-between relative border-b lg:border-b-0 lg:border-r border-stone-200">
            {/* Ambient halo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 rounded-full bg-white/70 blur-2xl" />
            </div>

            {/* Quick Specs tag */}
            <div className="relative z-10 w-full flex items-center justify-between text-xs text-stone-600 mb-2">
              <div className="flex items-center gap-1.5 bg-white/90 px-2.5 py-1 rounded-full border border-stone-200 shadow-2xs font-mono text-[11px]">
                <span>Case: {selectedWatch.name}</span>
                <span>·</span>
                <span className="text-amber-800">{selectedWatch.lugWidth}</span>
              </div>

              <button
                onClick={() => setShowQuickRelease(!showQuickRelease)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all border ${
                  showQuickRelease
                    ? 'bg-[#111827] text-white border-[#111827]'
                    : 'bg-white text-stone-700 border-stone-300'
                }`}
              >
                {showQuickRelease ? '✓ Quick-Release Pins Shown' : 'Pins Hidden'}
              </button>
            </div>

            {/* SVG Render */}
            <div className="relative z-10 w-64 sm:w-72 h-[380px] sm:h-[420px] flex items-center justify-center my-4">
              <WatchStrapAssembly
                watch={selectedWatch}
                strapVariant={selectedVariant}
                strapCategory={selectedProduct.category}
                charms={attachedCharms}
                showQuickReleasePin={showQuickRelease}
                scale={1}
              />
            </div>

            {/* Micro Details info */}
            <div className="relative z-10 w-full bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-stone-200 text-xs flex items-center justify-between">
              <div>
                <p className="font-bold text-stone-900">{selectedProduct.title}</p>
                <p className="text-[11px] text-stone-500">{selectedVariant.name} · {selectedProduct.material}</p>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-stone-900">{symbol}{formattedTotalPrice}</span>
                <p className="text-[10px] text-emerald-700">5-Sec Quick Release</p>
              </div>
            </div>
          </div>

          {/* Right Controls: Choose Dial, Choose Strap & Variants, Attach Charms */}
          <div className="lg:col-span-6 p-6 sm:p-8 space-y-6 overflow-y-auto bg-[#FAF9F6]">
            {/* Step 1: Select Watch Model Dial */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  1. Choose Your Watch Dial
                </span>
                <span className="text-[11px] text-stone-500 font-mono">
                  {WATCH_MODELS.length} Models
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {WATCH_MODELS.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setSelectedWatch(w)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedWatch.id === w.id
                        ? 'bg-[#111827] text-white border-[#111827] shadow-xs'
                        : 'bg-white text-stone-800 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <p className="text-xs font-bold truncate">{w.brand}</p>
                    <p className={`text-[10px] truncate ${selectedWatch.id === w.id ? 'text-stone-300' : 'text-stone-500'}`}>
                      {w.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Choose Strap Style */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  2. Choose Strap Style
                </span>
                <span className="text-[11px] text-amber-800 font-medium capitalize">
                  {selectedProduct.categoryLabel}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {PRODUCTS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectProduct(p)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedProduct.id === p.id
                        ? 'bg-white border-stone-900 ring-2 ring-stone-900 shadow-xs'
                        : 'bg-white/80 text-stone-800 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <p className="text-xs font-bold text-stone-900 truncate">{p.title.split(' ')[0]}</p>
                    <p className="text-[10px] text-stone-500 truncate">{p.categoryLabel}</p>
                    <p className="text-xs font-mono font-bold text-stone-900 mt-1">
                      {symbol}{Math.round(p.priceINR * rate)}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Color Swatches for Selected Strap */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  3. Colorway: {selectedVariant.name}
                </span>
              </div>
              <div className="flex items-center gap-2.5 flex-wrap">
                {selectedProduct.variants.map((variant) => (
                  <button
                    key={variant.name}
                    onClick={() => setSelectedVariant(variant)}
                    className={`p-1 rounded-full border-2 transition-all cursor-pointer ${
                      selectedVariant.name === variant.name
                        ? 'border-stone-900 scale-110 shadow-xs'
                        : 'border-transparent hover:scale-105'
                    }`}
                    title={variant.name}
                  >
                    <span
                      className="block w-7 h-7 rounded-full border border-stone-300 shadow-2xs"
                      style={{ backgroundColor: variant.colorHex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Slot-On Charms Attachment */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
                    4. Attach Slide-On Charms ({attachedCharms.length}/4)
                  </span>
                  <p className="text-[11px] text-stone-500">Tap to slot onto your band</p>
                </div>
                {attachedCharms.length > 0 && (
                  <button
                    onClick={() => setAttachedCharms([])}
                    className="text-[11px] text-red-600 hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="grid grid-cols-4 gap-2 max-h-36 overflow-y-auto p-1 bg-stone-100 rounded-xl">
                {CHARMS_CATALOG.map((c) => {
                  const isSlotted = attachedCharms.some((ch) => ch.id === c.id);
                  const isGold = c.finish === 'champagne_gold';

                  return (
                    <button
                      key={c.id}
                      onClick={() => handleToggleCharm(c)}
                      className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                        isSlotted
                          ? 'bg-amber-100 border-amber-600 shadow-2xs'
                          : 'bg-white border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      <span className="text-base">{c.symbol}</span>
                      <p className="text-[9px] font-bold text-stone-800 truncate">{c.name}</p>
                      <p className="text-[8px] font-mono text-stone-500">+{symbol}{Math.round(c.priceINR * rate)}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Purchase CTA */}
            <div className="pt-4 border-t border-stone-200 space-y-2">
              <button
                onClick={handleAddToCart}
                className={`w-full py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#111827] hover:bg-stone-800 text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Configuration Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Configured Strap to Bag — {symbol}{formattedTotalPrice}</span>
                  </>
                )}
              </button>
              <p className="text-center text-[11px] text-stone-500">
                Guaranteed fit for {selectedWatch.name} ({selectedWatch.lugWidth})
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
