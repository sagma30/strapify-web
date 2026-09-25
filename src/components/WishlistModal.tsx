import React from 'react';
import { X, Trash2, ShoppingBag, Heart } from 'lucide-react';
import { Product, CurrencyCode } from '../types';
import { CURRENCIES } from '../data/straps';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  currentCurrency: CurrencyCode;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveWishlist,
  onQuickView,
  currentCurrency,
}) => {
  if (!isOpen) return null;

  const rate = CURRENCIES[currentCurrency].rate;
  const symbol = CURRENCIES[currentCurrency].symbol;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-[#FAF9F6] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-current" />
            <h3 className="font-bold text-stone-900 font-display text-base">
              Saved Straps & Wishlist ({wishlistProducts.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1">
          {wishlistProducts.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <Heart className="w-12 h-12 text-stone-300 mx-auto" />
              <p className="text-sm font-bold text-stone-800">Your wishlist is empty</p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Tap the heart on any watch strap card to save your favorite combinations for later.
              </p>
            </div>
          ) : (
            wishlistProducts.map((product) => {
              const defaultVariant = product.variants[product.defaultVariantIndex || 0];

              return (
                <div
                  key={product.id}
                  className="p-3 bg-white rounded-xl border border-stone-200 flex items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="w-8 h-12 rounded-md border border-stone-300 shadow-2xs shrink-0"
                      style={{ backgroundColor: defaultVariant.colorHex }}
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-stone-900 truncate">{product.title}</h4>
                      <p className="text-[11px] text-stone-500">{product.categoryLabel}</p>
                      <p className="text-xs font-mono font-bold text-stone-900 mt-0.5">
                        {symbol}{Math.round(product.priceINR * rate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        onClose();
                        onQuickView(product);
                      }}
                      className="px-3 py-1.5 bg-[#111827] text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors"
                    >
                      View / Own It
                    </button>
                    <button
                      onClick={() => onRemoveWishlist(product)}
                      className="p-1.5 text-stone-400 hover:text-red-600 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
