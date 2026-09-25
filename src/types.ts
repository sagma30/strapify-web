export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to INR
}

export type StrapCategory = 'silicone' | 'leather' | 'nato' | 'charms' | 'milanese';

export interface ColorVariant {
  name: string;
  colorHex: string;
  secondaryHex?: string;
  texturePattern?: 'grooved' | 'smooth' | 'ribbed' | 'pebble' | 'striped';
  imagePlaceholder?: string;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: StrapCategory;
  categoryLabel: string;
  priceINR: number;
  originalPriceINR?: number;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  description: string;
  material: string;
  hardware: string;
  compatibleLugWidths: string[]; // e.g. ["18mm", "20mm", "22mm", "Apple 41mm", "Apple 45mm/49mm"]
  variants: ColorVariant[];
  defaultVariantIndex: number;
  featuredPill?: string;
  waterproof: boolean;
  quickRelease: boolean;
}

export interface Charm {
  id: string;
  name: string;
  symbol: string; // SVG icon or text initial
  category: 'initial' | 'minimal_symbol' | 'horology' | 'astrology';
  finish: 'champagne_gold' | 'brushed_titanium' | 'matte_black';
  priceINR: number;
}

export interface WatchModel {
  id: string;
  name: string;
  brand: string;
  caseType: 'apple' | 'samsung' | 'speedmaster' | 'diver' | 'minimalist';
  caseSize: string;
  lugWidth: string;
  caseColor: string;
  bezelColor?: string;
  accentColor?: string;
}

export interface CartItem {
  id: string; // unique item cart id
  productId: string;
  title: string;
  category: StrapCategory;
  selectedVariant: ColorVariant;
  selectedLugWidth: string;
  priceINR: number;
  quantity: number;
  attachedCharms?: Charm[];
  isBundle?: boolean;
  bundleTierName?: string;
}

export interface BundleTier {
  id: 'basic' | 'medium' | 'premium';
  name: string;
  tagline: string;
  strapsCount: number;
  charmsCount: number;
  priceINR: number;
  savingsINR: number;
  hardwareTier: string;
  features: string[];
}
