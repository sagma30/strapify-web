import React, { useState } from 'react';
import { CurrencyCode, Product, ColorVariant, Charm, CartItem, BundleTier } from './types';
import { PRODUCTS, CURRENCIES } from './data/straps';
import { WATCH_MODELS } from './data/watches';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { QuickReleaseUSP } from './components/QuickReleaseUSP';
import { ProductGrid } from './components/ProductGrid';
import { CharmBundleBuilder } from './components/CharmBundleBuilder';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { StrapVisualizerModal } from './components/StrapVisualizerModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistModal } from './components/WishlistModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';

export default function App() {
  // Currency state (defaults to INR ₹ per brief)
  const [currency, setCurrency] = useState<CurrencyCode>('INR');

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Cart state with 1 default pre-loaded starter item
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'init-cart-1',
      productId: 'active-fkm-silicone',
      title: 'AeroRidge FKM Rubber Strap',
      category: 'silicone',
      selectedVariant: PRODUCTS[0].variants[0], // Deep Midnight Navy
      selectedLugWidth: 'Apple Watch 45mm/49mm Ultra',
      priceINR: 399,
      quantity: 1,
    },
  ]);

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>(['italian-bridle-leather']);

  // Modals visibility state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [visualizerOpen, setVisualizerOpen] = useState(false);
  const [visualizerConfig, setVisualizerConfig] = useState<{
    watchId?: string;
    strapId?: string;
    variant?: ColorVariant;
    charms?: Charm[];
  }>({});
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [wishlistModalOpen, setWishlistModalOpen] = useState(false);

  // Toast notification feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Cart actions
  const handleAddToCart = (
    product: Product,
    variant: ColorVariant,
    lugWidth: string,
    attachedCharms?: Charm[]
  ) => {
    const charmsPrice = attachedCharms ? attachedCharms.reduce((a, c) => a + c.priceINR, 0) : 0;
    const finalPriceINR = product.priceINR + charmsPrice;
    const newItemId = `${product.id}-${variant.name}-${lugWidth}-${Date.now()}`;

    const newItem: CartItem = {
      id: newItemId,
      productId: product.id,
      title: product.title,
      category: product.category,
      selectedVariant: variant,
      selectedLugWidth: lugWidth,
      priceINR: finalPriceINR,
      quantity: 1,
      attachedCharms,
    };

    setCartItems((prev) => [newItem, ...prev]);
    showToast(`Added "${product.title}" to bag`);
  };

  const handleAddBundleToCart = (
    tier: BundleTier,
    selectedStraps: { product: Product; variant: ColorVariant }[],
    selectedCharms: Charm[]
  ) => {
    const bundleItem: CartItem = {
      id: `bundle-${tier.id}-${Date.now()}`,
      productId: `bundle-${tier.id}`,
      title: `${tier.name} (3 Straps + ${selectedCharms.length} Charms)`,
      category: 'silicone',
      selectedVariant: selectedStraps[0]?.variant || PRODUCTS[0].variants[0],
      selectedLugWidth: 'Universal 20mm & Apple Adapter',
      priceINR: tier.priceINR,
      quantity: 1,
      attachedCharms: selectedCharms,
      isBundle: true,
      bundleTierName: tier.name,
    };

    setCartItems((prev) => [bundleItem, ...prev]);
    setCartDrawerOpen(true);
    showToast(`${tier.name} bundle added to bag!`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist actions
  const handleToggleWishlist = (product: Product) => {
    if (wishlistIds.includes(product.id)) {
      setWishlistIds((prev) => prev.filter((id) => id !== product.id));
      showToast(`Removed from wishlist`);
    } else {
      setWishlistIds((prev) => [...prev, product.id]);
      showToast(`Saved "${product.title}" to wishlist`);
    }
  };

  // Visualizer trigger
  const handleOpenVisualizer = (
    watchId?: string,
    strapId?: string,
    variant?: ColorVariant,
    charms?: Charm[]
  ) => {
    setVisualizerConfig({ watchId, strapId, variant, charms });
    setVisualizerOpen(true);
  };

  // Search handler
  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    const q = query.toLowerCase();

    if (q.includes('apple') || q.includes('ultra')) {
      setSelectedCategory('apple');
    } else if (q.includes('samsung') || q.includes('galaxy')) {
      setSelectedCategory('samsung');
    } else if (q.includes('silicone') || q.includes('rubber') || q.includes('fkm')) {
      setSelectedCategory('silicone');
    } else if (q.includes('leather') || q.includes('suede')) {
      setSelectedCategory('leather');
    } else if (q.includes('nato') || q.includes('tactical')) {
      setSelectedCategory('nato');
    } else if (q.includes('charm')) {
      setSelectedCategory('charms');
    } else {
      setSelectedCategory('all');
    }
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#111827] selection:bg-[#111827] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#111827] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl border border-stone-700 animate-fade-in flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Glassmorphism Navigation Bar */}
      <Navbar
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenWishlist={() => setWishlistModalOpen(true)}
        onOpenVisualizer={() => handleOpenVisualizer()}
        onSelectCategory={setSelectedCategory}
        onSearchSubmit={handleSearchSubmit}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <HeroSection
          onSearchSubmit={handleSearchSubmit}
          onOpenVisualizer={handleOpenVisualizer}
          onShopCollection={() => {
            const grid = document.getElementById('collection-grid');
            grid?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 3. Core Feature Highlight (USP Banner) */}
        <QuickReleaseUSP />

        {/* 4. Interactive Product Grid & Customizer Preview */}
        <ProductGrid
          products={PRODUCTS}
          currentCurrency={currency}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onQuickView={(product) => setQuickViewProduct(product)}
          onOpenVisualizer={handleOpenVisualizer}
          onAddToCart={handleAddToCart}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
        />

        {/* 5. Slide-On Charms & Bundle Builder Widget */}
        <CharmBundleBuilder
          products={PRODUCTS}
          currentCurrency={currency}
          onAddBundleToCart={handleAddBundleToCart}
          onOpenVisualizer={handleOpenVisualizer}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* 6. Mobile Bottom Navigation */}
      <MobileBottomNav
        onGoHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onOpenVisualizer={() => handleOpenVisualizer()}
        onGoBundles={() => {
          const el = document.getElementById('charms-bundle');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenWishlist={() => setWishlistModalOpen(true)}
        onOpenCart={() => setCartDrawerOpen(true)}
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
        currentSection="home"
      />

      {/* Product Quick View PDP Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenVisualizer={handleOpenVisualizer}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        currentCurrency={currency}
      />

      {/* 3D / Live Strap Visualizer Studio Modal */}
      <StrapVisualizerModal
        isOpen={visualizerOpen}
        onClose={() => setVisualizerOpen(false)}
        initialWatchId={visualizerConfig.watchId}
        initialStrapId={visualizerConfig.strapId}
        initialVariant={visualizerConfig.variant}
        initialCharms={visualizerConfig.charms}
        onAddToCart={handleAddToCart}
        currentCurrency={currency}
      />

      {/* Slide-over Shopping Bag Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        currentCurrency={currency}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={wishlistModalOpen}
        onClose={() => setWishlistModalOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveWishlist={handleToggleWishlist}
        onQuickView={(p) => setQuickViewProduct(p)}
        currentCurrency={currency}
      />
    </div>
  );
}
