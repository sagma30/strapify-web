import React from 'react';
import { WatchModel, ColorVariant, Charm } from '../types';

interface WatchStrapAssemblyProps {
  watch: WatchModel;
  strapVariant?: ColorVariant;
  strapCategory?: string;
  charms?: Charm[];
  showQuickReleasePin?: boolean;
  scale?: number;
  interactive?: boolean;
  onCharmClick?: (charm: Charm) => void;
  className?: string;
}

export const WatchStrapAssembly: React.FC<WatchStrapAssemblyProps> = ({
  watch,
  strapVariant = { name: 'Cognac Saddle Tan', colorHex: '#9A5B2D', texturePattern: 'pebble' },
  strapCategory = 'leather',
  charms = [],
  showQuickReleasePin = false,
  scale = 1,
  className = '',
}) => {
  const strapColor = strapVariant.colorHex || '#9A5B2D';
  const secondaryColor = strapVariant.secondaryHex || '#111827';
  const pattern = strapVariant.texturePattern || 'smooth';

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 280 440"
        className="w-full h-auto drop-shadow-xl"
        style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
      >
        <defs>
          {/* Metallic gradients */}
          <linearGradient id="steel-bevel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#D1D5DB" />
            <stop offset="60%" stopColor="#9CA3AF" />
            <stop offset="85%" stopColor="#4B5563" />
            <stop offset="100%" stopColor="#E5E7EB" />
          </linearGradient>

          <linearGradient id="titanium-satin" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B0B5BA" />
            <stop offset="50%" stopColor="#E0E4E8" />
            <stop offset="100%" stopColor="#989DA3" />
          </linearGradient>

          <linearGradient id="gold-hardware" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>

          <linearGradient id="strap-shading" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.25" />
            <stop offset="15%" stopColor="#FFFFFF" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#000000" stopOpacity="0" />
            <stop offset="85%" stopColor="#000000" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
          </linearGradient>

          {/* Quick release pin cutout */}
          <filter id="subtle-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* ================= TOP STRAP ================= */}
        <g id="top-strap">
          {/* Main top strap body */}
          <path
            d="M 96,160 L 96,20 Q 96,10 106,10 L 174,10 Q 184,10 184,20 L 184,160 Z"
            fill={strapColor}
          />

          {/* Texture rendering based on pattern & category */}
          {pattern === 'grooved' && (
            <g opacity="0.35" stroke="#000000" strokeWidth="2">
              <line x1="102" y1="30" x2="178" y2="30" />
              <line x1="102" y1="45" x2="178" y2="45" />
              <line x1="102" y1="60" x2="178" y2="60" />
              <line x1="102" y1="75" x2="178" y2="75" />
              <line x1="102" y1="90" x2="178" y2="90" />
              <line x1="102" y1="105" x2="178" y2="105" />
              <line x1="102" y1="120" x2="178" y2="120" />
              <line x1="102" y1="135" x2="178" y2="135" />
            </g>
          )}

          {pattern === 'striped' && (
            <g>
              <rect x="122" y="10" width="36" height="150" fill={secondaryColor} />
              <rect x="135" y="10" width="10" height="150" fill="#111827" />
            </g>
          )}

          {pattern === 'ribbed' && (
            <g opacity="0.2" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2,2">
              {Array.from({ length: 15 }).map((_, i) => (
                <line key={i} x1="98" y1={20 + i * 9} x2="182" y2={20 + i * 9} />
              ))}
            </g>
          )}

          {strapCategory === 'leather' && (
            /* Fine saddle perimeter stitching */
            <g stroke="#E5E7EB" strokeWidth="1.2" strokeDasharray="3,3" opacity="0.75">
              <line x1="102" y1="20" x2="102" y2="155" />
              <line x1="178" y1="20" x2="178" y2="155" />
              <line x1="102" y1="20" x2="178" y2="20" />
            </g>
          )}

          {/* Shading overlay */}
          <path
            d="M 96,160 L 96,20 Q 96,10 106,10 L 174,10 Q 184,10 184,20 L 184,160 Z"
            fill="url(#strap-shading)"
          />

          {/* Top Buckle (316L Stainless Steel) */}
          <rect x="90" y="6" width="100" height="14" rx="4" fill="url(#steel-bevel)" />
          <rect x="100" y="8" width="80" height="4" rx="1.5" fill="#111827" opacity="0.3" />
          <rect x="138" y="4" width="4" height="18" rx="1" fill="#4B5563" />

          {/* Quick Release Spring Bar Lever Indicator on Top Strap */}
          {showQuickReleasePin && (
            <g transform="translate(162, 142)">
              <rect x="-4" y="-3" width="16" height="8" rx="2" fill="#1F2937" opacity="0.6" />
              <circle cx="4" cy="1" r="3" fill="#D4AF37" stroke="#111827" strokeWidth="0.8" />
              <line x1="2" y1="1" x2="6" y2="1" stroke="#FFFFFF" strokeWidth="0.8" />
            </g>
          )}
        </g>

        {/* ================= BOTTOM STRAP ================= */}
        <g id="bottom-strap">
          {/* Main bottom strap body with tapered rounded tip */}
          <path
            d="M 96,280 L 96,410 Q 96,430 140,436 Q 184,430 184,410 L 184,280 Z"
            fill={strapColor}
          />

          {/* Texture rendering for bottom strap */}
          {pattern === 'grooved' && (
            <g opacity="0.35" stroke="#000000" strokeWidth="2">
              <line x1="102" y1="295" x2="178" y2="295" />
              <line x1="102" y1="310" x2="178" y2="310" />
              <line x1="102" y1="325" x2="178" y2="325" />
              <line x1="102" y1="340" x2="178" y2="340" />
              <line x1="104" y1="355" x2="176" y2="355" />
              <line x1="106" y1="370" x2="174" y2="370" />
              <line x1="110" y1="385" x2="170" y2="385" />
              <line x1="115" y1="400" x2="165" y2="400" />
            </g>
          )}

          {pattern === 'striped' && (
            <g>
              <path d="M 122,280 L 122,434 Q 140,436 158,434 L 158,280 Z" fill={secondaryColor} />
              <rect x="135" y="280" width="10" height="152" fill="#111827" />
            </g>
          )}

          {pattern === 'ribbed' && (
            <g opacity="0.2" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2,2">
              {Array.from({ length: 14 }).map((_, i) => (
                <line key={i} x1="100" y1={290 + i * 9} x2="180" y2={290 + i * 9} />
              ))}
            </g>
          )}

          {strapCategory === 'leather' && (
            <g stroke="#E5E7EB" strokeWidth="1.2" strokeDasharray="3,3" opacity="0.75">
              <line x1="102" y1="285" x2="102" y2="405" />
              <line x1="178" y1="285" x2="178" y2="405" />
              <path d="M 102,405 Q 140,425 178,405" fill="none" />
            </g>
          )}

          {/* Sizing Holes */}
          <g fill="#1F2937" opacity="0.6">
            <circle cx="140" cy="335" r="3" />
            <circle cx="140" cy="355" r="3" />
            <circle cx="140" cy="375" r="3" />
            <circle cx="140" cy="395" r="3" />
            <circle cx="140" cy="415" r="2.5" />
          </g>

          {/* Keeper Loops */}
          <rect x="94" y="300" width="92" height="12" rx="2" fill={strapColor} filter="url(#subtle-shadow)" />
          <rect x="94" y="300" width="92" height="12" rx="2" fill="url(#strap-shading)" />

          {/* Shading overlay */}
          <path
            d="M 96,280 L 96,410 Q 96,430 140,436 Q 184,430 184,410 L 184,280 Z"
            fill="url(#strap-shading)"
          />

          {/* Quick Release Spring Bar Pin Lever on Bottom Strap */}
          {showQuickReleasePin && (
            <g transform="translate(162, 288)">
              <rect x="-4" y="-3" width="16" height="8" rx="2" fill="#1F2937" opacity="0.6" />
              <circle cx="4" cy="1" r="3" fill="#D4AF37" stroke="#111827" strokeWidth="0.8" />
              <line x1="2" y1="1" x2="6" y2="1" stroke="#FFFFFF" strokeWidth="0.8" />
            </g>
          )}

          {/* SLIDE-ON CHARMS ATTACHED ON BOTTOM STRAP */}
          {charms && charms.length > 0 && (
            <g id="attached-charms">
              {charms.slice(0, 4).map((charm, idx) => {
                const yPos = 318 + idx * 24;
                const isGold = charm.finish === 'champagne_gold';
                const isTitanium = charm.finish === 'brushed_titanium';
                const fillGrad = isGold ? 'url(#gold-hardware)' : isTitanium ? 'url(#titanium-satin)' : '#1F2937';

                return (
                  <g key={charm.id + idx} transform={`translate(140, ${yPos})`}>
                    {/* Metal slide sleeve bracket wrapping the strap */}
                    <rect
                      x="-42"
                      y="-8"
                      width="84"
                      height="16"
                      rx="3.5"
                      fill={fillGrad}
                      stroke={isGold ? '#B45309' : '#475569'}
                      strokeWidth="0.7"
                      filter="url(#subtle-shadow)"
                    />
                    {/* Central jewel medallion */}
                    <rect x="-11" y="-7" width="22" height="14" rx="2" fill={isGold ? '#FEF08A' : '#F1F5F9'} />
                    {/* Charm Symbol */}
                    <text
                      x="0"
                      y="3.5"
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="system-ui"
                      fill="#1E293B"
                    >
                      {charm.symbol}
                    </text>
                  </g>
                );
              })}
            </g>
          )}
        </g>

        {/* ================= WATCH CASE / DIAL ================= */}
        {watch.caseType === 'apple' && (
          <g id="apple-watch-dial" transform="translate(140, 220)">
            {/* Lugs connector brackets */}
            <rect x="-38" y="-72" width="76" height="14" rx="3" fill="url(#steel-bevel)" />
            <rect x="-38" y="58" width="76" height="14" rx="3" fill="url(#steel-bevel)" />

            {/* Watch Case Shadow */}
            <rect x="-65" y="-68" width="130" height="136" rx="34" fill="#000000" opacity="0.25" />

            {/* Case Outer Rim (Titanium / Ceramic) */}
            <rect
              x="-64"
              y="-66"
              width="128"
              height="132"
              rx="32"
              fill={watch.caseColor || '#C4C8CC'}
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />

            {/* Digital Crown & Side Button */}
            <rect x="63" y="-35" width="8" height="26" rx="3" fill="url(#steel-bevel)" />
            {watch.accentColor && (
              <rect x="64" y="-28" width="6" height="12" rx="1" fill={watch.accentColor} />
            )}
            <rect x="63" y="5" width="5" height="20" rx="2" fill="url(#steel-bevel)" />

            {/* Active Bezel Edge */}
            <rect x="-56" y="-58" width="112" height="116" rx="25" fill="#05070A" />

            {/* Sapphire Glass Reflection */}
            <path
              d="M -50,-52 Q 0,-30 50,-52 L 40,-45 Q 0,-25 -40,-45 Z"
              fill="#FFFFFF"
              opacity="0.12"
            />

            {/* Watch Face UI (Modern Minimal Horology) */}
            <circle cx="0" cy="0" r="44" fill="#0D1117" stroke="#1F2937" strokeWidth="0.8" />

            {/* Hour markers */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const x1 = Math.sin(angle) * 38;
              const y1 = -Math.cos(angle) * 38;
              const x2 = Math.sin(angle) * 42;
              const y2 = -Math.cos(angle) * 42;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={i % 3 === 0 ? '#F97316' : '#94A3B8'}
                  strokeWidth={i % 3 === 0 ? 2 : 1}
                />
              );
            })}

            {/* Complications */}
            <text x="0" y="-18" textAnchor="middle" fontSize="6.5" fill="#64748B" fontWeight="600">
              STRAPIFY
            </text>
            <text x="0" y="22" textAnchor="middle" fontSize="7" fill="#F8FAFC" fontWeight="600">
              WED 24
            </text>

            {/* Hands */}
            <line x1="0" y1="0" x2="16" y2="-16" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="0" y1="0" x2="-22" y2="10" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="0" y1="4" x2="0" y2="-32" stroke="#F97316" strokeWidth="1" strokeLinecap="round" />
            <circle cx="0" cy="0" r="2.5" fill="#F97316" />
          </g>
        )}

        {watch.caseType === 'speedmaster' && (
          <g id="speedmaster-dial" transform="translate(140, 220)">
            {/* Solid Steel Lugs */}
            <path d="M -56,-50 L -46,-74 L -34,-74 L -40,-45 Z" fill="url(#steel-bevel)" />
            <path d="M 56,-50 L 46,-74 L 34,-74 L 40,-45 Z" fill="url(#steel-bevel)" />
            <path d="M -56,50 L -46,74 L -34,74 L -40,45 Z" fill="url(#steel-bevel)" />
            <path d="M 56,50 L 46,74 L 34,74 L 40,45 Z" fill="url(#steel-bevel)" />

            {/* Chrono Pushers & Crown */}
            <rect x="66" y="-30" width="8" height="10" rx="2" fill="url(#steel-bevel)" />
            <rect x="68" y="-8" width="10" height="16" rx="2" fill="url(#steel-bevel)" />
            <rect x="66" y="20" width="8" height="10" rx="2" fill="url(#steel-bevel)" />

            {/* Steel Case Ring */}
            <circle cx="0" cy="0" r="66" fill="url(#steel-bevel)" />

            {/* Tachymetre Bezel Ring (Black) */}
            <circle cx="0" cy="0" r="60" fill="#0A0D14" stroke="#D1D5DB" strokeWidth="1" />
            <circle cx="0" cy="0" r="50" fill="#030712" />

            {/* Tachymeter text simulation */}
            <text x="0" y="-53" textAnchor="middle" fontSize="4.5" fill="#9CA3AF" fontWeight="600" letterSpacing="1">
              TACHYMÈTRE 500
            </text>

            {/* 3 Chrono Subdials */}
            {/* Left Subdial (Running seconds) */}
            <circle cx="-20" cy="0" r="12" fill="#0B0F17" stroke="#374151" strokeWidth="0.8" />
            <line x1="-20" y1="0" x2="-20" y2="-8" stroke="#FFFFFF" strokeWidth="0.8" />

            {/* Right Subdial (30-min recorder) */}
            <circle cx="20" cy="0" r="12" fill="#0B0F17" stroke="#374151" strokeWidth="0.8" />
            <line x1="20" y1="0" x2="26" y2="4" stroke="#FFFFFF" strokeWidth="0.8" />

            {/* Bottom Subdial (12-hr recorder) */}
            <circle cx="0" cy="22" r="12" fill="#0B0F17" stroke="#374151" strokeWidth="0.8" />
            <line x1="0" y1="22" x2="5" y2="18" stroke="#FFFFFF" strokeWidth="0.8" />

            {/* Dial Text */}
            <text x="0" y="-22" textAnchor="middle" fontSize="6" fill="#F3F4F6" fontWeight="bold">
              OMEGA
            </text>
            <text x="0" y="-14" textAnchor="middle" fontSize="4" fill="#9CA3AF" letterSpacing="0.8">
              Speedmaster
            </text>
            <text x="0" y="-8" textAnchor="middle" fontSize="3.5" fill="#6B7280">
              PROFESSIONAL
            </text>

            {/* Hour Markers (Lume batons) */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const x1 = Math.sin(angle) * 40;
              const y1 = -Math.cos(angle) * 40;
              const x2 = Math.sin(angle) * 47;
              const y2 = -Math.cos(angle) * 47;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#E2E8F0"
                  strokeWidth={i % 3 === 0 ? 2.5 : 1.5}
                />
              );
            })}

            {/* Main Hands */}
            <line x1="0" y1="0" x2="18" y2="-22" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="0" y1="0" x2="-26" y2="4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            {/* White Chrono Central Hand */}
            <line x1="0" y1="12" x2="0" y2="-45" stroke="#F43F5E" strokeWidth="1" strokeLinecap="round" />
            <circle cx="0" cy="0" r="3" fill="#D1D5DB" />
          </g>
        )}

        {watch.caseType === 'diver' && (
          <g id="diver-dial" transform="translate(140, 220)">
            {/* Curved Oyster Lugs */}
            <path d="M -56,-50 L -46,-74 L -34,-74 L -40,-45 Z" fill="url(#steel-bevel)" />
            <path d="M 56,-50 L 46,-74 L 34,-74 L 40,-45 Z" fill="url(#steel-bevel)" />
            <path d="M -56,50 L -46,74 L -34,74 L -40,45 Z" fill="url(#steel-bevel)" />
            <path d="M 56,50 L 46,74 L 34,74 L 40,45 Z" fill="url(#steel-bevel)" />

            {/* Triplock Crown & Crown Guards */}
            <path d="M 60,-18 L 74,-12 L 74,12 L 60,18 Z" fill="url(#steel-bevel)" />
            <rect x="68" y="-9" width="10" height="18" rx="2" fill="url(#gold-hardware)" />

            {/* Outer Fluted Bezel Steel Ring */}
            <circle cx="0" cy="0" r="66" fill="url(#gold-hardware)" />

            {/* Deep Blue / Green Ceramic Bezel Insert */}
            <circle cx="0" cy="0" r="60" fill={watch.bezelColor || '#1E3A8A'} stroke="#FDE68A" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="48" fill="#0F172A" />

            {/* Bezel 12 o'clock Luminescent Pearl Triangle */}
            <polygon points="0,-57 -4,-51 4,-51" fill="#FEF08A" />
            <circle cx="0" cy="-53" r="1.8" fill="#FFFFFF" />

            {/* Bezel Markers (10, 20, 30, 40, 50) */}
            <text x="38" y="-28" textAnchor="middle" fontSize="6.5" fill="#FEF08A" fontWeight="bold">10</text>
            <text x="47" y="16" textAnchor="middle" fontSize="6.5" fill="#FEF08A" fontWeight="bold">20</text>
            <text x="0" y="56" textAnchor="middle" fontSize="6.5" fill="#FEF08A" fontWeight="bold">30</text>
            <text x="-47" y="16" textAnchor="middle" fontSize="6.5" fill="#FEF08A" fontWeight="bold">40</text>
            <text x="-38" y="-28" textAnchor="middle" fontSize="6.5" fill="#FEF08A" fontWeight="bold">50</text>

            {/* Dial Face */}
            <circle cx="0" cy="0" r="46" fill="#020617" />

            {/* Rolex Crown Coronet & Brand */}
            <text x="0" y="-20" textAnchor="middle" fontSize="10" fill="#D4AF37">♛</text>
            <text x="0" y="-12" textAnchor="middle" fontSize="5.5" fill="#FFFFFF" fontWeight="bold" letterSpacing="1">
              ROLEX
            </text>
            <text x="0" y="-6" textAnchor="middle" fontSize="3.5" fill="#D4AF37" letterSpacing="0.8">
              SUBMARINER
            </text>
            <text x="0" y="18" textAnchor="middle" fontSize="3" fill="#94A3B8">
              1000ft = 300m
            </text>
            <text x="0" y="24" textAnchor="middle" fontSize="2.8" fill="#94A3B8">
              SUPERLATIVE CHRONOMETER
            </text>

            {/* Cyclops Date Window at 3 o'clock */}
            <rect x="24" y="-6" width="16" height="12" rx="2" fill="#FFFFFF" stroke="#0284C7" strokeWidth="0.8" />
            <text x="32" y="3" textAnchor="middle" fontSize="8" fill="#0F172A" fontWeight="bold">24</text>

            {/* Luminous Markers (Maxi Dial dots & triangles) */}
            <polygon points="0,-40 -5,-30 5,-30" fill="#FEF08A" stroke="#B45309" strokeWidth="0.5" />
            <rect x="-4" y="32" width="8" height="4" fill="#FEF08A" stroke="#B45309" strokeWidth="0.5" />
            <rect x="-38" y="-2" width="6" height="4" fill="#FEF08A" stroke="#B45309" strokeWidth="0.5" />

            {/* Circle Markers */}
            {[30, 60, 120, 150, 210, 240, 300, 330].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const cx = Math.sin(rad) * 35;
              const cy = -Math.cos(rad) * 35;
              return (
                <circle
                  key={deg}
                  cx={cx}
                  cy={cy}
                  r="3.5"
                  fill="#FEF08A"
                  stroke="#B45309"
                  strokeWidth="0.6"
                />
              );
            })}

            {/* Mercedes Hour Hand & Sword Minute Hand */}
            <g transform="rotate(-40)">
              <line x1="0" y1="0" x2="0" y2="-22" stroke="#D4AF37" strokeWidth="2.5" />
              <circle cx="0" cy="-14" r="4" fill="#D4AF37" />
              <circle cx="0" cy="-14" r="2.5" fill="#FEF08A" />
            </g>
            <g transform="rotate(70)">
              <line x1="0" y1="0" x2="0" y2="-36" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
              <line x1="0" y1="-8" x2="0" y2="-32" stroke="#FEF08A" strokeWidth="1.2" strokeLinecap="round" />
            </g>
            {/* Seconds hand with lollipop dot */}
            <g transform="rotate(190)">
              <line x1="0" y1="8" x2="0" y2="-42" stroke="#D4AF37" strokeWidth="0.8" />
              <circle cx="0" cy="-28" r="2" fill="#FEF08A" />
            </g>
            <circle cx="0" cy="0" r="3" fill="#D4AF37" />
          </g>
        )}

        {(watch.caseType === 'samsung' || watch.caseType === 'minimalist') && (
          <g id="minimal-dial" transform="translate(140, 220)">
            <rect x="-50" y="-70" width="100" height="14" rx="4" fill="url(#steel-bevel)" />
            <rect x="-50" y="56" width="100" height="14" rx="4" fill="url(#steel-bevel)" />
            <circle cx="0" cy="0" r="64" fill="url(#steel-bevel)" />
            <circle cx="0" cy="0" r="58" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
            <text x="0" y="-24" textAnchor="middle" fontSize="6.5" fill="#0F172A" fontWeight="600" letterSpacing="1.2">
              {watch.brand.toUpperCase()}
            </text>
            <text x="0" y="-16" textAnchor="middle" fontSize="4.5" fill="#64748B" letterSpacing="0.5">
              AUTOMATIC
            </text>

            {/* Clean BauHaus Numerals / Indices */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const x1 = Math.sin(angle) * 44;
              const y1 = -Math.cos(angle) * 44;
              const x2 = Math.sin(angle) * 50;
              const y2 = -Math.cos(angle) * 50;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#1E293B"
                  strokeWidth={i % 3 === 0 ? 2 : 1}
                />
              );
            })}

            {/* Minimalist Blued Steel Hands */}
            <line x1="0" y1="0" x2="20" y2="-18" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" />
            <line x1="0" y1="0" x2="-28" y2="12" stroke="#1D4ED8" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="0" y1="6" x2="0" y2="-38" stroke="#EF4444" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="2.5" fill="#1E293B" />
          </g>
        )}
      </svg>
    </div>
  );
};
