import React, { useState } from 'react';
import { Sparkles, Plus, Check, ShoppingBag, ArrowRight, ShieldCheck, Gift, Layers } from 'lucide-react';
import { Charm, BundleTier, Product, ColorVariant, CurrencyCode } from '../types';
import { CHARMS_CATALOG, BUNDLE_TIERS, CURRENCIES } from '../data/straps';
import { WatchStrapAssembly } from './WatchDialSVGs';
import { WATCH_MODELS } from '../data/watches';

interface CharmBundleBuilderProps {
  products: Product[];
  currentCurrency: CurrencyCode;
  onAddBundleToCart: (tier: BundleTier, selectedStraps: { product: Product; variant: ColorVariant }[], selectedCharms: Charm[]) => void;
  onOpenVisualizer: (watchId?: string, strapId?: string, variant?: ColorVariant, charms?: Charm[]) => void;
}

export const CharmBundleBuilder: React.FC<CharmBundleBuilderProps> = ({
  products,
  currentCurrency,
  onAddBundleToCart,
  onOpenVisualizer,
}) => {
  // Selected bundle tier: basic (₹250), medium (₹550), premium (₹800)
  const [activeTierId, setActiveTierId] = useState<'basic' | 'medium' | 'premium'>('medium');
  const currentTier = BUNDLE_TIERS.find((t) => t.id === activeTierId) || BUNDLE_TIERS[1];

  // Selected straps inside the bundle: up to 3
  const [selectedStraps, setSelectedStraps] = useState<{ product: Product; variant: ColorVariant }[]>([
    { product: products[0], variant: products[0].variants[0] }, // Active FKM
    { product: products[1], variant: products[1].variants[0] }, // Siena Vintage Leather
    { product: products[2], variant: products[2].variants[0] }, // Bond NATO
  ]);

  // Selected slide-on charms inside the bundle
  const [selectedCharms, setSelectedCharms] = useState<Charm[]>([
    CHARMS_CATALOG[0], // Polaris Star
    CHARMS_CATALOG[1], // Explorer Compass
    CHARMS_CATALOG[5], // Initial S
  ]);

  const [addedBundleSuccess, setAddedBundleSuccess] = useState(false);

  // Active filter for charms catalog display
  const [charmCategoryFilter, setCharmCategoryFilter] = useState<'all' | 'initial' | 'minimal_symbol' | 'horology'>('all');

  const filteredCharms = CHARMS_CATALOG.filter((c) => {
    if (charmCategoryFilter === 'all') return true;
    return c.category === charmCategoryFilter;
  });

  const rate = CURRENCIES[currentCurrency].rate;
  const symbol = CURRENCIES[currentCurrency].symbol;

  const handleToggleCharm = (charm: Charm) => {
    const isAlreadySelected = selectedCharms.some((c) => c.id === charm.id);
    if (isAlreadySelected) {
      setSelectedCharms(selectedCharms.filter((c) => c.id !== charm.id));
    } else {
      if (selectedCharms.length < currentTier.charmsCount) {
        setSelectedCharms([...selectedCharms, charm]);
      } else {
        // Replace the last charm if at max limit
        const updated = [...selectedCharms.slice(0, currentTier.charmsCount - 1), charm];
        setSelectedCharms(updated);
      }
    }
  };

  const handleSelectTier = (tier: BundleTier) => {
    setActiveTierId(tier.id);
    if (selectedCharms.length > tier.charmsCount) {
      setSelectedCharms(selectedCharms.slice(0, tier.charmsCount));
    }
  };

  const handleAddBundle = () => {
    onAddBundleToCart(currentTier, selectedStraps, selectedCharms);
    setAddedBundleSuccess(true);
    setTimeout(() => setAddedBundleSuccess(false), 2000);
  };

  // Preview watch with the first selected strap & charms attached!
  const previewWatch = WATCH_MODELS[0]; // Apple Watch Ultra
  const primaryStrap = selectedStraps[0] || { product: products[0], variant: products[0].variants[0] };

  return (
    <section id="charms-bundle" className="py-20 bg-[#FAF9F6] border-b border-stone-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: "Add a Touch of You" */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-800">
            PERSONALIZED HARDWARE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] font-display tracking-tight mt-2">
            Add a Touch of You
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600">
            Jewelry-grade slide-on metal charms crafted in champagne gold and brushed titanium. Slide seamlessly onto your watch straps to mark milestones, initials, or horological symbols.
          </p>
        </div>

        {/* ================= 1. BUNDLE PRICING TIERS TABLE ================= */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
              Build Your Custom Strap Rotation
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Save up to 60% with our curated Mix & Match Rotation Packs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {BUNDLE_TIERS.map((tier) => {
              const isSelected = activeTierId === tier.id;
              const formattedPrice = Math.round(tier.priceINR * rate);
              const formattedSavings = Math.round(tier.savingsINR * rate);

              return (
                <div
                  key={tier.id}
                  onClick={() => handleSelectTier(tier)}
                  className={`relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-white border-2 border-[#111827] shadow-xl scale-102 ring-1 ring-[#111827]'
                      : 'bg-[#F4F3EE] border border-stone-200/90 hover:border-stone-400 hover:shadow-md'
                  }`}
                >
                  {/* Badge for popular tier */}
                  {tier.id === 'medium' && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-700 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                      Most Popular Set
                    </div>
                  )}
                  {tier.id === 'premium' && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#111827] text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                      Best Value · Horology Suite
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xl font-bold text-[#111827] font-display">{tier.name}</h4>
                      <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        Save {symbol}{formattedSavings}
                      </span>
                    </div>

                    <p className="text-xs text-stone-500 mb-4">{tier.tagline}</p>

                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-3xl font-extrabold font-mono text-[#111827]">
                        {symbol}{formattedPrice}
                      </span>
                      <span className="text-xs text-stone-400">/ complete set</span>
                    </div>

                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs font-semibold text-stone-800 mb-6 flex items-center justify-between">
                      <span>{tier.strapsCount} Straps Included</span>
                      <span className="text-amber-800">+{tier.charmsCount} Slide-On Charms</span>
                    </div>

                    <ul className="space-y-2.5 text-xs text-stone-600 mb-6">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectTier(tier);
                    }}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#111827] text-white shadow-xs'
                        : 'bg-stone-200 hover:bg-stone-300 text-stone-800'
                    }`}
                  >
                    {isSelected ? '✓ Selected Plan' : 'Select Plan'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= 2. INTERACTIVE PACK CUSTOMIZER & CHARMS ATTACHER ================= */}
        <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-10 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Col: Live Watch + Attached Charms Render Preview */}
            <div className="lg:col-span-5 bg-[#F4F3EE] rounded-2xl p-6 flex flex-col items-center justify-between border border-stone-200">
              <div className="w-full flex items-center justify-between text-xs text-stone-500 mb-2">
                <span className="font-bold text-stone-900 font-display">LIVE CHARM ATTACHMENT</span>
                <span className="font-mono text-amber-800 text-[11px]">
                  {selectedCharms.length} / {currentTier.charmsCount} Charms Slotted
                </span>
              </div>

              {/* Watch with Charms SVG */}
              <div className="w-60 h-84 flex items-center justify-center py-2">
                <WatchStrapAssembly
                  watch={previewWatch}
                  strapVariant={primaryStrap.variant}
                  strapCategory={primaryStrap.product.category}
                  charms={selectedCharms}
                  showQuickReleasePin={true}
                  scale={0.94}
                />
              </div>

              {/* Slotted charms chips */}
              <div className="w-full mt-4 p-3 bg-white rounded-xl border border-stone-200">
                <p className="text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Currently Attached Charms (Click to remove):
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedCharms.length === 0 ? (
                    <span className="text-xs text-stone-400 italic">No charms attached yet. Pick below!</span>
                  ) : (
                    selectedCharms.map((c, i) => (
                      <button
                        key={c.id + i}
                        onClick={() => handleToggleCharm(c)}
                        className="px-2.5 py-1 bg-stone-100 hover:bg-red-50 hover:text-red-700 text-stone-800 rounded-md text-xs font-bold border border-stone-200 flex items-center gap-1.5 transition-colors cursor-pointer group"
                      >
                        <span className="text-amber-600">{c.symbol}</span>
                        <span>{c.name}</span>
                        <span className="text-stone-400 group-hover:text-red-600 text-[10px]">✕</span>
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Visualizer studio button */}
              <button
                onClick={() => onOpenVisualizer(previewWatch.id, primaryStrap.product.id, primaryStrap.variant, selectedCharms)}
                className="mt-4 w-full py-2 bg-white text-stone-800 hover:bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Open in 3D Strap Visualizer</span>
              </button>
            </div>

            {/* Right Col: Configure Straps & Pick Charms */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step A: 3 Selected Straps */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-800">STEP 01</span>
                    <h4 className="text-base font-bold text-stone-900">Your 3 Rotation Straps</h4>
                  </div>
                  <span className="text-xs text-stone-500">Pick any 3 straps</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedStraps.map((strap, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-stone-300 shrink-0"
                            style={{ backgroundColor: strap.variant.colorHex }}
                          />
                          <span className="text-xs font-bold text-stone-900 truncate">
                            Slot 0{idx + 1}: {strap.product.title.split(' ')[0]}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 truncate">{strap.variant.name}</p>
                      </div>

                      <select
                        value={strap.product.id}
                        onChange={(e) => {
                          const newProd = products.find((p) => p.id === e.target.value);
                          if (newProd) {
                            const updated = [...selectedStraps];
                            updated[idx] = { product: newProd, variant: newProd.variants[0] };
                            setSelectedStraps(updated);
                          }
                        }}
                        className="mt-3 w-full bg-white border border-stone-300 text-[11px] font-medium rounded-lg px-2 py-1 text-stone-800 cursor-pointer"
                      >
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step B: Pick Custom Slide-On Charms */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-800">STEP 02</span>
                    <h4 className="text-base font-bold text-stone-900">
                      Pick Your Slide-On Charms ({selectedCharms.length} of {currentTier.charmsCount} selected)
                    </h4>
                  </div>
                  {/* Category filters */}
                  <div className="flex items-center gap-1 text-[11px]">
                    {(['all', 'initial', 'minimal_symbol', 'horology'] as const).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCharmCategoryFilter(cat)}
                        className={`px-2 py-0.5 rounded capitalize ${
                          charmCategoryFilter === cat
                            ? 'bg-[#111827] text-white'
                            : 'bg-stone-100 text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        {cat === 'minimal_symbol' ? 'Symbols' : cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-56 overflow-y-auto pr-1">
                  {filteredCharms.map((charm) => {
                    const isSelected = selectedCharms.some((c) => c.id === charm.id);
                    const isGold = charm.finish === 'champagne_gold';

                    return (
                      <button
                        key={charm.id}
                        onClick={() => handleToggleCharm(charm)}
                        className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-50/80 border-amber-600 shadow-xs ring-1 ring-amber-600'
                            : 'bg-white border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        <div
                          className={`w-9 h-7 rounded-md flex items-center justify-center text-sm font-bold shadow-xs ${
                            isGold
                              ? 'bg-gradient-to-br from-amber-100 via-amber-300 to-amber-500 text-stone-900 border border-amber-400'
                              : 'bg-gradient-to-br from-stone-200 via-slate-300 to-stone-400 text-stone-800 border border-stone-300'
                          }`}
                        >
                          {charm.symbol}
                        </div>
                        <span className="text-[11px] font-bold text-stone-800 mt-1.5 truncate max-w-full">
                          {charm.name}
                        </span>
                        <span className="text-[9px] text-stone-500 capitalize">
                          {charm.finish.replace('_', ' ')}
                        </span>
                        {isSelected && (
                          <span className="mt-1 text-[9px] font-bold text-amber-800 flex items-center gap-0.5">
                            <Check className="w-2.5 h-2.5" /> Selected
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step C: Bundle Add Action */}
              <div className="p-4 bg-[#F4F3EE] rounded-2xl border border-stone-300 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-extrabold text-[#111827] font-display">
                      {currentTier.name} Summary
                    </span>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      Total: {symbol}{Math.round(currentTier.priceINR * rate)}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 mt-0.5">
                    Includes 3 Straps + {selectedCharms.length} Charms + Velvet Travel Case + 12-Mo Warranty
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddBundle}
                  className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shrink-0 ${
                    addedBundleSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#111827] hover:bg-stone-800 text-white'
                  }`}
                >
                  {addedBundleSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Bundle Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add Bundle — {symbol}{Math.round(currentTier.priceINR * rate)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
