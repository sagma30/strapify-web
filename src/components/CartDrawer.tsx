import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck, Sparkles, CheckCircle2 } from 'lucide-react';
import { CartItem, CurrencyCode } from '../types';
import { CURRENCIES } from '../data/straps';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  currentCurrency: CurrencyCode;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currentCurrency,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');

  // Customer Checkout Form
  const [formData, setFormData] = useState({
    name: 'Saniya',
    email: 'saniyaisthebest88@gmail.com',
    phone: '+91 98765 43210',
    address: '402 Horology Mansions, Indiranagar',
    city: 'Bengaluru',
    pincode: '560038',
    paymentMethod: 'cod', // 'cod' | 'upi' | 'card'
  });

  const rate = CURRENCIES[currentCurrency].rate;
  const symbol = CURRENCIES[currentCurrency].symbol;

  const rawSubtotalINR = items.reduce((acc, item) => acc + item.priceINR * item.quantity, 0);
  const discountAmountINR = Math.round(rawSubtotalINR * (discountPercent / 100));
  const freeShippingThresholdINR = 499;
  const isFreeShipping = rawSubtotalINR >= freeShippingThresholdINR;
  const shippingINR = isFreeShipping || rawSubtotalINR === 0 ? 0 : 80;
  const finalTotalINR = Math.max(0, rawSubtotalINR - discountAmountINR + shippingINR);

  const formattedSubtotal = Math.round(rawSubtotalINR * rate);
  const formattedDiscount = Math.round(discountAmountINR * rate);
  const formattedShipping = Math.round(shippingINR * rate);
  const formattedTotal = Math.round(finalTotalINR * rate);

  const progressToFreeShipping = Math.min(100, Math.round((rawSubtotalINR / freeShippingThresholdINR) * 100));
  const amountNeededINR = Math.max(0, freeShippingThresholdINR - rawSubtotalINR);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'STRAP10') {
      setDiscountPercent(10);
      setPromoMessage('Promo code STRAP10 applied: 10% discount!');
    } else if (promoCode.trim().toUpperCase() === 'LUGG50') {
      setDiscountPercent(15);
      setPromoMessage('VIP code LUGG50 applied: 15% discount!');
    } else {
      setDiscountPercent(0);
      setPromoMessage('Invalid coupon code. Try "STRAP10"');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('success');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/60 backdrop-blur-xs transition-opacity">
      <div className="w-full max-w-md bg-[#FAF9F6] h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-stone-900" />
            <h3 className="font-bold text-stone-900 font-display text-base">
              {checkoutStep === 'checkout'
                ? 'Express Checkout'
                : checkoutStep === 'success'
                ? 'Order Confirmed'
                : `Your Shopping Bag (${items.reduce((a, b) => a + b.quantity, 0)})`}
            </h3>
          </div>
          <button
            onClick={() => {
              if (checkoutStep === 'success') {
                onClearCart();
                setCheckoutStep('cart');
              }
              onClose();
            }}
            className="p-1.5 text-stone-500 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        {checkoutStep === 'cart' && (
          <div className="px-5 py-2.5 bg-amber-50/70 border-b border-amber-200/60 text-xs">
            <div className="flex items-center justify-between text-[11px] font-semibold text-stone-800 mb-1">
              <span>
                {isFreeShipping ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" /> Congratulations! You unlocked Free Shipping
                  </span>
                ) : (
                  <span>Add {symbol}{Math.round(amountNeededINR * rate)} more for Free Express Delivery</span>
                )}
              </span>
              <span className="font-mono text-stone-600">{progressToFreeShipping}%</span>
            </div>
            <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 transition-all duration-300"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>
        )}

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {checkoutStep === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <p className="font-bold text-stone-800 text-sm">Your bag is currently empty</p>
                  <p className="text-xs text-stone-500 max-w-xs">
                    Explore our collection of interchangeable leather, silicone, and NATO straps.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-[#111827] text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-white rounded-xl border border-stone-200 shadow-2xs flex items-center gap-3"
                    >
                      {/* Color variant visual preview dot */}
                      <div className="relative w-12 h-16 rounded-lg bg-stone-100 flex items-center justify-center border border-stone-200 shrink-0">
                        <span
                          className="w-5 h-10 rounded-xs border border-stone-300 shadow-2xs"
                          style={{ backgroundColor: item.selectedVariant.colorHex }}
                        />
                        {item.attachedCharms && item.attachedCharms.length > 0 && (
                          <span className="absolute -bottom-1 -right-1 text-[10px] bg-amber-200 text-amber-900 font-bold px-1 rounded">
                            +{item.attachedCharms.length}✦
                          </span>
                        )}
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-stone-900 truncate">{item.title}</h4>
                        <p className="text-[11px] text-stone-500 truncate">
                          {item.selectedVariant.name} · {item.selectedLugWidth}
                        </p>
                        {item.attachedCharms && item.attachedCharms.length > 0 && (
                          <p className="text-[10px] text-amber-800 truncate">
                            Charms: {item.attachedCharms.map((c) => c.name).join(', ')}
                          </p>
                        )}
                        <p className="text-xs font-mono font-bold text-stone-900 mt-1">
                          {symbol}{Math.round(item.priceINR * rate)}
                        </p>
                      </div>

                      {/* Quantity Stepper & Remove */}
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center border border-stone-300 rounded-md bg-stone-50">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="px-1.5 py-0.5 text-stone-600 hover:text-stone-900 text-xs"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono font-bold text-stone-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="px-1.5 py-0.5 text-stone-600 hover:text-stone-900 text-xs"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Promo Code Input */}
                  <form onSubmit={handleApplyPromo} className="pt-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Discount code (try STRAP10)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 uppercase placeholder:normal-case placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {promoMessage && (
                      <p className={`text-[11px] mt-1 ${discountPercent > 0 ? 'text-emerald-700 font-medium' : 'text-red-600'}`}>
                        {promoMessage}
                      </p>
                    )}
                  </form>
                </div>
              )}
            </>
          )}

          {checkoutStep === 'checkout' && (
            <form onSubmit={handleCompleteOrder} className="space-y-3.5 text-xs">
              <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-3">
                <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
                  Shipping Information
                </h4>
                <div>
                  <label className="block text-[11px] text-stone-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded-lg bg-[#FAF9F6] text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded-lg bg-[#FAF9F6] text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-600 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded-lg bg-[#FAF9F6] text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-600 mb-1">Delivery Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-1.5 border border-stone-300 rounded-lg bg-[#FAF9F6] text-stone-900"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-stone-600 mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-1.5 border border-stone-300 rounded-lg bg-[#FAF9F6] text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-stone-600 mb-1">Pincode</label>
                    <input
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full px-3 py-1.5 border border-stone-300 rounded-lg bg-[#FAF9F6] text-stone-900"
                    />
                  </div>
                </div>
              </div>

              {/* Payment selector */}
              <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-2">
                <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
                  Payment Method
                </h4>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 p-2 border border-stone-200 rounded-lg cursor-pointer hover:bg-stone-50">
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    />
                    <span className="font-semibold text-stone-800">Cash on Delivery (Free Verification)</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 border border-stone-200 rounded-lg cursor-pointer hover:bg-stone-50">
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                    />
                    <span className="font-semibold text-stone-800">Instant UPI (GPay / PhonePe / Paytm)</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 border border-stone-200 rounded-lg cursor-pointer hover:bg-stone-50">
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'card'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    />
                    <span className="font-semibold text-stone-800">Credit / Debit Card (3D Secure)</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="flex-1 py-2.5 bg-stone-200 text-stone-800 rounded-xl font-semibold text-xs"
                >
                  ← Back to Bag
                </button>
                <button
                  type="submit"
                  className="flex-2 py-2.5 bg-[#111827] text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-md hover:bg-stone-800"
                >
                  Confirm & Place Order — {symbol}{formattedTotal}
                </button>
              </div>
            </form>
          )}

          {checkoutStep === 'success' && (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-stone-900 font-display">Order #STP-8842 Confirmed!</h4>
                <p className="text-xs text-stone-500 mt-1">
                  Thank you, {formData.name}. We are preparing your quick-release straps for shipment to {formData.city}.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-stone-200 text-xs text-left space-y-1.5">
                <p><strong>Tracking:</strong> STP-IN-987410294</p>
                <p><strong>Estimated Delivery:</strong> 2-3 Business Days</p>
                <p><strong>Payment Status:</strong> {formData.paymentMethod === 'cod' ? 'Cash on Delivery Verified' : 'Paid'}</p>
                <p><strong>Total Amount:</strong> {symbol}{formattedTotal}</p>
              </div>

              <button
                onClick={() => {
                  onClearCart();
                  setCheckoutStep('cart');
                  onClose();
                }}
                className="w-full py-3 bg-[#111827] text-white rounded-xl font-bold text-xs uppercase tracking-wider"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer with Calculations */}
        {checkoutStep === 'cart' && items.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-stone-200 space-y-3">
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-semibold text-stone-900">{symbol}{formattedSubtotal}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount ({discountPercent}%)</span>
                  <span className="font-mono font-semibold">-{symbol}{formattedDiscount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-mono font-semibold text-stone-900">
                  {isFreeShipping ? 'FREE' : `${symbol}${formattedShipping}`}
                </span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-900">
                <span>Total</span>
                <span className="font-mono text-base">{symbol}{formattedTotal}</span>
              </div>
            </div>

            <button
              onClick={() => setCheckoutStep('checkout')}
              className="w-full py-3.5 bg-[#111827] hover:bg-stone-800 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-4 text-[10px] text-stone-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-stone-500" /> 256-Bit SSL Encrypted
              </span>
              <span>·</span>
              <span>12-Month Hardware Guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
