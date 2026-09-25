import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, RefreshCw, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#111827] text-stone-300 pt-16 pb-24 sm:pb-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-stone-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="#"
              className="tracking-[0.28em] font-extrabold text-2xl text-white font-display inline-block"
            >
              STRAPIFY<span className="text-amber-500 font-sans text-xs ml-0.5">®</span>
            </a>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              Interchangeable horology engineered for the modern wrist. Hand-finished Italian leather, sculpted fluororubber, and bonded tactical NATO straps with our zero-tool quick-release spring bar mechanism.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Designed in Melbourne & Bengaluru
              </span>
              <span>·</span>
              <span>ISO 9001 Certified Quality</span>
            </div>
          </div>

          {/* Column 2: Compatibility */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Compatibility Guide
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#collection-grid" className="hover:text-white transition-colors">Apple Watch Ultra (49mm)</a></li>
              <li><a href="#collection-grid" className="hover:text-white transition-colors">Apple Watch Series 10 / 9 / SE</a></li>
              <li><a href="#collection-grid" className="hover:text-white transition-colors">Samsung Galaxy Watch 7 / 6</a></li>
              <li><a href="#collection-grid" className="hover:text-white transition-colors">Garmin Fenix & Epix (22mm)</a></li>
              <li><a href="#collection-grid" className="hover:text-white transition-colors">Omega Speedmaster (20mm)</a></li>
              <li><a href="#collection-grid" className="hover:text-white transition-colors">Rolex & Tudor Divers (20mm)</a></li>
            </ul>
          </div>

          {/* Column 3: Materials & Craft */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Craft & Engineering
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#charms-bundle" className="hover:text-white transition-colors">Custom Slide-On Charms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tuscan Bridle Leather</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FKM Fluororubber Science</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tactical Ballistic NATO</a></li>
              <li><a href="#" className="hover:text-white transition-colors">316L Stainless Steel Hardware</a></li>
              <li><a href="#" className="hover:text-white transition-colors">5-Second Swap Mechanism</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Join the Strap Club
            </h4>
            <p className="text-xs text-stone-400">
              Receive private drop announcements, limited edition colorways, and horology guides.
            </p>

            {subscribed ? (
              <div className="p-3 bg-stone-800 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>You're subscribed! Use STRAP10 at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-3 pr-9 py-2 text-xs bg-stone-800 border border-stone-700 rounded-lg text-white placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 p-1 text-stone-400 hover:text-white transition-colors"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-stone-500">
                  Zero spam. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} STRAPIFY Horology Goods Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[11px]">
            <a href="#" className="hover:text-stone-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-stone-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-stone-300 transition-colors">Warranty & Returns</a>
            <a href="#" className="hover:text-stone-300 transition-colors">Shipping Information</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
