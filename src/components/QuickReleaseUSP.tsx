import React, { useState, useEffect } from 'react';
import { Check, X, ShieldAlert, Zap, Clock, Wrench, Sparkles, ChevronRight } from 'lucide-react';

export const QuickReleaseUSP: React.FC = () => {
  // Slider state from 0 (locked) to 100 (fully retracted / released)
  const [retractProgress, setRetractProgress] = useState(0);
  const [autoSimulate, setAutoSimulate] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    let interval: any;
    if (autoSimulate) {
      interval = setInterval(() => {
        setRetractProgress((prev) => {
          if (prev >= 100) {
            setAutoSimulate(false);
            return 100;
          }
          return prev + 5;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [autoSimulate]);

  useEffect(() => {
    if (retractProgress < 25) setActiveStep(1);
    else if (retractProgress < 75) setActiveStep(2);
    else setActiveStep(3);
  }, [retractProgress]);

  const handleSimulateSwap = () => {
    setRetractProgress(0);
    setAutoSimulate(true);
  };

  // Calculate pin position offset
  const pinShift = (retractProgress / 100) * 22; // slides inward by 22px
  const swapSeconds = ((retractProgress / 100) * 4.8).toFixed(1);

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800">
            ENGINEERING BREAKTHROUGH
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#111827] font-display tracking-tight">
            No Tools. No Frustration.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600">
            Traditional watchmakers forced you to risk scratching your lugs with razor-sharp spring bar forks. Strapify integrates aerospace-grade micro-lever spring bars into every single strap.
          </p>
        </div>

        {/* Visual Split Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Interactive Tactile Mechanism Simulator */}
          <div className="lg:col-span-7 bg-[#F4F3EE] border border-stone-300/80 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  Interactive Spring Bar Simulator
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-stone-700 bg-white px-2.5 py-1 rounded-md border border-stone-200 shadow-2xs">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>Swap Clock: 00:{swapSeconds.padStart(3, '0')}s</span>
              </div>
            </div>

            {/* Macro Cross Section SVG Diagram */}
            <div className="relative bg-white rounded-xl border border-stone-200 p-6 flex flex-col items-center justify-center overflow-hidden shadow-inner">
              <div className="absolute top-3 left-4 text-[11px] font-mono text-stone-500">
                LUG HOUSING TOLERANCE: 0.05mm
              </div>
              <div className="absolute top-3 right-4">
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                  retractProgress >= 90 ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-stone-100 text-stone-700'
                }`}>
                  {retractProgress >= 90 ? 'STRAP RELEASED' : 'SECURE LOCKED'}
                </span>
              </div>

              {/* Spring Bar Mechanism Illustration */}
              <svg viewBox="0 0 460 200" className="w-full max-w-md h-auto my-4 select-none">
                <defs>
                  <linearGradient id="steel-metal" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F3F4F6" />
                    <stop offset="30%" stopColor="#D1D5DB" />
                    <stop offset="70%" stopColor="#9CA3AF" />
                    <stop offset="100%" stopColor="#4B5563" />
                  </linearGradient>
                  <linearGradient id="gold-pin" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FDE68A" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#92400E" />
                  </linearGradient>
                  <pattern id="diagonal-stripe" width="8" height="8" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="8" x2="8" y2="0" stroke="#E5E7EB" strokeWidth="2" />
                  </pattern>
                </defs>

                {/* Watch Case Lug (Left) */}
                <rect x="20" y="30" width="50" height="140" rx="4" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1.5" />
                {/* Left Lug Pin Hole */}
                <rect x="58" y="90" width="12" height="20" rx="2" fill="#1F2937" />

                {/* Watch Case Lug (Right) */}
                <rect x="390" y="30" width="50" height="140" rx="4" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1.5" />
                {/* Right Lug Pin Hole with entry */}
                <rect x="390" y="90" width="12" height="20" rx="2" fill="#1F2937" />

                {/* Strap Head Material (Leather / Silicone band inside lugs) */}
                <rect x="70" y="40" width="320" height="120" rx="6" fill="#9A5B2D" stroke="#78350F" strokeWidth="1" />
                {/* Top stitching */}
                <line x1="80" y1="52" x2="380" y2="52" stroke="#FEF3C7" strokeWidth="1.5" strokeDasharray="5,4" />
                {/* Micro cut-out channel exposing the quick-release pin lever */}
                <rect x="280" y="80" width="70" height="40" rx="8" fill="#1C1917" opacity="0.8" />

                {/* Steel Spring Bar Barrel Body */}
                <rect x="68" y="94" width="324" height="12" rx="3" fill="url(#steel-metal)" stroke="#374151" strokeWidth="1" />

                {/* Left Fixed Steel Pin Tip (in left lug hole) */}
                <rect x="52" y="96" width="18" height="8" rx="2" fill="url(#steel-metal)" />

                {/* Dynamic Retractable Right Pin Tip */}
                {/* When retracted, slides from x=398 to x=376 inside the barrel */}
                <rect
                  x={398 - pinShift}
                  y="96"
                  width="18"
                  height="8"
                  rx="2"
                  fill="url(#steel-metal)"
                  className="transition-all duration-75"
                />

                {/* Miniature Gold Fingernail Lever Knob */}
                <g transform={`translate(${330 - pinShift}, 100)`} className="cursor-pointer transition-all duration-75">
                  <circle cx="0" cy="0" r="9" fill="url(#gold-pin)" stroke="#111827" strokeWidth="1.2" />
                  <circle cx="0" cy="0" r="4" fill="#FFFFFF" opacity="0.6" />
                  {/* Grip ridges */}
                  <line x1="-3" y1="-2" x2="3" y2="-2" stroke="#78350F" strokeWidth="1" />
                  <line x1="-3" y1="2" x2="3" y2="2" stroke="#78350F" strokeWidth="1" />
                </g>

                {/* Motion Arrow indicator */}
                <g opacity={retractProgress > 10 ? 0.3 : 1}>
                  <path d="M 320,135 L 290,135 M 298,130 L 290,135 L 298,140" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
                  <text x="305" y="152" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#B45309">
                    Slide with thumbnail ←
                  </text>
                </g>
              </svg>

              {/* Slider Scrub Control */}
              <div className="w-full mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-600 font-medium">
                  <span>Pin Position: <strong className="text-stone-900">{retractProgress}% Retracted</strong></span>
                  <span>{retractProgress >= 90 ? '✓ Ready to swap' : '← Drag to compress spring'}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={retractProgress}
                  onChange={(e) => setRetractProgress(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#111827]"
                />
              </div>

              {/* Trigger button */}
              <div className="mt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleSimulateSwap}
                  className="px-4 py-2 bg-[#111827] text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Simulate 5-Second Swap</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRetractProgress(0)}
                  className="px-3 py-2 bg-stone-100 text-stone-700 text-xs font-semibold rounded-lg hover:bg-stone-200 transition-colors cursor-pointer"
                >
                  Lock Pin
                </button>
              </div>
            </div>

            {/* 3 Step Sequence Indicators */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className={`p-3 rounded-lg border transition-all ${
                activeStep === 1 ? 'bg-white border-amber-500 shadow-xs' : 'bg-stone-100/60 border-stone-200 opacity-60'
              }`}>
                <span className="text-[10px] font-mono font-bold text-amber-800">STEP 01</span>
                <p className="text-xs font-bold text-stone-900 mt-0.5">Engage Thumbnail</p>
                <p className="text-[11px] text-stone-500 mt-1">Locate the flush 316L bead lever on inner strap.</p>
              </div>

              <div className={`p-3 rounded-lg border transition-all ${
                activeStep === 2 ? 'bg-white border-amber-500 shadow-xs' : 'bg-stone-100/60 border-stone-200 opacity-60'
              }`}>
                <span className="text-[10px] font-mono font-bold text-amber-800">STEP 02</span>
                <p className="text-xs font-bold text-stone-900 mt-0.5">Retract Spring 2mm</p>
                <p className="text-[11px] text-stone-500 mt-1">Gentle inward slide releases the pin from watch lug.</p>
              </div>

              <div className={`p-3 rounded-lg border transition-all ${
                activeStep === 3 ? 'bg-white border-amber-500 shadow-xs' : 'bg-stone-100/60 border-stone-200 opacity-60'
              }`}>
                <span className="text-[10px] font-mono font-bold text-amber-800">STEP 03</span>
                <p className="text-xs font-bold text-stone-900 mt-0.5">Snap in New Strap</p>
                <p className="text-[11px] text-stone-500 mt-1">Spring clicks securely into place in under 5 seconds.</p>
              </div>
            </div>
          </div>

          {/* Right: The Pain vs. The Strapify Solution Comparison */}
          <div className="lg:col-span-5 space-y-6">
            {/* The Old Way */}
            <div className="p-5 rounded-xl border border-red-200 bg-red-50/40 text-stone-800">
              <div className="flex items-center gap-2 text-red-700 font-bold text-xs uppercase tracking-wider mb-2">
                <X className="w-4 h-4 text-red-600" />
                <span>The Old Traditional Way</span>
              </div>
              <h4 className="text-base font-bold text-stone-900">Scratched Lugs & Fleeting Screws</h4>
              <ul className="mt-3 space-y-2 text-xs text-stone-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Requires specialized micro-fork tools that slip and gouge luxury watch cases.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>10 to 15 minutes of tedious fiddling per strap change.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Springs shoot across the room and vanish into carpets.</span>
                </li>
              </ul>
            </div>

            {/* The Strapify Way */}
            <div className="p-5 rounded-xl border border-emerald-300 bg-emerald-50/50 text-stone-800 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>The Strapify Standard</span>
              </div>
              <h4 className="text-base font-bold text-stone-900">Zero Tools. Zero Case Scratches.</h4>
              <ul className="mt-3 space-y-2 text-xs text-stone-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>5-second swap:</strong> Change from gym FKM rubber to evening Italian leather in a taxi.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>Zero scratches:</strong> Micro-lever stays enclosed in the strap lining.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>Double flanged retention:</strong> Tested for 15kg tensile pull strength.</span>
                </li>
              </ul>
            </div>

            {/* Warranty badge */}
            <div className="p-4 bg-stone-100 rounded-xl border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-stone-900">Guaranteed for 10,000+ Swaps</p>
                <p className="text-[11px] text-stone-500">Dual-spring stainless steel core mechanism</p>
              </div>
              <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded">
                ISO 9001 TESTED
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
