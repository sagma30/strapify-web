import React from 'react';
import { Home, Sparkles, Layers, Heart, ShoppingBag } from 'lucide-react';

interface MobileBottomNavProps {
  onGoHome: () => void;
  onOpenVisualizer: () => void;
  onGoBundles: () => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  cartCount: number;
  wishlistCount: number;
  currentSection: string;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onGoHome,
  onOpenVisualizer,
  onGoBundles,
  onOpenWishlist,
  onOpenCart,
  cartCount,
  wishlistCount,
}) => {
  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-t border-stone-200 px-2 py-1.5 shadow-lg safe-bottom">
      <div className="grid grid-cols-5 gap-1 items-center text-center">
        {/* Shop */}
        <button
          onClick={onGoHome}
          className="flex flex-col items-center justify-center py-1 text-stone-700 hover:text-stone-900 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px] font-medium mt-0.5">Shop</span>
        </button>

        {/* 3D Visualizer */}
        <button
          onClick={onOpenVisualizer}
          className="flex flex-col items-center justify-center py-1 text-amber-800 hover:text-amber-900 transition-colors relative"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] font-bold mt-0.5">Visualizer</span>
          <span className="absolute top-0 right-3 w-1.5 h-1.5 rounded-full bg-amber-600" />
        </button>

        {/* Bundles */}
        <button
          onClick={onGoBundles}
          className="flex flex-col items-center justify-center py-1 text-stone-700 hover:text-stone-900 transition-colors"
        >
          <Layers className="w-4 h-4" />
          <span className="text-[10px] font-medium mt-0.5">Bundles</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={onOpenWishlist}
          className="flex flex-col items-center justify-center py-1 text-stone-700 hover:text-stone-900 transition-colors relative"
        >
          <Heart className="w-4 h-4" />
          <span className="text-[10px] font-medium mt-0.5">Wishlist</span>
          {wishlistCount > 0 && (
            <span className="absolute top-0 right-3 bg-red-600 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </button>

        {/* Bag */}
        <button
          onClick={onOpenCart}
          className="flex flex-col items-center justify-center py-1 text-stone-900 hover:text-stone-700 transition-colors relative"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#111827] text-white text-[9px] font-mono font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold mt-0.5">Bag</span>
        </button>
      </div>
    </nav>
  );
};
