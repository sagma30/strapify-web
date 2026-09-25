import React, { useState, useEffect } from 'react';
import { Search, Sparkles, CheckCircle2, ShieldCheck, Truck, RotateCcw, Award, ArrowRight } from 'lucide-react';
import { WatchStrapAssembly } from './WatchDialSVGs';
import { WATCH_MODELS, POPULAR_SEARCH_MODELS } from '../data/watches';
import { ColorVariant } from '../types';

interface HeroSectionProps {
  onSearchSubmit: (query: string) => void;
  onOpenVisualizer: (watchId?: string) => void;
  onShopCollection: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearchSubmit,
  onOpenVisualizer,
  onShopCollection,
}) => {
  const [watchQuery, setWatchQuery] = useState('');
  const [selectedPillWatchIndex, setSelectedPillWatchIndex] = useState(0);

  // Rotating brand highlighted in the hero headline (like Screenshot 3)
  const rotatingBrands = ['Omega Speedmaster', 'Apple Watch Ultra', 'Rolex Submariner', 'Samsung Galaxy', 'IWC Pilot', 'Seiko Diver'];
  const [rotatingIndex, setRotatingIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRotatingIndex((prev) => (prev + 1) % rotatingBrands.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Trio watches state: can change straps on each
  const [trioStraps, setTrioStraps] = useState<{
    speedmaster: ColorVariant;
    apple: ColorVariant;
    diver: ColorVariant;
  }>({
    speedmaster: { name: 'Olive Tuscan Leather', colorHex: '#4D5A42', texturePattern: 'pebble' },
    apple: { name: 'Blaze Orange FKM', colorHex: '#F97316', texturePattern: 'grooved' },
    diver: { name: 'Bond Military NATO', colorHex: '#374151', secondaryHex: '#D1A153', texturePattern: 'striped' },
  });

  const availableStrapOptions: ColorVariant[] = [
    { name: 'Olive Green Tuscan Leather', colorHex: '#4D5A42', texturePattern: 'pebble' },
    { name: 'Blaze Orange FKM Ribbed', colorHex: '#F97316', texturePattern: 'grooved' },
    { name: 'Bond Khaki & Slate NATO', colorHex: '#374151', secondaryHex: '#D1A153', texturePattern: 'striped' },
    { name: 'Cognac Saddle Leather', colorHex: '#9A5B2D', texturePattern: 'pebble' },
    { name: 'Deep Midnight Navy FKM', colorHex: '#1B263B', texturePattern: 'grooved' },
    { name: 'Stealth Blackout Silicone', colorHex: '#18181B', texturePattern: 'grooved' },
  ];

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (watchQuery.trim()) {
      onSearchSubmit(watchQuery);
    } else {
      onShopCollection();
    }
    const target = document.getElementById('collection-grid');
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  const speedmasterWatch = WATCH_MODELS.find((w) => w.id === 'omega-speedmaster') || WATCH_MODELS[2];
  const appleWatch = WATCH_MODELS.find((w) => w.id === 'apple-watch-ultra') || WATCH_MODELS[0];
  const diverWatch = WATCH_MODELS.find((w) => w.id === 'rolex-submariner') || WATCH_MODELS[3];

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20 border-b border-[#E8E6E1] bg-gradient-to-b from-[#FAF9F6] via-[#F4F3EE] to-[#FAF9F6]">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-sky-100/40 via-amber-100/30 to-emerald-100/30 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline, Brand Switcher, Quick-Search Dial Matching Pill */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-stone-200/90 rounded-full text-xs font-medium text-stone-700 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Universal 18mm · 20mm · 22mm · Apple Watch & Galaxy Lug Compatibility</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-[#111827] font-display tracking-tight leading-[1.08] text-balance">
                Straps for <span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-900 via-amber-900 to-stone-800">every watch.</span>
              </h1>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-2xl sm:text-3xl xl:text-4xl font-semibold text-stone-700">
                <span>Elevate your</span>
                <span className="inline-block px-3.5 py-1 bg-[#111827] text-white rounded-lg font-mono text-xl sm:text-2xl shadow-sm tracking-wide transition-all transform hover:scale-105">
                  {rotatingBrands[rotatingIndex]}
                </span>
                <span>today.</span>
              </div>
            </div>

            <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              One watch, infinite possibilities. Experience hand-finished Italian leather, sculpted FKM fluororubber, and rugged tactical NATO straps fitted with our zero-tool 5-second quick-release spring bars.
            </p>

            {/* Dial Matching Pill Search Input (As requested in brief & Screenshot 3) */}
            <form onSubmit={handleHeroSearch} className="max-w-xl mx-auto lg:mx-0">
              <div className="flex flex-col sm:flex-row items-stretch gap-2 p-1.5 bg-white border border-stone-300 rounded-xl sm:rounded-full shadow-md focus-within:ring-2 focus-within:ring-[#111827] transition-all">
                <div className="relative flex-1 flex items-center pl-3 pr-2 py-1">
                  <Search className="w-4 h-4 text-stone-400 shrink-0 mr-2" />
                  <input
                    type="text"
                    value={watchQuery}
                    onChange={(e) => setWatchQuery(e.target.value)}
                    placeholder="Type your watch here (e.g., Apple Ultra, Omega, Seiko)..."
                    className="w-full bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
                    list="popular-watch-suggestions"
                  />
                  <datalist id="popular-watch-suggestions">
                    {POPULAR_SEARCH_MODELS.map((m) => (
                      <option key={m} value={m} />
                    ))}
                  </datalist>
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#111827] hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold rounded-lg sm:rounded-full transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-sm"
                >
                  <span>Find Straps</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Quick dial pills */}
              <div className="mt-3 flex flex-wrap items-center justify-center lg:justify-start gap-1.5 text-xs text-stone-500">
                <span className="font-medium text-stone-700">Quick Match:</span>
                {['Apple Watch 45/49mm', 'Omega 20mm', 'Rolex 20mm', 'Samsung 20mm'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setWatchQuery(tag);
                      onSearchSubmit(tag);
                    }}
                    className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-md transition-colors text-[11px]"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </form>

            {/* Quick Action buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onShopCollection}
                className="px-5 py-2.5 bg-[#111827] text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-stone-800 transition-colors shadow-sm cursor-pointer"
              >
                Shop Straps Catalog
              </button>
              <button
                onClick={() => onOpenVisualizer()}
                className="px-5 py-2.5 bg-white text-stone-900 border border-stone-300 text-xs sm:text-sm font-semibold rounded-lg hover:bg-stone-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Open 3D Strap Visualizer</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual - High-Res Trio of Wristwatches */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            {/* Interactive strap swap selector for the trio */}
            <div className="w-full max-w-md mb-3 flex items-center justify-between px-3 py-1.5 bg-white/80 backdrop-blur-xs border border-stone-200 rounded-lg shadow-xs text-xs">
              <span className="font-semibold text-stone-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Interactive Live Strap Swap</span>
              </span>
              <span className="text-[11px] text-stone-500">Tap swatches below watches</span>
            </div>

            {/* The Trio Container */}
            <div className="relative w-full max-w-lg h-[380px] sm:h-[420px] flex items-center justify-center">
              {/* Left Watch: Omega Speedmaster Chronograph with Olive Leather */}
              <div
                className="absolute left-0 sm:left-4 z-20 w-[140px] sm:w-[170px] transition-transform duration-300 hover:scale-105 cursor-pointer"
                onClick={() => onOpenVisualizer('omega-speedmaster')}
                title="Omega Speedmaster - Click to customize"
              >
                <WatchStrapAssembly
                  watch={speedmasterWatch}
                  strapVariant={trioStraps.speedmaster}
                  strapCategory="leather"
                  showQuickReleasePin={true}
                  scale={0.88}
                />
                <div className="text-center mt-1">
                  <p className="text-[11px] font-bold text-stone-900 font-display">Omega Moonwatch</p>
                  <p className="text-[10px] text-stone-500 truncate">{trioStraps.speedmaster.name}</p>
                </div>
              </div>

              {/* Center Dominant Watch: Apple Watch Ultra with Blaze Orange / Navy FKM */}
              <div
                className="absolute z-30 w-[160px] sm:w-[195px] transition-transform duration-300 hover:scale-105 cursor-pointer"
                onClick={() => onOpenVisualizer('apple-watch-ultra')}
                title="Apple Watch Ultra - Click to customize"
              >
                <div className="relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#111827] text-white text-[9px] font-bold rounded-full uppercase tracking-wider shadow-sm z-40">
                    Best Seller
                  </div>
                  <WatchStrapAssembly
                    watch={appleWatch}
                    strapVariant={trioStraps.apple}
                    strapCategory="silicone"
                    showQuickReleasePin={true}
                    scale={1}
                  />
                </div>
                <div className="text-center mt-1">
                  <p className="text-[11px] font-bold text-stone-900 font-display">Apple Watch Ultra 2</p>
                  <p className="text-[10px] text-stone-500 truncate">{trioStraps.apple.name}</p>
                </div>
              </div>

              {/* Right Watch: Diver with Bond Tactical NATO */}
              <div
                className="absolute right-0 sm:right-4 z-20 w-[140px] sm:w-[170px] transition-transform duration-300 hover:scale-105 cursor-pointer"
                onClick={() => onOpenVisualizer('rolex-submariner')}
                title="Rolex Submariner - Click to customize"
              >
                <WatchStrapAssembly
                  watch={diverWatch}
                  strapVariant={trioStraps.diver}
                  strapCategory="nato"
                  showQuickReleasePin={true}
                  scale={0.88}
                />
                <div className="text-center mt-1">
                  <p className="text-[11px] font-bold text-stone-900 font-display">Submariner Ceramic</p>
                  <p className="text-[10px] text-stone-500 truncate">{trioStraps.diver.name}</p>
                </div>
              </div>
            </div>

            {/* Quick Interactive Strap Swap Palette */}
            <div className="w-full max-w-md mt-4 p-2.5 bg-white border border-stone-200 rounded-xl shadow-xs">
              <div className="flex items-center justify-between text-[11px] text-stone-600 mb-2 px-1">
                <span className="font-semibold text-stone-900">Try quick colorway swaps on the trio:</span>
                <span className="text-amber-800 font-mono text-[10px]">Instant 5-sec preview</span>
              </div>
              <div className="flex items-center justify-between gap-1.5">
                {availableStrapOptions.map((variant, i) => (
                  <button
                    key={variant.name}
                    onClick={() => {
                      if (i % 3 === 0) setTrioStraps((p) => ({ ...p, speedmaster: variant }));
                      else if (i % 3 === 1) setTrioStraps((p) => ({ ...p, apple: variant }));
                      else setTrioStraps((p) => ({ ...p, diver: variant }));
                    }}
                    title={`Apply ${variant.name}`}
                    className="flex-1 flex flex-col items-center gap-1 p-1 hover:bg-stone-50 rounded-lg transition-colors group cursor-pointer"
                  >
                    <span
                      className="w-6 h-6 rounded-full border border-stone-300 shadow-xs group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: variant.colorHex }}
                    />
                    <span className="text-[9px] text-stone-600 truncate max-w-[60px] text-center leading-tight">
                      {variant.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Metrics Banner (As specified in requirement #2) */}
        <div className="mt-14 pt-8 border-t border-stone-200/90 grid grid-cols-2 md:grid-cols-4 gap-6 text-stone-800">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/70 border border-stone-200/60 shadow-xs">
            <div className="p-2 bg-stone-100 rounded-lg text-stone-900 shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-stone-900">Free shipping over ₹499</p>
              <p className="text-[11px] text-stone-500">Shipped pan-India with express tracking</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/70 border border-stone-200/60 shadow-xs">
            <div className="p-2 bg-stone-100 rounded-lg text-stone-900 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-stone-900">12-Month Warranty</p>
              <p className="text-[11px] text-stone-500">Zero questions asked on hardware & stitching</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/70 border border-stone-200/60 shadow-xs">
            <div className="p-2 bg-stone-100 rounded-lg text-stone-900 shrink-0">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-stone-900">5-Sec Quick-Release</p>
              <p className="text-[11px] text-stone-500">No screwdrivers. No scratched lugs.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/70 border border-stone-200/60 shadow-xs">
            <div className="p-2 bg-stone-100 rounded-lg text-stone-900 shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-stone-900">10,000+ Happy Wrists</p>
              <p className="text-[11px] text-stone-500">Rated 4.9/5 by horology enthusiasts</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
