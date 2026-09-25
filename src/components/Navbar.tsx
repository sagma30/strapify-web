import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, Sparkles, ChevronDown } from 'lucide-react';
import { CurrencyCode } from '../types';
import { CURRENCIES } from '../data/straps';

interface NavbarProps {
  currentCurrency: CurrencyCode;
  onCurrencyChange: (code: CurrencyCode) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenVisualizer: () => void;
  onSelectCategory: (category: string) => void;
  onSearchSubmit: (query: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCurrency,
  onCurrencyChange,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenVisualizer,
  onSelectCategory,
  onSearchSubmit,
  searchQuery,
  setSearchQuery,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { label: 'Apple', category: 'apple', href: '#collection-grid' },
    { label: 'Samsung', category: 'samsung', href: '#collection-grid' },
    { label: 'Smartwatch Straps', category: 'silicone', href: '#collection-grid' },
    { label: 'Leather', category: 'leather', href: '#collection-grid' },
    { label: 'NATO', category: 'nato', href: '#collection-grid' },
    { label: 'Silicone', category: 'silicone', href: '#collection-grid' },
    { label: 'Charms', category: 'charms', href: '#charms-bundle' },
    { label: '3D Visualizer', isVisualizer: true, isNew: true },
  ];

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchSubmit(searchQuery);
      setSearchOpen(false);
      const grid = document.getElementById('collection-grid');
      grid?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FAF9F6]/92 border-b border-[#E7E5E0] transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#111827] text-[#FAF9F6] text-[11px] font-medium tracking-wider uppercase py-1.5 px-4 text-center flex items-center justify-center gap-3">
        <span className="text-amber-400">✦</span>
        <span>Free Shipping Over ₹499 Across India & Worldwide · 5-Second Toolless Swaps</span>
        <span className="hidden sm:inline text-stone-400">·</span>
        <span className="hidden sm:inline text-stone-300">12-Month Guarantee</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-stone-700 hover:text-stone-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Brand Wordmark (Single Text Element per Top Bar Contract) */}
          <div className="flex items-center">
            <a
              href="#"
              className="group flex items-baseline tracking-[0.28em] font-extrabold text-xl sm:text-2xl text-[#111827] font-display hover:opacity-90 transition-opacity"
            >
              STRAPIFY
              <span className="text-[10px] ml-0.5 tracking-normal text-amber-700 font-sans font-medium">®</span>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-7 text-[13px] font-medium text-stone-700 tracking-wide">
            {navLinks.map((link) => {
              if (link.isVisualizer) {
                return (
                  <button
                    key={link.label}
                    onClick={onOpenVisualizer}
                    className="relative flex items-center gap-1.5 text-stone-900 hover:text-amber-800 transition-colors font-semibold group cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>{link.label}</span>
                    <span className="text-[9px] uppercase px-1.5 py-0.2 bg-amber-100 text-amber-900 font-bold rounded tracking-wider border border-amber-300">
                      NEW
                    </span>
                  </button>
                );
              }

              return (
                <button
                  key={link.label}
                  onClick={() => {
                    if (link.category) onSelectCategory(link.category);
                    const target = document.querySelector(link.href || '#collection-grid');
                    target?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#111827] transition-colors py-1 hover:border-b-2 hover:border-[#111827] whitespace-nowrap cursor-pointer"
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Utilities */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Desktop Inline Search */}
            <div className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Find straps for your watch..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyPress}
                className="w-48 lg:w-56 pl-8 pr-3 py-1.5 text-xs bg-[#F4F3EE] hover:bg-[#ECEBE5] focus:bg-white border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 transition-all"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 pointer-events-none" />
            </div>

            {/* Mobile Search Icon Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-1.5 text-stone-700 hover:text-stone-900"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 px-2 py-1 text-xs font-semibold text-stone-800 bg-[#F4F3EE] hover:bg-stone-200 border border-stone-300 rounded-md transition-colors"
                title="Select Currency"
              >
                <span>{currentCurrency === 'INR' ? '🇮🇳 INR ₹' : `${currentCurrency} ${CURRENCIES[currentCurrency].symbol}`}</span>
                <ChevronDown className="w-3 h-3 text-stone-500" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-xl border border-stone-200 py-1 z-50 text-xs font-medium">
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                    <button
                      key={code}
                      onClick={() => {
                        onCurrencyChange(code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-stone-100 transition-colors ${
                        currentCurrency === code ? 'font-bold text-stone-900 bg-stone-50' : 'text-stone-600'
                      }`}
                    >
                      <span>{code}</span>
                      <span className="text-stone-400 font-mono">{CURRENCIES[code].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Wishlist Icon */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-stone-700 hover:text-stone-900 transition-colors rounded-full hover:bg-stone-100"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-amber-700 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Bag Icon */}
            <button
              onClick={onOpenCart}
              className="relative p-2 bg-[#111827] text-white hover:bg-stone-800 transition-colors rounded-lg flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium shadow-sm"
              aria-label="Shopping Bag"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="bg-white/20 text-white text-[11px] font-mono px-1.5 py-0.2 rounded">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        {searchOpen && (
          <div className="md:hidden py-2.5 px-1 border-t border-stone-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Find straps for Apple Watch, Omega, Seiko..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyPress}
                autoFocus
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            </div>
          </div>
        )}

        {/* Mobile Flyout Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-stone-200 bg-[#FAF9F6] space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (link.isVisualizer) {
                    onOpenVisualizer();
                  } else {
                    if (link.category) onSelectCategory(link.category);
                    const target = document.querySelector(link.href || '#collection-grid');
                    target?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-stone-800 hover:bg-stone-100 flex items-center justify-between"
              >
                <span>{link.label}</span>
                {link.isNew && (
                  <span className="text-[9px] uppercase px-1.5 py-0.5 bg-amber-100 text-amber-900 font-bold rounded">
                    NEW
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
